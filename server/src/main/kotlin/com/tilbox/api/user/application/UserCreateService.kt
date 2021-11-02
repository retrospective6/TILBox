package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.core.user.domain.repository.UserRepository
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Transactional
@Service
class UserCreateService(
    private val userRepository: UserRepository
) {
    fun createUser(request: UserCreateRequest): UserCreateResponse {
        check(!userRepository.existsByEmail(request.email)) { "이미 가입된 이메일입니다." }
        val user = request.toEntity()
        val createdUser = userRepository.save(user.create())
        return UserCreateResponse(createdUser)
    }
}
