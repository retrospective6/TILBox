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
}
