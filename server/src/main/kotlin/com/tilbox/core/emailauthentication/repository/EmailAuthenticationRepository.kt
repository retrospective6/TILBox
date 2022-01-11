package com.tilbox.core.emailauthentication.repository

import com.tilbox.core.emailauthentication.entity.EmailAuthentication
import org.springframework.data.jpa.repository.JpaRepository

fun EmailAuthenticationRepository.getLastByEmail(email: String): EmailAuthentication {
    return findFirstByEmailOrderByCreatedDateTimeDesc(email)
        ?: throw IllegalArgumentException("인증 코드가 존재하지 않습니다. email: $email")
}

interface EmailAuthenticationRepository : JpaRepository<EmailAuthentication, Long> {
    fun findFirstByEmailOrderByCreatedDateTimeDesc(email: String): EmailAuthentication?
}
