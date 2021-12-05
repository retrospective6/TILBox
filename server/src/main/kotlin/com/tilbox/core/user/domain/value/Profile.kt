package com.tilbox.core.user.domain.value

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
data class Profile(
    @Column(name = "nickname", nullable = false)
    val nickname: String,

    @Column(name = "image", nullable = true)
    val image: String?,

    @Column(name = "description", nullable = false)
    val description: String = "",

    @Column(name = "subscribe_count", nullable = false)
    val subscribeCount: Long = 0L
)
