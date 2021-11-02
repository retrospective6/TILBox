package com.tilbox.api.user.application.dto.request

import com.tilbox.core.user.domain.entity.User
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

data class UserCreateRequest(
    @field:NotBlank
    val loginId: String,

    @field:Email
    var email: String,

    @field:NotBlank
    val nickname: String,

    @field:NotBlank
    val image: String?,

    val title: String,

    val description: String,
) {
    fun toEntity(): User {
        return User(loginId, email, nickname, image, title, description)
    }
}
