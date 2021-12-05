package com.tilbox.core.user.domain.entity

import com.tilbox.core.base.BaseRootEntity
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.PasswordMatchStrategy
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.RegistrationType
import com.tilbox.core.user.domain.value.UserRole
import com.tilbox.core.user.domain.value.UserStatus
import com.tilbox.core.user.event.UserCreatedEvent
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity

@Entity
class User(
    @Column(name = "myTilAddress", nullable = false, unique = true)
    val myTilAddress: String,

    @Column(name = "email", nullable = false)
    var email: String,

    @Embedded
    var profile: Profile,

    @Embedded
    var password: Password,

    @Column(name = "status", nullable = false)
    var status: UserStatus = UserStatus.UNAUTHENTICATED,

    @Column(name = "registration_type", nullable = false)
    val registrationType: RegistrationType,

    @Column(name = "role", nullable = false)
    val userRole: UserRole,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime,

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime,

    @Column(name = "deleted_at", nullable = true)
    var deletedAt: LocalDateTime?,

    id: Long = 0L
) : BaseRootEntity<User>(id) {
    fun create(): User {
        registerEvent(UserCreatedEvent(myTilAddress, email, profile.nickname, registrationType, createdAt))
        return this
    }

    fun isCorrectPassword(rawPassword: String, passwordMatchStrategy: PasswordMatchStrategy): Boolean {
        return password.match(rawPassword, passwordMatchStrategy)
    }

    fun withdraw(deletedAt: LocalDateTime) {
        status = UserStatus.DEACTIVATED
        this.deletedAt = deletedAt
    }

    fun canNotLogin(): Boolean {
        return status === UserStatus.DEACTIVATED || status === UserStatus.BLOCKED
    }

    fun canWithdrawal(): Boolean {
        return status === UserStatus.AUTHENTICATED
    }
}
