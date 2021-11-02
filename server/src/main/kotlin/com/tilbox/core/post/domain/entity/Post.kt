package com.tilbox.core.post.domain.entity

import com.tilbox.core.base.BaseRootEntity
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.Lob

@Entity
class Post(
    @Column(name = "user_id", nullable = false, columnDefinition = "게시물 작성자 id")
    private val userId: Long,

    @Column(name = "title", nullable = false, length = 40, columnDefinition = "TIL 제목")
    private val title: String,

    @Lob
    private val content: String,

    @Column(name = "summary", nullable = false, length = 150, columnDefinition = "게시물 요약")
    private val summary: String,

    @Embedded
    private val tags: Tags,

    @Lob
    private val thumbnail: String,

    @Column(name = "visibleLevel", nullable = false, length = 10, columnDefinition = "게시물 공개범위")
    @Enumerated(EnumType.STRING)
    private val visibleLevel: PostVisibleLevel,

    id: Long = 0L
) : BaseRootEntity<Post>(id) {

    @Column(name = "likeCount", nullable = false, columnDefinition = "댓글 좋아요 갯수")
    private val likeCount: Long = 0

    @Column(name = "created_at", nullable = false, columnDefinition = "게시물 작성시간")
    lateinit var createdAt: LocalDateTime

    @Column(name = "modified_at", nullable = false, columnDefinition = "게시물 수정시간")
    lateinit var updatedAt: LocalDateTime
}
