package com.tilbox.api.post.application

import com.tilbox.core.like_post.domain.LikePostEvent
import com.tilbox.core.like_post.domain.UnlikePostEvent
import com.tilbox.core.post.domain.repository.PostRepository
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.transaction.event.TransactionalEventListener

@Transactional(propagation = Propagation.REQUIRES_NEW)
@Service
class PostLikeCountUpdateService(private val postRepository: PostRepository) {
    @Async
    @TransactionalEventListener
    fun increaseLikeCount(likePostEvent: LikePostEvent) {
        postRepository.increaseLikeCount(likePostEvent.postId)
    }

    @Async
    @TransactionalEventListener
    fun decreaseLikeCount(unlikePostEvent: UnlikePostEvent) {
        postRepository.decreaseLikeCount(unlikePostEvent.userId)
    }
}
