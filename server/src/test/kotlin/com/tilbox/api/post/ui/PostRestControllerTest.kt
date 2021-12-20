package com.tilbox.api.post.ui

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.base.test.RestControllerTest
import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.repository.PostRepository
import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import java.time.LocalDateTime

class PostRestControllerTest() : RestControllerTest() {

    @field:Autowired
    private lateinit var postRepository: PostRepository

    @Test
    fun `게시글 작성 요청이 오면 게시글 생성후, 생성된 게시글의 ID를 반환한다`() {
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
        val savedPost = postRepository.save(
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

        val postId = savedPost.id
        val request = PostCreateRequest(
            userId = 3L,
            title = "10/23일 TIL",
            content = "new content",
            summary = "new summary",
            tags = listOf("newTag1", "newTag2"),
            thumbnailUrl = "https://s3.amazonaws/sample/bucket/file.jpg",
            visibleLevel = PostVisibleLevel.PUBLIC
        )

        mockMvc.put("/v1/posts/$postId") {
            content = jacksonObjectMapper().writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk() }
        }
    }
}
