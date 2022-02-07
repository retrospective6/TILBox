package com.tilbox.core.post.query

import com.querydsl.core.annotations.QueryProjection
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.user.domain.User
import java.time.LocalDateTime

data class UserPostQueryResponse(
    val postId: Long,
    val userId: Long,
    val profile: String?,
    val nickname: String,
    val tilAddress: String,
    val title: String,
    val summary: String,
    val thumbnail: String,
    val tags: List<String>,
    val likeCount: Long,
    val createdAt: LocalDateTime,
) {
    @QueryProjection
    constructor(post: Post, user: User) : this(
        post.id,
        user.id,
        user.profile.image,
        user.profile.nickname,
        user.myTilAddress,
        post.title,
        post.summary,
        post.thumbnail,
        post.tags.items.map { it.name },
        post.likeCount,
        post.createdAt
    )
}
