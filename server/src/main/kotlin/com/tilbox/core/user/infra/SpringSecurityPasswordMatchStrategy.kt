package com.tilbox.core.user.infra

import com.tilbox.core.user.domain.PasswordMatchStrategy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class SpringSecurityPasswordMatchStrategy(private val passwordEncoder: PasswordEncoder) : PasswordMatchStrategy {
    override fun match(rawPassword: String, encodedPassword: String): Boolean {
        return passwordEncoder.matches(rawPassword, encodedPassword)
    }
}
