package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.PasswordEncodingStrategy
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.RegistrationType
import com.tilbox.core.user.domain.value.UserRole
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Transactional
@Service
class EmailUserCreateService(
    private val userRepository: UserRepository,
    private val passwordEncodingStrategy: PasswordEncodingStrategy,
) {
    fun createUser(request: UserCreateRequest): UserCreateResponse {
        check(!userRepository.existsByEmailAndRegistrationType(request.email, RegistrationType.EMAIL)) {
            "이미 가입된 이메일입니다."
        }
        check(!userRepository.existsByMyTilAddress(request.myTilAddress)) { "이미 사용중인 TIL 주소입니다." }

        val currentDateTime = LocalDateTime.now()
        val user = userRepository.save(
            User(
                myTilAddress = request.myTilAddress,
                email = request.email,
                profile = Profile(nickname = request.nickname, image = request.image),
                password = Password(value = request.password, passwordEncodingStrategy),
                registrationType = RegistrationType.EMAIL,
                userRole = UserRole.USER,
                createdAt = currentDateTime,
                updatedAt = currentDateTime,
                deletedAt = null
            )
        )
        return UserCreateResponse(user.create())
    }
}
