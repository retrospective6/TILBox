package com.tilbox.core.user.domain.entity

import com.tilbox.core.base.BaseRootEntity
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.UserStatus
import com.tilbox.core.user.event.UserCreatedEvent
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity

@Entity
class User(
    @Column(name = "login_id", nullable = false, unique = true)
    val loginId: String,

    @Column(name = "email", nullable = false)
    var email: String,

    @Embedded
    var profile: Profile,

    @Column(name = "status", nullable = false)
    var status: UserStatus = UserStatus.UNAUTHENTICATED,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime,

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime,

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

    constructor(
        loginId: String,
        email: String,
        nickname: String,
        image: String?,
        title: String,
        description: String,
        subscribeCount: Long = 0L,
        status: UserStatus = UserStatus.UNAUTHENTICATED,
        createdAt: LocalDateTime = LocalDateTime.now(),
        updatedAt: LocalDateTime = LocalDateTime.now(),
        id: Long = 0L
    ) : this(
        loginId, email, Profile(nickname, image, title, description, subscribeCount), status, createdAt, updatedAt, id
    )

    fun create(): User {
        registerEvent(UserCreatedEvent(loginId, email, nickname, createdAt))
        return this
    }
}
