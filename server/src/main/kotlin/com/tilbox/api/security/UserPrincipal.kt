package com.tilbox.api.security

import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.UserRole
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserPrincipal(
    val userId: Long,
    val name: String?,
    val email: String?,
    private val password: String?,
    private val authorities: Collection<GrantedAuthority>
) : UserDetails {
    constructor(userId: Long, name: String?, email: String?, password: Password?, userRole: UserRole) :
        this(userId, name, email, password?.value, listOf(SimpleGrantedAuthority(userRole.title)))

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

fun fromToken(userId: Long, userRole: UserRole): UserPrincipal {
    return UserPrincipal(userId, null, null, null, userRole)
}
