package com.tilbox.api.user.ui

import com.tilbox.api.authenticationcode.application.EmailAuthenticationService
import com.tilbox.api.mail.application.MailService
import com.tilbox.api.security.LoginUserId
import com.tilbox.api.user.application.EmailAuthenticationQuery
import com.tilbox.api.user.application.EmailUserCreateService
import com.tilbox.api.user.application.UserCreateRequest
import com.tilbox.api.user.application.UserCreateResponse
import com.tilbox.api.user.application.UserUpdateRequest
import com.tilbox.api.user.application.UserUpdateResponse
import com.tilbox.api.user.application.UserUpdateService
import com.tilbox.api.user.application.UserWithdrawalService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiImplicitParam
import io.swagger.annotations.ApiImplicitParams
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI
import javax.validation.Valid

@Api(description = "회원 API")
@RestController
@RequestMapping("/v1")
class UserRestController(
    private val emailUserCreateService: EmailUserCreateService,
    private val emailAuthenticationService: EmailAuthenticationService,
    private val mailService: MailService,
    private val userWithdrawalService: UserWithdrawalService,
    private val userUpdateService: UserUpdateService
) {

    @Operation(summary = "회원가입", description = "이메일 인증을 통한 회원가입을 진행한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "회원가입 완료"),
        ApiResponse(code = 409, message = "회원가입 실패"),
    )
    @PostMapping("/signup")
    fun createUser(@Valid @RequestBody request: UserCreateRequest): ResponseEntity<UserCreateResponse> {
        val response = emailUserCreateService.createUser(request)
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
    fun checkAuthenticationCode(
        emailAuthenticationQuery: EmailAuthenticationQuery
    ): ResponseEntity<UserCreateResponse> {
        val response = emailAuthenticationService.authenticateEmail(emailAuthenticationQuery)
        return ResponseEntity
            .ok(response)
    }

    @Operation(summary = "프로필 업데이트", description = "사용자의 개인정보를 갱신한다.")
    @ApiResponses(
        ApiResponse(code = 200, message = "프로필 업데이트 성공"),
        ApiResponse(code = 400, message = "잘못된 요청"),
        ApiResponse(code = 409, message = "프로필 업데이트 실패")
    )
    @PutMapping("/users")
    fun updateUser(
        @Valid @RequestBody request: UserUpdateRequest,
        @LoginUserId userId: Long
    ): ResponseEntity<UserUpdateResponse> {
        val response = userUpdateService.updateUser(request, userId)
        return ResponseEntity
            .ok(response)
    }

    @Operation(summary = "회원탈퇴", description = "현재 로그인한 사용자의 회원탈퇴를 진행한다.")
    @ApiResponses(
        ApiResponse(code = 204, message = "회원탈퇴 완료"),
        ApiResponse(code = 409, message = "회원탈퇴 실패")
    )
    @DeleteMapping("/users")
    fun withdrawUser(@LoginUserId userId: Long): ResponseEntity<Void> {
        userWithdrawalService.withdraw(userId)
        return ResponseEntity
            .noContent()
            .build()
    }
}
