package com.tilbox.api.user.application.dto.request

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

    @field:NotBlank
    val password: String,
)
