package com.tilbox.api.subscribe.application

import com.tilbox.core.subscribe.domain.entity.Subscribe
import com.tilbox.core.subscribe.domain.repository.SubscribeRepository
import com.tilbox.core.user.domain.UserRepository
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Transactional
@Service
class SubscribeService(
    private val subscribeRepository: SubscribeRepository,
    private val userRepository: UserRepository
) {
    fun subscribe(userId: Long, followerId: Long) {
        check(userRepository.existsById(followerId)) { "사용자가 존재하지 않습니다. followerId=$followerId" }
        check(
            !subscribeRepository.existsByUserIdAndFollowerId(
                userId,
                followerId
            )
        ) { "이미 구독한 사용자입니다. userId=$userId, followId=$followerId" }
        subscribeRepository.save(Subscribe(userId, followerId))
    }

    fun unsubscribe(userId: Long, followerId: Long) {
        check(userRepository.existsById(followerId)) { "사용자가 존재하지 않습니다. followerId=$followerId" }
        val subscribe = subscribeRepository.findByUserIdAndFollowerId(userId, followerId)
            .orElseThrow {
                IllegalStateException("구독중이 아닙니다. userId=$userId, followerId=$followerId")
            }
        subscribeRepository.delete(subscribe)
    }
}
