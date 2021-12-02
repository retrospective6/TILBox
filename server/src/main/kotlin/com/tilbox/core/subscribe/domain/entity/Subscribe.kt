package com.tilbox.core.subscribe.domain.entity

import com.tilbox.core.base.BaseRootEntity
import javax.persistence.Column
import javax.persistence.Entity

@Entity
class Subscribe (
    @Column(name = "user_id", nullable = false)
    val userId: Long,

    @Column(name = "follower_id", nullable = false)
    val followerId: Long,

    id: Long = 0L
) : BaseRootEntity<Subscribe>(id)
