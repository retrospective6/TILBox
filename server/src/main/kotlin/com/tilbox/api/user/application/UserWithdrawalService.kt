package com.tilbox.api.user.application

import com.tilbox.core.user.domain.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@Service
class UserWithdrawalService(private val userRepository: UserRepository) {
    fun withdraw(userId: Long) {
        val user = userRepository.findById(userId).orElseThrow {
            throw IllegalStateException("사용자가 존재하지 않습니다. userId=$userId")
        }
        check(user.isAuthenticated()) { "회원 탈퇴할 수 없는 계정입니다. userId=$userId, status=${user.status}" }

        val currentDateTime = LocalDateTime.now()
        user.withdraw(currentDateTime)
        userRepository.save(user)
    }
}
