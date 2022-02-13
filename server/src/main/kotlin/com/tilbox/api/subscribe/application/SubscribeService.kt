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
    fun subscribe(userId: Long, followingId: Long) {
        check(userRepository.existsById(followingId)) { "팔로잉 사용자가 존재하지 않습니다. followingId=$followingId" }
        check(
            !subscribeRepository.existsByUserIdAndFollowerId(
                userId,
                followingId
            )
        ) { "이미 구독한 사용자입니다. userId=$userId, followingId=$followingId" }
        subscribeRepository.save(Subscribe(userId, followingId))
    }

    fun unsubscribe(userId: Long, followingId: Long) {
        check(userRepository.existsById(followingId)) { "팔로잉 사용자가 존재하지 않습니다. followingId=$followingId" }
        val subscribe = subscribeRepository.findByUserIdAndFollowerId(userId, followingId)
            .orElseThrow {
                IllegalStateException("구독중이 아닙니다. userId=$userId, followingId=$followingId")
            }
        subscribeRepository.delete(subscribe)
    }
}
