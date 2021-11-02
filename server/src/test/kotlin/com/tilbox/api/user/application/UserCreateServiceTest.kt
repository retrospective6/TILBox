package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.base.test.IntegrationTest
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.should
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.startWith
import org.junit.jupiter.api.Test
import javax.transaction.Transactional

@Transactional
@IntegrationTest
class UserCreateServiceTest(private val userCreateService: UserCreateService) {
    @Test
    fun `회원가입 성공시 가입된 유저 정보를 반환한다`() {
        val request =
            UserCreateRequest("nullable", "nullable@kakao.com", "ks-kim", null, "title", "description")

        val actual = userCreateService.createUser(request)

        actual.loginId shouldBe "nullable"
    }

    @Test
    fun `가입하려는 이메일이 이미 서비스 내에 존재하는 경우 예외가 발생한다`() {
        val request =
            UserCreateRequest("nullable", "nullable@kakao.com", "ks-kim", null, "title", "description")
        userCreateService.createUser(request)

        val exception = shouldThrow<IllegalStateException> {
            userCreateService.createUser(request)
        }

        exception.message should startWith("이미 가입된 이메일입니다.")
    }
}
