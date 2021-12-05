package com.tilbox.api.post.application

import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.core.post.domain.value.PostVisibleLevel
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
class PostServiceTest(private val postService: PostService) {
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

        actual shouldBe 1
    }
}
