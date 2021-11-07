package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.should
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.startWith
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class UserCreateServiceTest(private val userCreateService: UserCreateService) {
    @Test
    fun `회원가입 성공시 가입된 유저 정보를 반환한다`() {
        val request =
            UserCreateRequest("nullable", "nullable@kakao.com", "ks-kim", null)

        val actual = userCreateService.createUser(request)

        actual.myTilName shouldBe "nullable"
    }

    @Test
    fun `이미 가입한 이메일로 가입을 시도하는 경우 예외가 발생한다`() {
        userCreateService.createUser(UserCreateRequest("mintjordy", "nullable@kakao.com", "ks-kim", null))

        val exception = shouldThrow<IllegalStateException> {
            userCreateService.createUser(
                UserCreateRequest(
                    "nullable",
                    "nullable@kakao.com",
                    "ks-kim",
                    null,
                )
            )
        }

        exception.message should startWith("이미 가입된 이메일입니다.")
    }

    @Test
    fun `이미 사용중인 TIL 이름으로 가입을 시도하는 경우 예외가 발생한다`() {
        userCreateService.createUser(UserCreateRequest("nullable", "nullable@kakao.com", "ks-kim", null))

        val exception = shouldThrow<IllegalStateException> {
            userCreateService.createUser(
                UserCreateRequest(
                    "nullable",
                    "mintjordy@kakao.com",
                    "tj.seok",
                    null,
                )
            )
        }

        exception.message should startWith("이미 사용중인 TIL 이름입니다.")
    }
}
