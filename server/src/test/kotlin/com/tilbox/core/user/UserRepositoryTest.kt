package com.tilbox.core.user

import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.RegistrationType
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserRepository
import com.tilbox.core.user.domain.UserRole
import com.tilbox.core.user.domain.UserStatus
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import java.time.LocalDateTime

@DataJpaTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
internal class UserRepositoryTest(private val userRepository: UserRepository) {
    @BeforeEach
    internal fun setUp() {
        val actual = User(
            "nullable",
            "nullable@kakao.com",
            Profile(
                "KS-KIM",
                null,
                "I love kotlin. I hate javascript. javascript is not a language."
            ),
            Password("password"),
            UserStatus.UNAUTHENTICATED,
            RegistrationType.EMAIL,
            UserRole.USER,
            LocalDateTime.now(),
            LocalDateTime.now(),
            null
        )
        userRepository.save(actual)
    }

    @Test
    fun `로그인 ID가 일치하는 사용자를 조회한다`() {
        val user = userRepository.findByMyTilAddress("nullable")

        user.get().myTilAddress shouldBe "nullable"
    }

    @Test
    fun `이메일이 일치하는 사용자를 조회한다`() {
        val actual = userRepository.findByEmail("nullable@kakao.com")

        actual.get().email shouldBe "nullable@kakao.com"
    }
}
