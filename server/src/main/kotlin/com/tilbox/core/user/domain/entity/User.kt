package com.tilbox.core.user.domain.entity

import com.tilbox.core.base.BaseRootEntity
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.PasswordMatchStrategy
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
    val myTilName: String,

    @Column(name = "email", nullable = false)
    var email: String,

    @Embedded
    var profile: Profile,

    @Embedded
    var password: Password,

    @Column(name = "status", nullable = false)
    var status: UserStatus = UserStatus.UNAUTHENTICATED,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime,

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime,

    id: Long = 0L
) : BaseRootEntity<User>(id) {
    fun create(): User {
        registerEvent(UserCreatedEvent(myTilName, email, profile.nickname, createdAt))
        return this
    }

    fun isCorrectPassword(rawPassword: String, passwordMatchStrategy: PasswordMatchStrategy): Boolean {
        return password.match(rawPassword, passwordMatchStrategy)
    }
}
