package com.tilbox.api.user.application

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.should
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.startWith
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestConstructor
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class EmailUserCreateServiceTest(private val emailUserCreateService: EmailUserCreateService) {
    @Test
    fun `회원가입 성공시 가입된 유저 정보를 반환한다`() {
        val request =
            UserCreateRequest("nullable", "nullable@kakao.com", "ks-kim", null, "password12##")

        val actual = emailUserCreateService.createUser(request)

        actual.myTilAddress shouldBe "nullable"
    }

    @Test
    fun `이미 가입한 이메일로 가입을 시도하는 경우 예외가 발생한다`() {
        emailUserCreateService.createUser(
            UserCreateRequest(
                "mintjordy",
                "nullable@kakao.com",
                "ks-kim",
                null,
                "password12##"
            )
        )

        val exception = shouldThrow<IllegalStateException> {
            emailUserCreateService.createUser(
                UserCreateRequest(
                    "nullable",
                    "nullable@kakao.com",
                    "ks-kim",
                    null,
                    "password"
                )
            )
        }

        exception.message should startWith("이미 가입된 이메일입니다.")
    }

    @Test
    fun `이미 사용중인 TIL 이름으로 가입을 시도하는 경우 예외가 발생한다`() {
        emailUserCreateService.createUser(
            UserCreateRequest(
                "nullable",
                "nullable@kakao.com",
                "ks-kim",
                null,
                "password12##"
            )
        )

        val exception = shouldThrow<IllegalStateException> {
            emailUserCreateService.createUser(
                UserCreateRequest(
                    "nullable",
                    "mintjordy@kakao.com",
                    "tj.seok",
                    null,
                    "password12##"
                )
            )
        }

        exception.message should startWith("이미 사용중인 TIL 주소입니다.")
    }
}
