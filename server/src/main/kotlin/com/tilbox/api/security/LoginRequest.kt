package com.tilbox.api.security

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import javax.validation.constraints.Email
import javax.validation.constraints.Pattern

data class LoginRequest(
    @field:Email
    val email: String,

    @field:Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[\$@!%*#?&])[A-Za-z\\d\$@!%*#?&]{8,24}")
    val password: String
) {
    fun toAuthRequest(): UsernamePasswordAuthenticationToken {
        return UsernamePasswordAuthenticationToken(email, password)
    }
}
