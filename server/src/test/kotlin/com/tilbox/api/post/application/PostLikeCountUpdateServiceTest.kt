package com.tilbox.api.post.application

import com.tilbox.api.like_post.application.LikePostService
import com.tilbox.api.like_post.application.UnlikePostService
import com.tilbox.base.test.DatabaseCleanUp
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.fixture.ofDefaultPost
import com.tilbox.core.post.domain.repository.PostRepository
import io.kotest.matchers.longs.shouldBeExactly
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class PostLikeCountUpdateServiceTest(
    private val likePostService: LikePostService,
    private val unlikePostService: UnlikePostService,
    private val postRepository: PostRepository
) {
    @field:Autowired
    private lateinit var databaseCleanUp: DatabaseCleanUp

    private val countDownLatch = CountDownLatch(1)

    private lateinit var 게시물: Post

    @BeforeEach
    fun setUp() {
        게시물 = postRepository.save(ofDefaultPost())
    }

    @AfterEach
    fun tearDown() {
        databaseCleanUp.truncate()
    }

    @Test
    fun `좋아요 이벤트가 발생하면 좋아요 수가 1 증가한다`() {
        likePostService.like(게시물.id, 1L)
        countDownLatch.await(2_000L, TimeUnit.MILLISECONDS)

        val actual = postRepository.findById(게시물.id).get()
        actual.likeCount shouldBeExactly 1L
    }

    @Test
    fun `좋아요 취소 이벤트가 발생하면 좋아요 수가 1 감소한다`() {
        likePostService.like(게시물.id, 1L)

        unlikePostService.unlike(게시물.id, 1L)
        countDownLatch.await(2_000L, TimeUnit.MILLISECONDS)

        val actual = postRepository.findById(게시물.id).get()
        actual.likeCount shouldBeExactly 0L
    }
}
