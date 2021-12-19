package com.tilbox.core.user.domain

import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface UserRepository : JpaRepository<User, Long> {
    fun findByMyTilAddress(loginId: String): Optional<User>

    fun findByEmail(email: String): Optional<User>

    fun findByEmailAndRegistrationType(email: String, registrationType: RegistrationType): Optional<User>

    fun existsByMyTilAddress(myTilAddress: String): Boolean

    fun existsByEmailAndRegistrationType(email: String, registrationType: RegistrationType): Boolean
}
