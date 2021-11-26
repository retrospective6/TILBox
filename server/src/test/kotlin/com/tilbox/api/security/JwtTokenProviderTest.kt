package com.tilbox.api.security

import com.tilbox.core.user.domain.value.UserRole
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldHaveMinLength
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestConstructor

@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class JwtTokenProviderTest(private val jwtTokenProvider: JwtTokenProvider) {
    @Test
    fun `토큰을 생성한다`() {
        val payload = JwtPayload(1L, UserRole.USER)

        val actual = jwtTokenProvider.createToken(payload)

        actual shouldHaveMinLength 1
    }

    @Test
    fun `토큰 추출에 성공한다`() {
        val token = jwtTokenProvider.createToken(JwtPayload(1L, UserRole.USER))

        val actual = jwtTokenProvider.extractPayload(token)

        actual.userId shouldBe 1L
        actual.userRole shouldBe UserRole.USER
    }
}
