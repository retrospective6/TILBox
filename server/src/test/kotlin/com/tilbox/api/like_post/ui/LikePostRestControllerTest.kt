package com.tilbox.api.like_post.ui

import com.ninjasquad.springmockk.MockkBean
import com.tilbox.api.like_post.application.LikePostService
import com.tilbox.api.like_post.application.UnlikePostService
import com.tilbox.base.test.RestControllerTest
import io.mockk.justRun
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest

@WebMvcTest(controllers = [LikePostRestController::class])
class LikePostRestControllerTest : RestControllerTest() {
    @MockkBean
    private lateinit var likePostService: LikePostService

    @MockkBean
    private lateinit var unlikePostService: UnlikePostService

    @Test
    fun `게시물에 좋아요를 누른다`() {
        // given
        justRun { likePostService.like(any(), any()) }

        // when
        val actual = post("/posts/1/like")

        // then
        actual.andExpect {
            status { isNoContent() }
        }
    }

    @Test
    fun `게시물 좋아요를 취소한다`() {
        // given
        justRun { unlikePostService.unlike(any(), any()) }

        // when
        val actual = post("/posts/1/unlike")

        // then
        actual.andExpect {
            status { isNoContent() }
        }
    }
}
