package com.tilbox.common.exception

import io.swagger.annotations.ApiModelProperty

data class ApiErrorResponse(
    @ApiModelProperty("에러 식별코드. 미지정시 기본값으로 E000반환", required = true)
    val errorCode: String = "E000",

    @ApiModelProperty("에러 메시지 본문", required = true)
    val message: String
)
