package com.tilbox.api.user.application.dto.response

import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
import io.swagger.annotations.ApiModelProperty
import java.time.LocalDateTime

data class UserUpdateResponse(
    @ApiModelProperty("TIL 주소", required = true, example = "tilbox")
    val myTilAddress: String,

    @ApiModelProperty("이메일 주소", required = true, example = "tilbox@tilbox.com")
    var email: String,

    @ApiModelProperty("프로필", required = true)
    var profile: Profile,

    @ApiModelProperty("계정 상태", required = true)
    var status: UserStatus,

    @ApiModelProperty("가입일", required = true)
    val createdAt: LocalDateTime,

    @ApiModelProperty("최근 업데이트일", required = true)
    var updatedAt: LocalDateTime,
) {
    constructor(user: User) : this(
        user.myTilAddress, user.email, user.profile, user.status, user.createdAt, user.updatedAt
    )
}

