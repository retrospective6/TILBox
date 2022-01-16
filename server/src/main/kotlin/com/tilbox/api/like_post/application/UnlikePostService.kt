package com.tilbox.api.like_post.application

import com.tilbox.core.like_post.domain.LikePostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UnlikePostService(private val likePostRepository: LikePostRepository) {
    fun unlike(postId: Long, userId: Long) {
        val likePost = likePostRepository.findByPostIdAndUserId(postId, userId)
            .orElseThrow { IllegalStateException("게시물에 좋아요가 존재하지 않습니다. postId=$postId, userId=$userId") }
        likePostRepository.delete(likePost)
    }
}
