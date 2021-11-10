package com.tilbox.core.user.repository

import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
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
                "My name is KS-KIM",
                "I love kotlin. I hate javascript. javascript is not a language."
            ),
            Password("password"),
            UserStatus.UNAUTHENTICATED,
            LocalDateTime.now(),
            LocalDateTime.now(),
        )
        userRepository.save(actual)
    }

    @Test
    fun `로그인 ID가 일치하는 사용자를 조회한다`() {
        val user = userRepository.findByMyTilName("nullable")

        user!!.myTilName shouldBe "nullable"
    }

    @Test
    fun `이메일이 일치하는 사용자를 조회한다`() {
        val actual = userRepository.findByEmail("nullable@kakao.com")

        actual!!.email shouldBe "nullable@kakao.com"
    }
}
