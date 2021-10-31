package com.tilbox.core.user.repository

import com.tilbox.base.test.RepositoryTest
import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import io.kotest.matchers.shouldNotHave
import io.kotest.matchers.types.shouldBeSameInstanceAs
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

@RepositoryTest
internal class UserRepositoryTest(private val userRepository: UserRepository) {
    @BeforeEach
    internal fun setUp() {
        val user = User("nullable", "nullable@kakao.com",Profile("KS-KIM",null, "My name is KS-KIM", "I love kotlin. I hate javascript. javascript is not a language."))
        userRepository.save(user)
    }

    @Test
    fun `로그인 ID가 일치하는 사용자를 조회한다`() {
        val user = userRepository.findByLoginId("nullable")

        user!!.loginId shouldBe "nullable"
    }

    @Test
    fun `이메일이 일치하는 사용자를 조회한다`() {
        val user = userRepository.findByEmail("nullable@kakao.com")

        user!!.email shouldBe "nullable@kakao.com"
    }
}
