package com.tilbox.api.like_post.application

import com.tilbox.core.like_post.domain.LikePost
import com.tilbox.core.like_post.domain.LikePostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class LikePostService(private val likePostRepository: LikePostRepository) {
    fun like(postId: Long, userId: Long) {
        check(
            !likePostRepository.existsByPostIdAndUserId(
                postId,
                userId
            )
        ) { "이미 좋아요를 클릭한 게시물입니다. postId=$postId, userId=$userId" }

        val savedLikePost = likePostRepository.save(LikePost(postId, userId))
        savedLikePost.like()
    }
}
