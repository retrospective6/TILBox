package com.tilbox.api.user.application

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.Email
import javax.validation.constraints.Pattern

@ApiModel("로그인 계정 정보", description = "이메일과 비밀번호로 로그인을 시도한다.")
data class LoginRequest(
    @ApiModelProperty("사용자 계정 이메일", required = true, example = "nullable@kakao.com")
    @field:Email
    val email: String,

    @ApiModelProperty("특수문자, 숫자, 알파벳을 최소 한개씩 포함한 비밀번호", required = true, example = "password123!")
    @field:Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[\$@!%*#?&])[A-Za-z\\d\$@!%*#?&]{8,24}")
    val password: String
)
