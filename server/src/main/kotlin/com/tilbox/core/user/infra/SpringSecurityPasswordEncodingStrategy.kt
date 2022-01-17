package com.tilbox.core.user.infra

import com.tilbox.core.user.domain.PasswordEncodingStrategy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class SpringSecurityPasswordEncodingStrategy(private val passwordEncoder: PasswordEncoder) : PasswordEncodingStrategy {
    override fun encode(value: String): String {
        return passwordEncoder.encode(value)
    }
}
