package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.core.user.domain.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import javax.transaction.Transactional

@Transactional
@Service
class UserCreateService(
    private val userRepository: UserRepository
) {
    fun createUser(request: UserCreateRequest): UserCreateResponse {
        check(!userRepository.existsByEmail(request.email)) { "이미 가입된 이메일입니다." }
        check(!userRepository.existsByMyTilName(request.myTilName)) { "이미 사용중인 TIL 이름입니다." }

        val user = request.toEntity(LocalDateTime.now())
        val createdUser = userRepository.save(user.create())
        return UserCreateResponse(createdUser)
    }
}
