package com.tilbox.core.user.domain

import java.time.LocalDateTime

data class UserCreatedEvent(
    val myTilAddress: String,
    val email: String,
    val nickname: String,
    val registrationType: RegistrationType,
    val createdAt: LocalDateTime
)
