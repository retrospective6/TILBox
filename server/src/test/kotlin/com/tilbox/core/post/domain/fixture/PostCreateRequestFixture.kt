package com.tilbox.core.post.domain.fixture

import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.core.post.domain.value.PostVisibleLevel

fun ofDefaultCreateRequest(
    title: String = "title",
    content: String = "content",
    summary: String = "content - summary",
    tags: List<String> = listOf("tag1", "tag2"),
    thumbnail: String = """{"type": "image", "value": "https://s3.amazonaws/sample/bucket/file.jpg"}""",
    visibleLevel: PostVisibleLevel = PostVisibleLevel.PRIVATE
) = PostCreateRequest(
    title,
    content,
    summary,
    tags,
    thumbnail,
    visibleLevel
)

fun ofDefaultUpdateRequest(
    title: String = "new_title",
    content: String = "new_content",
    summary: String = "new_content - summary",
    tags: List<String> = listOf("new_tag1", "new_tag2"),
    thumbnail: String = """{"type": "image", "value": "https://s3.amazonaws/sample/bucket/file.jpg"}""",
    visibleLevel: PostVisibleLevel = PostVisibleLevel.PUBLIC
) = PostCreateRequest(
    title,
    content,
    summary,
    tags,
    thumbnail,
    visibleLevel
)
