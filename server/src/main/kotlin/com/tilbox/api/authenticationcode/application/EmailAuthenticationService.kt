package com.tilbox.api.authenticationcode.application

import com.tilbox.api.user.application.UserCreateResponse
import com.tilbox.api.user.application.dto.request.EmailAuthenticationQuery
import com.tilbox.core.emailauthentication.entity.EmailAuthentication
import com.tilbox.core.emailauthentication.repository.EmailAuthenticationRepository
import com.tilbox.core.emailauthentication.repository.getLastByEmail
import com.tilbox.core.user.domain.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class EmailAuthenticationService(
    private val emailAuthenticationRepository: EmailAuthenticationRepository,
    private val userRepository: UserRepository
) {
    fun createAuthenticationCode(email: String): String {
        val emailAuthentication = emailAuthenticationRepository.save(EmailAuthentication(email))
        return emailAuthentication.code
    }

    fun authenticateEmail(emailAuthenticationQuery: EmailAuthenticationQuery): UserCreateResponse {
        val authenticationCode = emailAuthenticationRepository.getLastByEmail(emailAuthenticationQuery.email)
        authenticationCode.authenticate(emailAuthenticationQuery.code)

        val user = userRepository.findByEmail(authenticationCode.email).orElseThrow {
            throw IllegalArgumentException("사용자를 찾을 수 없습니다. email=${authenticationCode.email}")
        }
        user.authenticate()
        return UserCreateResponse(user)
    }
}
