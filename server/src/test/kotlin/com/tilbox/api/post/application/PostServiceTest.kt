package com.tilbox.api.post.application

import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.api.post.application.dto.request.PostUpdateRequest
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.repository.PostRepository
import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
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
        val request = PostCreateRequest(
            userId = 3L,
            title = "10/23일 TIL",
            content = """"
                |1.자바 스트림 API 목록
                |  - map : Function<T, V> 를 인자로 받아 T -> V의 객체로 변환
                |  - filter: Predicate<T>를 인자로 받아 true인 값들만 남긴다.
                |2. SOLID
                |  - SRP : 단일책임
                |  - OCP : 개방폐쇄
                |  - LSP : 리스코프 치환
                |  - ISP : 인터페이스 분리
                |  - DIP : 의존관계 역전""".trimMargin(),
            summary = "10/23일 TIL",
            tags = listOf("java", "stream"),
            thumbnailUrl = "https://s3.amazonaws/sample/bucket/file.jpg",
            visibleLevel = PostVisibleLevel.PUBLIC
        )
        val createDateTime = LocalDateTime.of(2021, 10, 23, 15, 30, 10)

        val actual = postService.savePost(request, createDateTime)

        actual shouldBeGreaterThan 0
    }

    @Test
    fun `게시글 업데이트시 새로 생성된 게시글 ID를 반환한다`() {
        val createdPost = postRepository.save(
            Post(
                userId = 1L,
                title = "title",
                content = "content",
                summary = "summary",
                tags = Tags.of(listOf("tag1")),
                thumbnailUrl = "thumbnailUrl",
                visibleLevel = PostVisibleLevel.PRIVATE,
                createdAt = LocalDateTime.of(2021, 12, 10, 10, 35),
                updatedAt = LocalDateTime.of(2021, 12, 10, 10, 35)
            )
        )

        val targetId = createdPost.id
        val request = PostUpdateRequest(
            userId = 1L,
            title = "newTitle",
            content = "newContent",
            summary = "newSummary",
            tags = listOf("new", "tag2"),
            thumbnailUrl = "https://s3.amazonaws/sample/bucket/file.jpg",
            visibleLevel = PostVisibleLevel.PUBLIC
        )
        val updateDateTime = LocalDateTime.of(2021, 12, 23, 15, 30, 10)

        val actual = postService.updatePost(targetId, request, updateDateTime)

        actual shouldBe targetId
    }

    @Test
    fun `존재하지 않는 게시글은 업데이트 실패`() {
        val notExistPostId = 1L
        val request = PostUpdateRequest(
            userId = 1L,
            title = "newTitle",
            content = "newContent",
            summary = "newSummary",
            tags = listOf("new", "tag2"),
            thumbnailUrl = "https://s3.amazonaws/sample/bucket/file.jpg",
            visibleLevel = PostVisibleLevel.PUBLIC
        )
        val updateDateTime = LocalDateTime.of(2021, 12, 23, 15, 30, 10)

        val exception =
            shouldThrow<IllegalArgumentException> { postService.updatePost(notExistPostId, request, updateDateTime) }

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
        val createdPostId = postRepository.save(
            Post(
                userId = createUserId,
                title = "title",
                content = "content",
                summary = "summary",
                tags = Tags.of(listOf("tag1")),
                thumbnailUrl = "thumbnailUrl",
                visibleLevel = PostVisibleLevel.PRIVATE,
                createdAt = LocalDateTime.of(2021, 12, 10, 10, 35),
                updatedAt = LocalDateTime.of(2021, 12, 10, 10, 35)
            )
        ).id
        val requestUserId = 2L

        val exception = shouldThrow<IllegalArgumentException> { postService.remove(createdPostId, requestUserId) }

        exception.message shouldBe "본인이 작성한 게시글만 삭제할 수 있습니다."
    }
}
