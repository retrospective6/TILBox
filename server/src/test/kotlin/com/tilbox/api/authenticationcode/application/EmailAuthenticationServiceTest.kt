package com.tilbox.api.authenticationcode.application

import com.tilbox.api.user.application.EmailAuthenticationQuery
import com.tilbox.core.emailauthentication.entity.EmailAuthentication
import com.tilbox.core.emailauthentication.repository.EmailAuthenticationRepository
import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.RegistrationType
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserRepository
import com.tilbox.core.user.domain.UserRole
import com.tilbox.core.user.domain.UserStatus
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import java.time.LocalDateTime
import java.time.LocalTime
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class EmailAuthenticationServiceTest(
    private val emailAuthenticationService: EmailAuthenticationService,
    private val emailAuthenticationRepository: EmailAuthenticationRepository,
    private val userRepository: UserRepository
) {
    @Test
    fun `이메일에 대해 인증 코드를 생성한다`() {
        val emailAuthentication = emailAuthenticationService.createAuthenticationCode("jnunseok@gmail.com")

        emailAuthentication.length shouldBe 8
    }

    @Test
    fun `이메일 인증을 하면 사용자의 상태가 인증 상태로 바뀐다`() {
        userRepository.save(
            User(
                myTilAddress = "mintjordy",
                email = "jnunseok@gmail.com",
                profile = Profile(nickname = "jordy", image = null),
                password = Password(value = "password12##"),
                status = UserStatus.UNAUTHENTICATED,
                RegistrationType.EMAIL,
                UserRole.USER,
                LocalTime.of(12, 0),
                createdAt = LocalDateTime.now(),
                updatedAt = LocalDateTime.now(),
                null
            )
        )

        val emailAuthentication = emailAuthenticationRepository.save(
            EmailAuthentication(email = "jnunseok@gmail.com")
        )

        val userResponse = emailAuthenticationService.authenticateEmail(
            EmailAuthenticationQuery(
                email = emailAuthentication.email,
                code = emailAuthentication.code
            )
        )

        userResponse.status shouldBe UserStatus.AUTHENTICATED
    }
}
