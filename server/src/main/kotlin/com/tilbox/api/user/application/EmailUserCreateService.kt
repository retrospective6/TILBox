package com.tilbox.api.user.application

import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.PasswordEncodingStrategy
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.RegistrationType
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserRepository
import com.tilbox.core.user.domain.UserRole
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
            "이미 가입된 이메일입니다. email=${request.email}"
        }
        check(!userRepository.existsByMyTilAddress(request.myTilAddress)) { "이미 사용중인 TIL 주소입니다. myTilAddress=${request.myTilAddress}" }

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
