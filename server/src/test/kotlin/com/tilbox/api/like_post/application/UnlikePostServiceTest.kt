package com.tilbox.api.like_post.application

import com.tilbox.core.like_post.domain.LikePost
import com.tilbox.core.like_post.domain.LikePostRepository
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import org.springframework.transaction.annotation.Transactional

@Transactional
@ActiveProfiles("test")
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class UnlikePostServiceTest(
    private val unlikePostService: UnlikePostService,
    private val likePostRepository: LikePostRepository
) {
    private val postId = 1L
    private val userId = 1L

    @Test
    fun `좋아요를 취소한다`() {
        likePostRepository.save(LikePost(postId, userId))

        unlikePostService.unlike(postId, userId)
    }

    @Test
    fun `좋아요가 존재하지 않는 경우 취소할 수 없다`() {
        val actual = shouldThrow<IllegalStateException> { unlikePostService.unlike(postId, userId) }

        actual.message shouldStartWith "게시물에 좋아요가 존재하지 않습니다."
    }
}
