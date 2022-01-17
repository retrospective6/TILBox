package com.tilbox.api.like_post.application

import com.tilbox.core.like_post.domain.LikePost
import com.tilbox.core.like_post.domain.LikePostRepository
import com.tilbox.core.post.domain.repository.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class LikePostService(
    private val postRepository: PostRepository,
    private val likePostRepository: LikePostRepository
) {
    fun like(postId: Long, userId: Long) {
        check(postRepository.existsById(postId)) { "게시물이 존재하지 않습니다. postId=$postId, userId=$userId" }
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
