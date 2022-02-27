package com.tilbox.api.user.application

import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserStatus
import io.swagger.annotations.ApiModelProperty
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

data class UserUpdateResponse(
    @ApiModelProperty("TIL 주소", required = true, example = "tilbox")
    val myTilAddress: String,

    @ApiModelProperty("이메일 주소", required = true, example = "tilbox@tilbox.com")
    var email: String,

    @ApiModelProperty("프로필", required = true)
    var profile: Profile,

    @ApiModelProperty("계정 상태", required = true)
    var status: UserStatus,

    @ApiModelProperty("이메일 수신 시간", example = "12:00")
    val emailNotificationTime: String?,

    @ApiModelProperty("가입일", required = true)
    val createdAt: LocalDateTime,

    @ApiModelProperty("최근 업데이트일", required = true)
    var updatedAt: LocalDateTime,
) {
    constructor(user: User) : this(
        user.myTilAddress,
        user.email,
        user.profile,
        user.status,
        user.emailNotificationTime?.format(DateTimeFormatter.ofPattern("HH:mm")),
        user.createdAt,
        user.updatedAt
    )
}
