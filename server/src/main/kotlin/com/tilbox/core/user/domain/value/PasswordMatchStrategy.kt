package com.tilbox.core.user.domain.value

interface PasswordMatchStrategy {
    fun match(rawPassword: String, encodedPassword: String): Boolean
}
