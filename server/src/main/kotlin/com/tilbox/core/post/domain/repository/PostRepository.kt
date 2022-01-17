package com.tilbox.core.post.domain.repository

import com.tilbox.core.post.domain.entity.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query

interface PostRepository : JpaRepository<Post, Long> {
    @Modifying
    @Query("UPDATE Post p SET p.likeCount = p.likeCount + 1 where p.id = :id")
    fun increaseLikeCount(id: Long)

    @Modifying
    @Query("UPDATE Post p SET p.likeCount = p.likeCount - 1 where p.id = :id")
    fun decreaseLikeCount(id: Long)
}
