package com.tilbox.core.subscribe.domain.entity

import com.tilbox.core.base.BaseRootEntity
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.UniqueConstraint

@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["user_id", "following_id"])])
@Entity
class Subscribe(
    @Column(name = "user_id", nullable = false)
    val userId: Long,

    @Column(name = "following_id", nullable = false)
    val followingId: Long,

    id: Long = 0L
) : BaseRootEntity<Subscribe>(id)
