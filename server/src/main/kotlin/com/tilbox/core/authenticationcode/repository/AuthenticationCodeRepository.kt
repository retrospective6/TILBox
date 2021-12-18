package com.tilbox.core.authenticationcode.repository

import com.tilbox.core.authenticationcode.entity.AuthenticationCode
import org.springframework.data.jpa.repository.JpaRepository

interface AuthenticationCodeRepository : JpaRepository<AuthenticationCode, Long> {
}
