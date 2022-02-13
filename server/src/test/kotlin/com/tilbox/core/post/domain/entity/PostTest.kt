package com.tilbox.core.post.domain.entity

import com.tilbox.core.post.domain.fixture.ofDefaultPost
import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import java.time.LocalDateTime
import java.util.stream.Stream

class PostTest {
    @Test
    fun `본인이 작성하지 않은 게시글은 업데이트 할 수 없다`() {
        val createdPost = ofDefaultPost(userId = 1L)

        val exception = shouldThrow<IllegalStateException> {
            createdPost.update(
                userId = 2L,
                title = "newTitle",
                content = "newContent",
                summary = "newSummary",
                tags = Tags.of(listOf("newtags")),
                thumbnail = """{"type": "image", "value": "https://s3.amazonaws/sample/bucket/newThumbnail.jpg"}""",
                visibleLevel = PostVisibleLevel.PRIVATE,
                updatedAt = LocalDateTime.of(2021, 12, 12, 16, 21)
            )
        }

        exception.message shouldBe "본인이 작성한 게시글만 수정할 수 있습니다."
    }

    @Test
    fun `본인이 작성한 게시글은 수정가능하다`() {
        val post = ofDefaultPost(userId = 1L)

        post.update(
            userId = 1L,
            title = "newTitle",
            content = "newContent",
            summary = "newSummary",
            tags = Tags.of(listOf("newTags")),
            thumbnail = """{"type": "image", "value": "https://s3.amazonaws/sample/bucket/newThumbnail.jpg"}""",
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
            thumbnail = """{"type": "image", "value": "https://s3.amazonaws/sample/bucket/newThumbnail.jpg"}""",
            visibleLevel = PostVisibleLevel.PRIVATE,
            createdAt = LocalDateTime.of(2021, 12, 10, 10, 35),
            updatedAt = LocalDateTime.of(2021, 12, 12, 16, 21)
        )
        post shouldBeEqualToComparingFields expected
    }

    @ParameterizedTest
    @MethodSource("테스트셋 - 특정 유저가 작성한 게시물인지 확인")
    fun `특정 유저가 작성한 게시물인지 확인`(checkTargetUserId: Long, expected: Boolean) {
        val post = ofDefaultPost(userId = 1L)

        val result = post.sameUser(checkTargetUserId)

        result shouldBe expected
    }

    companion object {
        @JvmStatic
        fun `테스트셋 - 특정 유저가 작성한 게시물인지 확인`(): Stream<Arguments> = Stream.of(
            Arguments.of(1L, true),
            Arguments.of(2L, false),
        )
    }
}
