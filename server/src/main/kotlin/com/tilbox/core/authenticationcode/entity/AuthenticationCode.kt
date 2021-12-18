package com.tilbox.core.authenticationcode.entity

import com.tilbox.core.base.BaseEntity
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity

@Entity
class AuthenticationCode(
    @Column(nullable = false)
    val email: String,

    @Column(nullable = false, columnDefinition = "char(8)")
    val code: String = UUID.randomUUID().toString().take(8),

    @Column(nullable = false)
    var authenticated: Boolean = false,

    @Column(nullable = false)
    val createdDateTime: LocalDateTime = LocalDateTime.now()
) : BaseEntity() {
}
