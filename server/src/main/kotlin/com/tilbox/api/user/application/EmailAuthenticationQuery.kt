package com.tilbox.api.user.application

data class EmailAuthenticationQuery(
    val email: String,
    val code: String,
)
