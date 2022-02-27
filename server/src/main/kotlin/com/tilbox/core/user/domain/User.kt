package com.tilbox.core.user.domain

import com.tilbox.core.base.BaseRootEntity
import java.time.LocalDateTime
import java.time.LocalTime
import javax.persistence.Column
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated

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

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    var status: UserStatus = UserStatus.UNAUTHENTICATED,

    @Enumerated(EnumType.STRING)
    @Column(name = "registration_type", nullable = false)
    val registrationType: RegistrationType,

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    val userRole: UserRole,

    @Column(name = "email_notification_time", nullable = true)
    var emailNotificationTime: LocalTime?,

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

    fun updateProfile(
        nickname: String,
        image: String?,
        description: String,
        emailNotificationTime: LocalTime?,
        updatedAt: LocalDateTime
    ) {
        this.profile = Profile(nickname, image, description, this.profile.subscribeCount)
        this.emailNotificationTime = emailNotificationTime
        this.updatedAt = updatedAt
    }

    fun isCorrectPassword(rawPassword: String, passwordMatchStrategy: PasswordMatchStrategy): Boolean {
        return password.match(rawPassword, passwordMatchStrategy)
    }

    fun withdraw(deletedAt: LocalDateTime) {
        status = UserStatus.DEACTIVATED
        this.deletedAt = deletedAt
    }

    fun canNotLogin(): Boolean {
        return status !== UserStatus.AUTHENTICATED
    }

    fun isAuthenticated(): Boolean {
        return status === UserStatus.AUTHENTICATED
    }

    fun authenticate() {
        this.status = UserStatus.AUTHENTICATED
    }
}
