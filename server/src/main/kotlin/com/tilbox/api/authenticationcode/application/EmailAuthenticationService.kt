package com.tilbox.api.authenticationcode.application

import com.tilbox.api.user.application.dto.request.EmailAuthenticationParam
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.core.emailauthentication.entity.EmailAuthentication
import com.tilbox.core.emailauthentication.repository.EmailAuthenticationRepository
import com.tilbox.core.emailauthentication.repository.getLastByEmail
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.UserStatus
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

    fun authenticateEmail(emailAuthenticationParam: EmailAuthenticationParam): UserCreateResponse {
        val authenticationCode = emailAuthenticationRepository.getLastByEmail(emailAuthenticationParam.email)
        authenticationCode.authenticate(emailAuthenticationParam.code)

        val user = userRepository.findByEmail(authenticationCode.email)
            ?: throw RuntimeException("사용자를 찾을 수 없습니다.")
        user.changeStatus(UserStatus.AUTHENTICATED)
        return UserCreateResponse(user)
    }
}
