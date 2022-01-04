package com.tilbox.core.user.domain

interface PasswordEncodingStrategy {
    fun encode(value: String): String
}
