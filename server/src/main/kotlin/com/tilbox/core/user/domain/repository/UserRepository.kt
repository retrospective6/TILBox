package com.tilbox.core.user.domain.repository

import com.tilbox.core.user.domain.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByMyTilAddress(loginId: String): User?

    fun findByEmail(email: String): User?

    fun existsByMyTilAddress(loginId: String): Boolean

    fun existsByEmail(email: String): Boolean
}
