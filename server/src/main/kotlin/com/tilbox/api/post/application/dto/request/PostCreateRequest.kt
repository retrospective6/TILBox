package com.tilbox.api.post.application.dto.request

import com.tilbox.core.post.domain.value.PostVisibleLevel
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.NotBlank

@ApiModel("작성 게시글 정보", description = "게시글 작성/수정시 필요한 정보")
data class PostCreateRequest(
    @ApiModelProperty("TIL 작성 회원 ID번호", required = true, example = "30")
    @field:NotBlank
    val userId: Long,

    @ApiModelProperty("TIL 제목", required = true, example = "12/4일 TIL")
    @field:NotBlank
    val title: String,

    @ApiModelProperty("TIL 본문", required = true, example = "java8 스트림 API 목록: 1. filter(), 2. map, 3. collect")
    @field:NotBlank
    val content: String,

    @ApiModelProperty("TIL Summary", required = true, example = "java8 스트림 API 목록을 정리해보았습니다.")
    val summary: String,

    @ApiModelProperty("TIL 태그목록", example = "['자바', 'Stream']")
    val tags: List<String>,

    @ApiModelProperty("TIL 썸네일 URL", required = true, example = "https://s3.amazonaws.com/s3/bucket/thumbnail.jpg")
    val thumbnailUrl: String? = null,

    @ApiModelProperty("TIL 공개범위 설정", required = true, example = "PUBLIC")
    @field:NotBlank
    val visibleLevel: PostVisibleLevel
)
