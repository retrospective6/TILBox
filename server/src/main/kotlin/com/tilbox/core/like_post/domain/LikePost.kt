package com.tilbox.core.like_post.domain

import com.tilbox.core.base.BaseRootEntity
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Index
import javax.persistence.Table

@Table(indexes = [Index(name = "user_liked_post_idx", columnList = "user_id,post_id", unique = true)])
@Entity
class LikePost(
    @Column(name = "post_id", nullable = false)
    val postId: Long,

    @Column(name = "user_id", nullable = false)
    val userId: Long,

    id: Long = 0L
) : BaseRootEntity<LikePost>(id) {
    fun like(): LikePost {
        this.registerEvent(LikePostEvent(postId, userId))
        return this
    }

    fun unlike(): LikePost {
        this.registerEvent(UnlikePostEvent(postId, userId))
        return this
    }
}
