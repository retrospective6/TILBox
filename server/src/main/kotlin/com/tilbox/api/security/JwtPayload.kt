package com.tilbox.api.security

import com.tilbox.core.user.domain.value.UserRole

data class JwtPayload(val userId: Long, val userRole: UserRole)
