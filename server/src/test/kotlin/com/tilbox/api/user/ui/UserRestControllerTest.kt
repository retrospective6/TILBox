package com.tilbox.api.user.ui

import com.ninjasquad.springmockk.MockkBean
import com.tilbox.api.authenticationcode.application.EmailAuthenticationService
import com.tilbox.api.mail.application.MailService
import com.tilbox.api.user.application.EmailUserCreateService
import com.tilbox.api.user.application.UserCreateRequest
import com.tilbox.api.user.application.UserCreateResponse
import com.tilbox.api.user.application.UserUpdateRequest
import com.tilbox.api.user.application.UserUpdateResponse
import com.tilbox.api.user.application.UserUpdateService
import com.tilbox.api.user.application.UserWithdrawalService
import com.tilbox.base.test.RestControllerTest
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.UserStatus
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.ResultActionsDsl
import java.time.LocalDateTime

@WebMvcTest(controllers = [UserRestController::class])
class UserRestControllerTest : RestControllerTest() {
    @MockkBean
    private lateinit var emailUserCreateService: EmailUserCreateService

    @MockkBean
    private lateinit var emailAuthenticationService: EmailAuthenticationService

    @MockkBean
    private lateinit var mailService: MailService

    @MockkBean
    private lateinit var userWithdrawalService: UserWithdrawalService

    @MockkBean
    private lateinit var userUpdateService: UserUpdateService

    private val `회원가입 요청` =
        UserCreateRequest(
            "nullable",
            "nullable@kakao.com",
            "ks-kim",
            null,
            "password2021##",
            "12:00"
        )

    private val `회원가입 응답` = UserCreateResponse(
        "nullable",
        "nullable@kakao.com",
        Profile("ks-kim", null, "", 0L),
        UserStatus.UNAUTHENTICATED,
        "12:00",
        LocalDateTime.now(),
        LocalDateTime.now()
    )

    private val `인증 코드 응답` = ""

    private val `회원정보 수정 요청` =
        UserUpdateRequest(
            "hello",
            "https://amazonaws.s3-northeast-2.com/image.jpg",
            "description",
            "12:00"
        )

    private val `회원정보 수정 응답` = UserUpdateResponse(
        "nullable",
        "nullable@kakao.com",
        Profile("hello", "https://amazonaws.s3-northeast-2.com/image.jpg", "description", 0L),
        UserStatus.AUTHENTICATED,
        "12:00",
        LocalDateTime.now(),
        LocalDateTime.now()
    )

    @Test
    fun `회원가입을 요청하여 가입된 정보를 반환한다`() {
        every { emailUserCreateService.createUser(any()) } returns `회원가입 응답`
        every { emailAuthenticationService.createAuthenticationCode(any()) } returns `인증 코드 응답`
        every { mailService.sendAuthenticationCodeMail(any(), any()) } returns Unit

        회원가입(`회원가입 요청`)
            .andExpect {
                status { isCreated() }
                content { json(objectMapper.writeValueAsString(`회원가입 응답`)) }
            }
    }

    @Test
    fun `사용자 정보를 업데이트한다`() {
        every { userUpdateService.updateUser(any(), any()) } returns `회원정보 수정 응답`

        `회원정보 수정`(`회원정보 수정 요청`)
            .andExpect {
                status { isOk() }
                content { json(objectMapper.writeValueAsString(`회원정보 수정 응답`)) }
            }
    }

    private fun 회원가입(request: UserCreateRequest): ResultActionsDsl {
        return post("/v1/signup", request)
    }

    private fun `회원정보 수정`(request: UserUpdateRequest): ResultActionsDsl {
        return put("/v1/users", request)
    }
}
