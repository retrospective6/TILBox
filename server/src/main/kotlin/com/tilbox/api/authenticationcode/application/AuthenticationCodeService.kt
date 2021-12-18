package com.tilbox.api.authenticationcode.application

import com.tilbox.core.authenticationcode.entity.AuthenticationCode
import com.tilbox.core.authenticationcode.repository.AuthenticationCodeRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class AuthenticationCodeService(
    private val authenticationCodeRepository: AuthenticationCodeRepository
) {
    fun createAuthenticationCode(email: String): String {
        val authenticationCode = authenticationCodeRepository.save(AuthenticationCode(email))
        return authenticationCode.code
    }
}
