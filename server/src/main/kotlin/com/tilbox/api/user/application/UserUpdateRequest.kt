package com.tilbox.api.user.application

import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class UserUpdateRequest(
    @ApiModelProperty("닉네임", required = true, example = "mintjordy")
    @field:Size(min = 2, max = 8)
    val nickname: String,

    @ApiModelProperty(
        "이미지 URL",
        required = false,
        example = "https://s3.amazonaws.com/bucketname/foldername/imagename.jpg"
    )
    val image: String?,

    @ApiModelProperty("자기소개", required = true, example = "안녕하세요. 저를 소개합니다.")
    @field:NotNull
    val description: String
)
