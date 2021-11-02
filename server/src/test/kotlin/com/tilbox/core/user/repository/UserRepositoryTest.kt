package com.tilbox.core.user.repository

import com.tilbox.base.test.RepositoryTest
import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

@RepositoryTest
internal class UserRepositoryTest(private val userRepository: UserRepository) {
    @BeforeEach
    internal fun setUp() {
        val actual = User(
            "nullable",
            "nullable@kakao.com",
            "KS-KIM",
            null,
            "My name is KS-KIM",
            "I love kotlin. I hate javascript. javascript is not a language."
        )
        userRepository.save(actual)
    }

    @Test
    fun `로그인 ID가 일치하는 사용자를 조회한다`() {
        val user = userRepository.findByLoginId("nullable")

        user!!.loginId shouldBe "nullable"
    }

    @Test
    fun `이메일이 일치하는 사용자를 조회한다`() {
        val actual = userRepository.findByEmail("nullable@kakao.com")

        actual!!.email shouldBe "nullable@kakao.com"
    }
}
