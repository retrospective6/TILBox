package com.tilbox.api.user.application.dto.request

data class EmailAuthenticationParam(
    val email: String,
    val code: String,
)
