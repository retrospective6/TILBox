package com.tilbox.api.like_post.application

import com.tilbox.base.test.DatabaseCleanUp
import com.tilbox.core.like_post.domain.LikePostRepository
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.fixture.ofDefaultPost
import com.tilbox.core.post.domain.repository.PostRepository
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.optional.shouldBePresent
import io.kotest.matchers.shouldNotBe
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import org.springframework.transaction.annotation.Transactional
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

@Transactional
@ActiveProfiles("test")
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class LikePostServiceTest(
    private val likePostService: LikePostService,
    private val postRepository: PostRepository,
    private val likePostRepository: LikePostRepository
) {
    @field:Autowired
    private lateinit var databaseCleanUp: DatabaseCleanUp

    private lateinit var 게시물: Post
    private val 사용자_ID = 1L

    @BeforeEach
    fun setUp() {
        게시물 = `게시물을 저장한다`()
    }

    @AfterEach
    fun tearDown() {
        databaseCleanUp.truncate()
    }

    @Test
    fun `게시물 좋아요를 생성한다`() {
        `좋아요를 생성한다`(게시물.id, 사용자_ID)

        CountDownLatch(1).await(2000, TimeUnit.MILLISECONDS)

        val actual = likePostRepository.findByPostIdAndUserId(게시물.id, 사용자_ID)
        actual shouldBePresent { it.id shouldNotBe null }
    }

    @Test
    fun `게시물이 존재하지 않는 경우 좋아요를 할 수 없다`() {
        val actual = shouldThrow<IllegalStateException> { `좋아요를 생성한다`(150L, 사용자_ID) }

        actual.message shouldStartWith "게시물이 존재하지 않습니다."
    }

    @Test
    fun `게시물 좋아요가 이미 존재하는 경우 예외가 발생한다`() {
        `좋아요를 생성한다`(게시물.id, 사용자_ID)

        val actual = shouldThrow<IllegalStateException> { `좋아요를 생성한다`(게시물.id, 사용자_ID) }

        actual.message shouldStartWith "이미 좋아요를 클릭한 게시물입니다."
    }

    private fun `게시물을 저장한다`(): Post {
        val post = postRepository.save(ofDefaultPost())
        return post
    }

    private fun `좋아요를 생성한다`(postId: Long, userId: Long) {
        likePostService.like(postId, userId)
    }
}
