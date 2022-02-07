package com.tilbox.core.post.query

data class UserPostQueryRequest(
    val lastPostId: Long?,
    val size: Long,
    val userId: Long,
    val keyword: String?,
    val likedUser: Boolean?
)
