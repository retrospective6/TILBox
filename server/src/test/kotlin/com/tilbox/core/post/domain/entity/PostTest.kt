package com.tilbox.core.post.domain.entity

import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

class PostTest {

    @Test
    fun `본인이 작성하지 않은 게시글은 업데이트 할 수 없다`() {
        val createdPost = Post(
            id = 1L,
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

        val exception = shouldThrow<IllegalStateException> {
            createdPost.update(
                userId = 2L,
                title = "newTitle",
                content = "newContent",
                summary = "newSummary",
                tags = Tags.of(listOf("newtags")),
                thumbnailUrl = "newthumbnailUrl",
                visibleLevel = PostVisibleLevel.PRIVATE,
                updatedAt = LocalDateTime.of(2021, 12, 12, 16, 21)
            )
        }

        exception.message shouldBe "본인이 작성한 게시글만 수정할 수 있습니다."
    }

    @Test
    fun `본인이 작성한 게시글은 수정가능하다`() {
        val post = Post(
            id = 1L,
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

        post.update(
            userId = 1L,
            title = "newTitle",
            content = "newContent",
            summary = "newSummary",
            tags = Tags.of(listOf("newTags")),
            thumbnailUrl = "newThumbnailUrl",
            visibleLevel = PostVisibleLevel.PRIVATE,
            updatedAt = LocalDateTime.of(2021, 12, 12, 16, 21)
        )

        val expected = Post(
            id = 1L,
            userId = 1L,
            title = "newTitle",
            content = "newContent",
            summary = "newSummary",
            tags = Tags.of(listOf("newTags")),
            thumbnailUrl = "newThumbnailUrl",
            visibleLevel = PostVisibleLevel.PRIVATE,
            createdAt = LocalDateTime.of(2021, 12, 10, 10, 35),
            updatedAt = LocalDateTime.of(2021, 12, 12, 16, 21)
        )
        post shouldBeEqualToComparingFields expected
    }
}
