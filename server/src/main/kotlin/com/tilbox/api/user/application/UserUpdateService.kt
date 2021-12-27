package com.tilbox.api.user.application

import com.tilbox.core.user.domain.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@Service
class UserUpdateService(private val userRepository: UserRepository) {
    fun updateUser(userUpdateRequest: UserUpdateRequest, userId: Long): UserUpdateResponse {
        val user = userRepository.findById(userId).orElseThrow {
            throw IllegalStateException("사용자가 존재하지 않습니다. userId=${userId}")
        }
        check(user.isAuthenticated()) { "회원 정보를 수정할 수 없습니다. userId=${userId}, status=${user.status}" }

        val currentDateTime = LocalDateTime.now()
        user.updateProfile(
            userUpdateRequest.nickname,
            userUpdateRequest.image,
            userUpdateRequest.description,
            currentDateTime
        )
        userRepository.save(user)
        return UserUpdateResponse(user)
    }
}
