package com.tilbox.core.subscribe.domain.repository

import com.tilbox.core.subscribe.domain.entity.Subscribe
import org.springframework.data.jpa.repository.JpaRepository

interface SubscribeRepository : JpaRepository<Subscribe, Long> {
    fun deleteByUserIdAndFollowerId(userId: Long, followerId: Long)
}
