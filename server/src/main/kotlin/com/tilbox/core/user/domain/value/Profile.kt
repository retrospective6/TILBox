package com.tilbox.core.user.domain.value

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
data class Profile (
    @Column(nullable = false)
    val nickname: String,

    @Column(nullable = true)
    val image: String?,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = false)
    val subscribeCount: Long = 0L
)