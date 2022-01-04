package com.tilbox.api.user.application

import com.tilbox.api.security.JwtProvider
import com.tilbox.core.user.domain.LoginFailedException
import com.tilbox.core.user.domain.PasswordMatchStrategy
import com.tilbox.core.user.domain.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class LoginService(
    private val jwtProvider: JwtProvider,
    private val userRepository: UserRepository,
    private val passwordMatchStrategy: PasswordMatchStrategy
) {
    fun login(request: LoginRequest): LoginResponse {
        val user = this.userRepository.findByEmail(request.email).orElseThrow {
            throw IllegalStateException("사용자가 존재하지 않습니다. email=${request.email}")
        }

        if (user.canNotLogin()) {
            throw LoginFailedException("로그인 할 수 없는 계정입니다. email=${request.email}, status=${user.status}")
        }

        if (!user.isCorrectPassword(request.password, passwordMatchStrategy)) {
            throw LoginFailedException("비밀번호가 일치하지 않습니다. email=${request.email}")
        }

        val token = jwtProvider.createToken(user.id, user.userRole)
        return LoginResponse(token)
    }
}
