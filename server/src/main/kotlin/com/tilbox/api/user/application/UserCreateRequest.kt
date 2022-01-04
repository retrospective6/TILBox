package com.tilbox.api.user.application

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

@ApiModel("회원가입 정보", description = "이메일 회원가입시 필요한 정보")
data class UserCreateRequest(
    @ApiModelProperty("TIL 주소", required = true, example = "tilbox")
    @field:NotBlank
    @field:Pattern(regexp = "[a-zA-Z0-9\\-_]{3,16}")
    val myTilAddress: String,

    @ApiModelProperty("이메일 주소", required = true, example = "tilbox@tilbox.com")
    @field:Email
    var email: String,

    @ApiModelProperty("닉네임", required = true, example = "mintjordy")
    @field:Size(min = 2, max = 8)
    val nickname: String,

    @ApiModelProperty(
        "이미지 URL",
        required = false,
        example = "https://s3.amazonaws.com/bucketname/foldername/imagename.jpg"
    )
    val image: String? = null,

    @ApiModelProperty("비밀번호", required = true, example = "hello12##@@")
    @field:Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[\$@!%*#?&])[A-Za-z\\d\$@!%*#?&]{8,24}")
    val password: String,
)
