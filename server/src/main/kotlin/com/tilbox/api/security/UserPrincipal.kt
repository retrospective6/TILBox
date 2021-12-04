package com.tilbox.api.security

import com.tilbox.core.user.domain.value.Password
import com.tilbox.core.user.domain.value.UserRole
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserPrincipal(
    val userId: Long,
    val email: String?,
    private val password: String?,
    private val authorities: Collection<GrantedAuthority>
) : UserDetails {
    constructor(userId: Long, email: String, password: Password, userRole: UserRole) :
        this(userId, email, password.value, listOf(SimpleGrantedAuthority(userRole.title)))

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun getUsername(): String? {
        return email
    }

    override fun getPassword(): String? {
        return password
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }
}
