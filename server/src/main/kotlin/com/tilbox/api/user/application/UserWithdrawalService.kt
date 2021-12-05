package com.tilbox.api.user.application

import com.tilbox.api.security.UserPrincipal
import com.tilbox.core.user.domain.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@Service
class UserWithdrawalService(private val userRepository: UserRepository) {
    fun withdraw(loginUser: UserPrincipal) {
        val user = userRepository.findById(loginUser.userId).orElseThrow {
            throw IllegalStateException("사용자가 존재하지 않습니다. userId=${loginUser.userId}")
        }
        check(user.isAuthenticated()) { "회원 탈퇴할 수 없는 계정입니다. userId=${loginUser.userId}, status=${user.status}" }

        val currentDateTime = LocalDateTime.now()
        user.withdraw(currentDateTime)
        userRepository.save(user)
    }
}
