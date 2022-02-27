package com.tilbox.api.user.application

import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.RegistrationType
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserRepository
import com.tilbox.core.user.domain.UserRole
import com.tilbox.core.user.domain.UserStatus
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.should
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.startWith
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.EnumSource
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import java.time.LocalDateTime
import java.time.LocalTime
import javax.transaction.Transactional

@Transactional
@ActiveProfiles("test")
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class UserUpdateServiceTest(
    private val userRepository: UserRepository,
    private val userUpdateService: UserUpdateService
) {
    @Test
    fun `회원 정보 수정에 성공한다`() {
        // given
        val user = 사용자를_생성한다(UserStatus.AUTHENTICATED)

        // when
        val actual =
            userUpdateService.updateUser(
                UserUpdateRequest(
                    "hello",
                    "https://s3.image.url/",
                    "desc",
                    "12:00"
                ),
                user.id
            )

        // then
        actual.profile.nickname shouldBe "hello"
        actual.profile.image shouldBe "https://s3.image.url/"
        actual.profile.description shouldBe "desc"
    }

    @ParameterizedTest
    @EnumSource(value = UserStatus::class, names = ["BLOCKED", "UNAUTHENTICATED", "DEACTIVATED"])
    fun `활성화되지 않은 계정은 정보를 수정할 수 없다`(userStatus: UserStatus) {
        // given
        val user = 사용자를_생성한다(userStatus)

        // when
        val exception = shouldThrow<IllegalStateException> {
            userUpdateService.updateUser(
                UserUpdateRequest(
                    "hello",
                    "https://s3.image.url/",
                    "desc",
                    "12:00"
                ),
                user.id
            )
        }

        // then
        exception.message should startWith("회원 정보를 수정할 수 없습니다.")
    }

    private fun `사용자를_생성한다`(userStatus: UserStatus): User {
        return userRepository.save(
            User(
                "nullable",
                "nullable@kakao.com",
                Profile(
                    "KS-KIM",
                    null,
                    "I love kotlin. I hate javascript. javascript is not a language."
                ),
                Password("password"),
                userStatus,
                RegistrationType.EMAIL,
                UserRole.USER,
                LocalTime.of(12, 0),
                LocalDateTime.now(),
                LocalDateTime.now(),
                null
            )
        )
    }
}
