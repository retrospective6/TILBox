package com.tilbox.core.user.domain.value

interface PasswordEncodingStrategy {
    fun encode(value: String): String
}
