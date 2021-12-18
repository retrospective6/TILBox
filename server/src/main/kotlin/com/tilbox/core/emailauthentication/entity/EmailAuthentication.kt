package com.tilbox.core.emailauthentication.entity

import com.tilbox.core.base.BaseEntity
import java.time.Duration
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity

@Entity
class EmailAuthentication(
    @Column(nullable = false)
    val email: String,

    @Column(nullable = false, columnDefinition = "char(8)")
    val code: String = UUID.randomUUID().toString().take(8),

    @Column(nullable = false)
    var authenticated: Boolean = false,

    @Column(nullable = false)
    val createdDateTime: LocalDateTime = LocalDateTime.now()
) : BaseEntity() {
    private val expiryDateTime: LocalDateTime
        get() = createdDateTime + EXPIRY_MINUTE_TIME

    fun authenticate(code: String) {
        require(this.code == code) {"인증코드가 일치하지 않습니다."}
        check(!authenticated) {"이미 인증되었습니다."}
        check(expiryDateTime > LocalDateTime.now()) { "인증 시간이 만료되었습니다." }
        authenticated = true
    }

    companion object {
        private val EXPIRY_MINUTE_TIME: Duration = Duration.ofDays(3L)
    }
}
