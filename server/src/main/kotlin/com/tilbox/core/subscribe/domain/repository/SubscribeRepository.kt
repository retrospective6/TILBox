package com.tilbox.core.subscribe.domain.repository

import com.tilbox.core.subscribe.domain.entity.Subscribe
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface SubscribeRepository : JpaRepository<Subscribe, Long> {
    fun existsByUserIdAndFollowingId(userId: Long, followingId: Long): Boolean

    fun findByUserIdAndFollowingId(userId: Long, followingId: Long): Optional<Subscribe>
}
