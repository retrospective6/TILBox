package com.tilbox.api.user.ui

import com.tilbox.api.authenticationcode.application.EmailAuthenticationService
import com.tilbox.api.mail.application.MailService
import com.tilbox.api.user.application.UserCreateService
import com.tilbox.api.user.application.dto.request.EmailAuthenticationParam
import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import io.swagger.annotations.*
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@Api(description = "회원 API")
@RestController
@RequestMapping("/v1/users")
class UserRestController(
    private val userCreateService: UserCreateService,
    private val emailAuthenticationService: EmailAuthenticationService,
    private val mailService: MailService
) {

    @Operation(summary = "회원가입", description = "이메일 인증을 통한 회원가입을 진행한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "회원가입 완료"),
        ApiResponse(code = 409, message = "회원가입 실패"),
    )
    @PostMapping
    fun createUser(@RequestBody request: UserCreateRequest): ResponseEntity<UserCreateResponse> {
        val response = userCreateService.createUser(request)
        val code = emailAuthenticationService.createAuthenticationCode(response.email)
        mailService.sendAuthenticationCodeMail(response.email, code)
        return ResponseEntity
            .created(URI.create("/v1/users/${response.myTilAddress}"))
            .body(response)
    }

    @Operation(summary = "이메일 인증", description = "이메일 인증을 통해 회원가입을 완료한다.")
    @ApiImplicitParams(
        ApiImplicitParam("이메일", name = "email", dataType = "string", paramType = "query"),
        ApiImplicitParam("인증코드", name = "code", dataType = "string", paramType = "query"),
    )
    @ApiResponses(
        ApiResponse(code = 200, message = "인증 성공"),
    )
    @GetMapping
    fun checkAuthenticationCode(emailAuthenticationParam: EmailAuthenticationParam): ResponseEntity<UserCreateResponse> {
        val response = emailAuthenticationService.authenticateEmail(emailAuthenticationParam)
        return ResponseEntity
            .ok(response)
    }
}
