package com.tilbox.core.user.domain.entity

import com.tilbox.core.base.BaseRootEntity
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.EntityListeners

@EntityListeners(value = [AuditingEntityListener::class])
@Entity
class User(
    // TODO 적절한 이름 찾았을 때 변경하기
    @Column(nullable = false, unique = true)
    val loginId: String,

    @Column(nullable = false)
    var email: String,

    @Embedded
    var profile: Profile,

    @Column(nullable = false)
    var status: UserStatus = UserStatus.UNAUTHENTICATED,

    id: Long = 0L
) : BaseRootEntity<User>(id) {
    val nickname: String
        get() = profile.nickname

    val image: String?
        get() = profile.image

    val title: String
        get() = profile.title

    val description: String
        get() = profile.description

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    lateinit var createdAt: LocalDateTime

    @Column(nullable = false)
    @UpdateTimestamp
    lateinit var updatedAt: LocalDateTime

    constructor(
        loginId: String,
        email: String,
        nickname: String,
        image: String?,
        title: String,
        description: String,
        subscribeCount: Long = 0L,
        status: UserStatus = UserStatus.UNAUTHENTICATED,
        id: Long = 0L
    ) : this(
        loginId, email, Profile(nickname, image, title, description, subscribeCount), status, id
    )
}
