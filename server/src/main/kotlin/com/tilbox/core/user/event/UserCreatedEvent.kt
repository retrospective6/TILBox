package com.tilbox.core.user.event

import java.time.LocalDateTime

data class UserCreatedEvent(
    val myTilName: String,
    val email: String,
    val nickname: String,
    val createdAt: LocalDateTime
)
