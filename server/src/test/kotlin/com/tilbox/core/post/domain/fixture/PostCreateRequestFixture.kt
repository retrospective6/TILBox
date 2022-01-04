package com.tilbox.core.post.domain.fixture

import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.core.post.domain.value.PostVisibleLevel

fun ofDefaultCreateRequest(
    userId: Long = 1L,
    title: String = "title",
    content: String = "content",
    summary: String = "content - summary",
    tags: List<String> = listOf("tag1", "tag2"),
    thumbnailUrl: String? = null,
    visibleLevel: PostVisibleLevel = PostVisibleLevel.PRIVATE
) = PostCreateRequest(
    userId,
    title,
    content,
    summary,
    tags,
    thumbnailUrl,
    visibleLevel
)

fun ofDefaultUpdateRequest(
    userId: Long = 1L,
    title: String = "new_title",
    content: String = "new_content",
    summary: String = "new_content - summary",
    tags: List<String> = listOf("new_tag1", "new_tag2"),
    thumbnailUrl: String? = "https://s3.amazonaws/sample/bucket/file.jpg",
    visibleLevel: PostVisibleLevel = PostVisibleLevel.PUBLIC
) = PostCreateRequest(
    userId,
    title,
    content,
    summary,
    tags,
    thumbnailUrl,
    visibleLevel
)
