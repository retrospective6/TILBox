package com.tilbox.api.user.application

import com.tilbox.api.security.UserPrincipal
import com.tilbox.core.user.domain.repository.UserRepository
import com.tilbox.core.user.domain.value.RegistrationType
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class EmailPasswordUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {
    @Transactional(readOnly = true)
    override fun loadUserByUsername(email: String): UserDetails {
        val user = userRepository.findByEmailAndRegistrationType(email, RegistrationType.EMAIL)
            ?: throw UsernameNotFoundException("사용자를 찾을 수 없습니다. email=$email")
        check(user.canNotLogin()) { "로그인 불가능한 계정입니다. email=$email" }
        return UserPrincipal(user.id, user.email, user.password, user.userRole)
    }
}
