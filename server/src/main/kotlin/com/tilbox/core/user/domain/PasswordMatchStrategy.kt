package com.tilbox.core.user.domain

interface PasswordMatchStrategy {
    fun match(rawPassword: String, encodedPassword: String): Boolean
}
