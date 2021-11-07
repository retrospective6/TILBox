package com.tilbox.api.user.application.dto.request

import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.value.Profile
import java.time.LocalDateTime
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

data class UserCreateRequest(
    @field:NotBlank
    val myTilName: String,

    @field:Email
    var email: String,

    @field:NotBlank
    val nickname: String,

    @field:NotBlank
    val image: String? = null,
) {
    fun toEntity(createdAt: LocalDateTime): User {
        return User(
            myTilName = myTilName,
            email = email,
            profile = Profile(nickname = nickname, image = image),
            createdAt = createdAt,
            updatedAt = createdAt
        )
    }
}
