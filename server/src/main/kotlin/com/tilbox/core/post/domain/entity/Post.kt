package com.tilbox.core.post.domain.entity

import com.tilbox.core.base.BaseRootEntity
import com.tilbox.core.post.domain.value.PostVisibleLevel
import com.tilbox.core.post.domain.value.Tags
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.Lob

@Entity
class Post(
    @Column(name = "user_id", nullable = false)
    private val userId: Long,

    @Column(name = "title", nullable = false, length = 40)
    private var title: String,

    @Lob
    private var content: String,

    @Column(name = "summary", nullable = false, length = 150)
    private var summary: String,

    @Embedded
    private var tags: Tags,

    @Lob
    private var thumbnailUrl: String?,

    @Column(name = "visible_level", nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private var visibleLevel: PostVisibleLevel,

    @Column(name = "like_count", nullable = false)
    private var likeCount: Long = 0,

    @Column(name = "created_at", nullable = false)
    private val createdAt: LocalDateTime,

    @Column(name = "modified_at", nullable = false)
    private var updatedAt: LocalDateTime,

    id: Long = 0L
) : BaseRootEntity<Post>(id) {
    fun update(
        userId: Long,
        title: String,
        content: String,
        summary: String,
        tags: Tags,
        thumbnailUrl: String?,
        visibleLevel: PostVisibleLevel,
        updatedAt: LocalDateTime
    ) {
        if (userId != this.userId) {
            throw IllegalStateException("본인이 작성한 게시글만 수정할 수 있습니다.")
        }
        this.title = title
        this.content = content
        this.summary = summary
        this.tags = tags
        this.thumbnailUrl = thumbnailUrl
        this.visibleLevel = visibleLevel
        this.updatedAt = updatedAt
    }

    fun sameUser(userId: Long): Boolean = userId == this.userId
}
