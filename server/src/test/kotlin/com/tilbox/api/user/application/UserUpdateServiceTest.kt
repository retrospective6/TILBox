package com.tilbox.api.user.application

import com.tilbox.api.security.UserPrincipal
import com.tilbox.api.user.application.dto.request.UserUpdateRequest
import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.RegistrationType
import com.tilbox.core.user.domain.value.UserRole
import com.tilbox.core.user.domain.value.UserStatus
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.should
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.startWith
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.EnumSource
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestConstructor
import java.time.LocalDateTime
import javax.transaction.Transactional

@Transactional
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
        val loginUser = UserPrincipal(user.id, user.email, user.password, user.userRole)

        // when
        val actual =
            userUpdateService.updateUser(UserUpdateRequest("hello", "https://s3.image.url/", "desc"), loginUser)

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
        val loginUser = UserPrincipal(user.id, user.email, user.password, user.userRole)

        // when
        val exception = shouldThrow<IllegalStateException> {
            userUpdateService.updateUser(UserUpdateRequest("hello", "https://s3.image.url/", "desc"), loginUser)
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
                LocalDateTime.now(),
                LocalDateTime.now(),
                null
            )
        )
    }
}
