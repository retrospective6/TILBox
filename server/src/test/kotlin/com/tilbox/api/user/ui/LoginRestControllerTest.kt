package com.tilbox.api.user.ui

import com.ninjasquad.springmockk.MockkBean
import com.tilbox.api.user.application.LoginRequest
import com.tilbox.api.user.application.LoginResponse
import com.tilbox.api.user.application.LoginService
import com.tilbox.base.test.RestControllerTest
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.ResultActionsDsl

@WebMvcTest(controllers = [LoginRestController::class])
class LoginRestControllerTest : RestControllerTest() {
    @MockkBean
    private lateinit var loginService: LoginService

    private val `로그인 요청` = LoginRequest("tilbox@tilbox.com", "thisispassword12#")

    private val `로그인 응답` = LoginResponse("TOKEN")

    @Test
    fun `로그인에 성공한다`() {
        every { loginService.login(any()) } returns `로그인 응답`

        로그인(`로그인 요청`)
            .andExpect {
                status { isOk() }
            }
    }

    private fun 로그인(request: LoginRequest): ResultActionsDsl {
        return post("/v1/login", request)
    }
}
