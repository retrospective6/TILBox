package com.tilbox.core.like_post.domain

import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface LikePostRepository : JpaRepository<LikePost, Long> {
    fun findByPostIdAndUserId(postId: Long, userId: Long): Optional<LikePost>

    fun existsByPostIdAndUserId(postId: Long, userId: Long): Boolean
}
