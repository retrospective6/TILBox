package com.tilbox.api.post.ui

import com.ninjasquad.springmockk.MockkBean
import com.tilbox.api.post.application.PostService
import com.tilbox.base.test.RestControllerTest
import com.tilbox.core.post.domain.fixture.ofDefaultCreateRequest
import com.tilbox.core.post.domain.fixture.ofDefaultUpdateRequest
import com.tilbox.core.post.query.PostQueryDao
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest

@WebMvcTest(controllers = [PostRestController::class])
class PostRestControllerTest : RestControllerTest() {

    @MockkBean
    private lateinit var postService: PostService

    @MockkBean
    private lateinit var postQueryDao: PostQueryDao

    @Test
    fun `게시글 작성 요청이 오면 게시글 생성후, 생성된 게시글의 ID를 반환한다`() {
        val request = ofDefaultCreateRequest()
        every { postService.savePost(any(), any(), any()) } returns 1L

        post("/v1/posts", request)
            .andExpect {
                status { isCreated() }
            }
    }

    @Test
    fun `게시글 수정 요청이 오면 게시글 수정후, 수정된 게시글의 ID를 반환한다`() {
        val postId = 1L
        val request = ofDefaultUpdateRequest()
        every { postService.updatePost(any(), any(), any(), any()) } returns postId

        put("/v1/posts/$postId", request)
            .andExpect {
                status { isOk() }
            }
    }

    @Test
    fun `게시글 삭제 요청시, 게시글 삭제후 NoContent Status 반환`() {
        val postId = 1L
        val request = ofDefaultUpdateRequest()
        every { postService.remove(any(), any()) } returns Unit

        delete("/v1/posts/$postId", request)
            .andExpect {
                status { isNoContent() }
            }
    }
}
