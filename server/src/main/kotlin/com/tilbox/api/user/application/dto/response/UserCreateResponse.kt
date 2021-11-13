package com.tilbox.api.user.application.dto.response

import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
import java.time.LocalDateTime

data class UserCreateResponse(
    val myTilAddress: String,

    var email: String,

    var profile: Profile,

    var status: UserStatus,

    val createdAt: LocalDateTime,

    var updatedAt: LocalDateTime,
) {
    constructor(user: User) : this(
        user.myTilAddress, user.email, user.profile, user.status, user.createdAt, user.updatedAt
    )
}
