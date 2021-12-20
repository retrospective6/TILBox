package com.tilbox.api.post.application

import com.tilbox.core.post.domain.fixture.defaultPost
import com.tilbox.core.post.domain.fixture.ofCreate
import com.tilbox.core.post.domain.fixture.ofUpdate
import com.tilbox.core.post.domain.repository.PostRepository
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.longs.shouldBeGreaterThan
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class PostServiceTest(
    private val postService: PostService,
    private val postRepository: PostRepository
) {
    @Test
    fun `게시글 작성시 새로 생성된 게시글 ID를 반환한다`() {
        val createRequest = ofCreate()
        val createDateTime = LocalDateTime.of(2021, 10, 23, 15, 30, 10)

        val actual = postService.savePost(createRequest, createDateTime)

        actual shouldBeGreaterThan 0
    }

    @Test
    fun `게시글 업데이트시 새로 생성된 게시글 ID를 반환한다`() {
        val createdPost = postRepository.save(defaultPost())
        val targetId = createdPost.id
        val updateRequest = ofUpdate()
        val updateDateTime = LocalDateTime.of(2021, 12, 23, 15, 30, 10)

        val actual = postService.updatePost(targetId, updateRequest, updateDateTime)

        actual shouldBe targetId
    }

    @Test
    fun `존재하지 않는 게시글은 업데이트 실패`() {
        val notExistPostId = 1L
        val updateRequest = ofUpdate()
        val updateDateTime = LocalDateTime.of(2021, 12, 23, 15, 30, 10)

        val exception =
            shouldThrow<IllegalArgumentException> {
                postService.updatePost(
                    notExistPostId,
                    updateRequest,
                    updateDateTime
                )
            }

        exception.message shouldBe "해당하는 ID(1)의 게시글이 존재하지 않습니다."
    }

    @Test
    fun `존재하지 않는 게시물 삭제시도시 실패`() {
        val notExistPostId = 1L

        val exception = shouldThrow<IllegalArgumentException> { postService.remove(notExistPostId, 1L) }

        exception.message shouldBe "존재하지 않는 게시글입니다."
    }

    @Test
    fun `본인이 작성하지 않은 게시물 삭제시도시 실패`() {
        val createUserId = 1L
        val createdPostId = postRepository.save(defaultPost(userId = createUserId)).id
        val requestUserId = 2L

        val exception = shouldThrow<IllegalArgumentException> { postService.remove(createdPostId, requestUserId) }

        exception.message shouldBe "본인이 작성한 게시글만 삭제할 수 있습니다."
    }
}
