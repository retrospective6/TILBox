package com.tilbox.api.like_post.application

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import javax.transaction.Transactional

@Transactional
@ActiveProfiles("test")
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class LikePostServiceTest(private val likePostService: LikePostService) {
    private val postId = 1L
    private val userId = 1L

    @Test
    fun `게시물 좋아요를 생성한다`() {
        likePostService.like(postId, userId)
    }

    @Test
    fun `게시물 좋아요가 이미 존재하는 경우 예외가 발생한다`() {
        likePostService.like(postId, userId)

        val actual = shouldThrow<IllegalStateException> { likePostService.like(postId, userId) }

        actual.message shouldStartWith "이미 좋아요를 클릭한 게시물입니다."
    }
}
