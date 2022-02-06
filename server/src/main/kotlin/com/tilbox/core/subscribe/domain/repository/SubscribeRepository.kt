package com.tilbox.core.subscribe.domain.repository

import com.tilbox.core.subscribe.domain.entity.Subscribe
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface SubscribeRepository : JpaRepository<Subscribe, Long> {
    fun existsByUserIdAndFollowerId(userId: Long, followerId: Long): Boolean

    fun findByUserIdAndFollowerId(userId: Long, followerId: Long): Optional<Subscribe>
}
