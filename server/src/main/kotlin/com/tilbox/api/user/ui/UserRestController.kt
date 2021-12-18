package com.tilbox.api.user.ui

import com.tilbox.api.authenticationcode.application.AuthenticationCodeService
import com.tilbox.api.mail.application.MailService
import com.tilbox.api.user.application.UserCreateService
import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@Api(description = "회원 API")
@RestController
@RequestMapping("/v1/users")
class UserRestController(private val userCreateService: UserCreateService) {

    @Operation(summary = "회원가입", description = "이메일 인증을 통한 회원가입을 진행한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "회원가입 완료"),
        ApiResponse(code = 409, message = "회원가입 실패"),
    )
    @PostMapping
    fun createUser(@RequestBody request: UserCreateRequest): ResponseEntity<UserCreateResponse> {
        val response = userCreateService.createUser(request)
        return ResponseEntity
            .created(URI.create("/v1/users/${response.myTilAddress}"))
            .body(response)
    }
}
