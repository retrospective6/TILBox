package com.tilbox.api.like_post.application

import com.tilbox.core.like_post.domain.LikePost
import com.tilbox.core.like_post.domain.LikePostRepository
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.fixture.ofDefaultPost
import com.tilbox.core.post.domain.repository.PostRepository
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.BeforeEach
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
    private val postRepository: PostRepository,
    private val likePostRepository: LikePostRepository
) {
    private lateinit var 게시물: Post
    private val 사용자_ID = 1L

    @BeforeEach
    fun setUp() {
        게시물 = `게시물을 저장한다`()
    }

    @Test
    fun `좋아요를 취소한다`() {
        `좋아요를 생성한다`(게시물.id, 사용자_ID)

        `좋아요를 취소한다`(게시물.id, 사용자_ID)
    }

    @Test
    fun `좋아요가 존재하지 않는 경우 취소할 수 없다`() {
        val actual = shouldThrow<IllegalStateException> { `좋아요를 취소한다`(게시물.id, 사용자_ID) }

        actual.message shouldStartWith "게시물에 좋아요가 존재하지 않습니다."
    }

    private fun `게시물을 저장한다`(): Post {
        val post = postRepository.save(ofDefaultPost())
        return post
    }

    private fun `좋아요를 생성한다`(postId: Long, userId: Long) {
        likePostRepository.save(LikePost(postId, userId))
    }

    private fun `좋아요를 취소한다`(postId: Long, userId: Long) {
        unlikePostService.unlike(postId, userId)
    }
}
