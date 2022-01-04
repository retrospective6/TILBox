package com.tilbox.api.post.application

import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.repository.PostRepository
import com.tilbox.core.post.domain.value.Tags
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@Service
class PostService(
    private val postRepository: PostRepository
) {
    fun savePost(request: PostCreateRequest, createDateTime: LocalDateTime): Long {
        val post = Post(
            userId = request.userId,
            title = request.title,
            content = request.content,
            summary = request.summary,
            tags = Tags.of(request.tags),
            thumbnailUrl = request.thumbnailUrl,
            visibleLevel = request.visibleLevel,
            createdAt = createDateTime,
            updatedAt = createDateTime
        )
        val createdPost = postRepository.save(post)
        return createdPost.id
    }

    fun updatePost(postId: Long, request: PostCreateRequest, updateDateTime: LocalDateTime): Long {
        val target = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("해당하는 ID($postId)의 게시글이 존재하지 않습니다.") }

        target.update(
            userId = request.userId,
            title = request.title,
            content = request.content,
            summary = request.summary,
            tags = Tags.of(request.tags),
            thumbnailUrl = request.thumbnailUrl,
            visibleLevel = request.visibleLevel,
            updatedAt = updateDateTime
        )

        return postId
    }

    fun remove(postId: Long, requestUserId: Long) {
        val target = postRepository.findById(postId).orElseThrow { IllegalArgumentException("존재하지 않는 게시글입니다.") }
        check(target.sameUser(requestUserId)) { "본인이 작성한 게시글만 삭제할 수 있습니다." }
        postRepository.delete(target)
    }
}
