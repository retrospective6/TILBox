package com.tilbox.api.user.application.dto.request

data class EmailAuthenticationQuery(
    val email: String,
    val code: String,
)
