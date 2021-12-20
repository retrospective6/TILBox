package com.tilbox.api.post.application.dto.request

import com.tilbox.core.post.domain.value.PostVisibleLevel
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.NotBlank

@ApiModel("업데이트 게시글 정보", description = "게시글 수정시 필요한 정보")
data class PostUpdateRequest(
    @ApiModelProperty("TIL 업데이트 대상 회원 ID번호", required = true, example = "30")
    @field:NotBlank
    val userId: Long,

    @ApiModelProperty("TIL 제목", required = true, example = "12/5일 TIL")
    @field:NotBlank
    val title: String,

    @ApiModelProperty("TIL 본문", required = true, example = "코틀린이 미래다.")
    @field:NotBlank
    val content: String,

    @ApiModelProperty("TIL Summary", required = true, example = "코틀린을공부해요")
    val summary: String,

    @ApiModelProperty("TIL 태그목록", required = false, example = "['코틀린', 'kotlin']")
    val tags: List<String>,

    @ApiModelProperty("TIL 썸네일 URL", required = true, example = "https://s3.amazonaws.com/s3/bucket/thumbnail.jpg")
    val thumbnailUrl: String? = null,

    @ApiModelProperty("TIL 공개범위 설정", required = true, example = "PUBLIC")
    @field:NotBlank
    val visibleLevel: PostVisibleLevel
)
