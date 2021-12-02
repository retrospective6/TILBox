package com.tilbox.api.subscribe.application

import com.tilbox.core.subscribe.domain.entity.Subscribe
import com.tilbox.core.subscribe.domain.repository.SubscribeRepository
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Transactional
@Service
class SubscribeService(private val subscribeRepository: SubscribeRepository) {
    fun subscribe(userId: Long, followerId: Long) {
        val subscribe = Subscribe(userId, followerId)
        subscribeRepository.save(subscribe)
    }

    fun unsubscribe(userId: Long, followerId: Long) {
        subscribeRepository.deleteByUserIdAndFollowerId(userId, followerId)
    }
}
