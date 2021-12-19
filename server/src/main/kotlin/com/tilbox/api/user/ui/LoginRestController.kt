package com.tilbox.api.user.ui

import com.tilbox.api.user.application.LoginRequest
import com.tilbox.api.user.application.LoginResponse
import com.tilbox.api.user.application.LoginService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@Api(description = "회원 API")
@RestController
@RequestMapping("/v1")
class LoginRestController(private val loginService: LoginService) {
    @Operation(summary = "로그인", description = "이메일과 비밀번호를 입력하여 로그인을 진행한다.")
    @ApiResponses(
        ApiResponse(code = 200, message = "로그인 성공"),
        ApiResponse(code = 409, message = "인증 실패, 비밀번호 불일치 등의 사유로 로그인 실패")
    )
    @PostMapping("/login")
    fun login(@RequestBody @Valid request: LoginRequest): ResponseEntity<LoginResponse> {
        val response = loginService.login(request)

        return ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, response.token)
            .build()
    }
}
