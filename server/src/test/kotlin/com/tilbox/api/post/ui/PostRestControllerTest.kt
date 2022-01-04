package com.tilbox.api.post.ui

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.tilbox.base.test.RestControllerTest
import com.tilbox.core.post.domain.fixture.ofDefaultCreateRequest
import com.tilbox.core.post.domain.fixture.ofDefaultPost
import com.tilbox.core.post.domain.fixture.ofDefaultUpdateRequest
import com.tilbox.core.post.domain.repository.PostRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put

class PostRestControllerTest() : RestControllerTest() {

    @field:Autowired
    private lateinit var postRepository: PostRepository

    @Test
    fun `게시글 작성 요청이 오면 게시글 생성후, 생성된 게시글의 ID를 반환한다`() {
        val request = ofDefaultCreateRequest(userId = 3L)

        mockMvc.post("/v1/posts") {
            content = jacksonObjectMapper().writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isCreated() }
        }
    }

    @Test
    fun `게시글 수정 요청이 오면 게시글 수정후, 수정된 게시글의 ID를 반환한다`() {
        val savedPost = postRepository.save(ofDefaultPost(userId = 3L))
        val postId = savedPost.id
        val request = ofDefaultUpdateRequest(userId = 3L)

        mockMvc.put("/v1/posts/$postId") {
            content = jacksonObjectMapper().writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk() }
        }
    }
}
