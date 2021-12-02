package com.tilbox.api.user.application.dto.request

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

data class UserCreateRequest(
    @field:NotBlank
    @field:Pattern(regexp = "[a-zA-Z0-9\\-_]{3,16}")
    val myTilAddress: String,

    @field:Email
    var email: String,

    @field:Size(min = 2, max = 8)
    val nickname: String,

    val image: String? = null,

    @field:Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[\$@!%*#?&])[A-Za-z\\d\$@!%*#?&]{8,24}")
    val password: String,
)
