package com.tilbox.api.user.application

import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.core.user.domain.entity.User
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.PasswordEncodingStrategy
import com.tilbox.core.user.domain.value.Profile
import com.tilbox.core.user.domain.value.RegistrationType
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import javax.transaction.Transactional

@Transactional
@Service
class EmailUserCreateService(
    private val userRepository: UserRepository,
    private val passwordEncodingStrategy: PasswordEncodingStrategy,
) {
    fun createUser(request: UserCreateRequest): UserCreateResponse {
        check(!userRepository.existsByEmail(request.email)) { "이미 가입된 이메일입니다." }
        check(!userRepository.existsByMyTilAddress(request.myTilAddress)) { "이미 사용중인 TIL 주소입니다." }

        val currentDateTime = LocalDateTime.now()
        val user = User(
            myTilAddress = request.myTilAddress,
            email = request.email,
            profile = Profile(nickname = request.nickname, image = request.image),
            password = Password(value = request.password, passwordEncodingStrategy),
            registrationType = RegistrationType.EMAIL,
            createdAt = currentDateTime,
            updatedAt = currentDateTime,
        )
        val createdUser = userRepository.save(user.create())
        return UserCreateResponse(createdUser)
    }
}
