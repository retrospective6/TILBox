package com.tilbox.core.post.domain.fixture

import com.tilbox.core.post.domain.entity.Post
import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
import java.time.LocalDateTime

fun ofDefaultPost(
    postId: Long = 1L,
    userId: Long = 1L,
    title: String = "12/10일 TIL",
    content: String = """"
                |1.자바 스트림 API 목록
                |  - map : Function<T, V> 를 인자로 받아 T -> V의 객체로 변환
                |  - filter: Predicate<T>를 인자로 받아 true인 값들만 남긴다.
                |2. SOLID
                |  - SRP : 단일책임
                |  - OCP : 개방폐쇄
                |  - LSP : 리스코프 치환
                |  - ISP : 인터페이스 분리
                |  - DIP : 의존관계 역전""".trimMargin(),
    summary: String = "10/23일 TIL",
    tags: Tags = Tags.of(listOf("java", "stream")),
    thumbnailUrl: String? = "https://s3.amazonaws/sample/bucket/file.jpg",
    visibleLevel: PostVisibleLevel = PostVisibleLevel.PUBLIC,
    createdAt: LocalDateTime = LocalDateTime.of(2021, 12, 10, 10, 35),
    updatedAt: LocalDateTime = LocalDateTime.of(2021, 12, 10, 10, 35)
) = Post(
    id = postId,
    userId = userId,
    title = title,
    content = content,
    summary = summary,
    tags = tags,
    thumbnailUrl = thumbnailUrl,
    visibleLevel = visibleLevel,
    createdAt = createdAt,
    updatedAt = updatedAt
)
