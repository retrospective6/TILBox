package com.tilbox.api.security

import com.tilbox.core.user.domain.value.UserRole
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtTokenProvider {
    companion object {
        private val SECRET_KEY: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256) // TODO secret key 변경
        private val EXPIRATION_TIME_MILLISECOND: Long = Duration.ofDays(30L).toMillis()
        private const val USER_ID_CLAIM_KEY = "userId";
        private const val AUTHORITY_CLAIM_KEY = "role";
    }

    fun createToken(payload: JwtPayload): String {
        val now = Date()
        val expiration = Date(now.time + EXPIRATION_TIME_MILLISECOND)

        return Jwts.builder()
            .setClaims(mutableMapOf(USER_ID_CLAIM_KEY to payload.userId, AUTHORITY_CLAIM_KEY to payload.userRole.title))
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(SECRET_KEY)
            .compact()
    }

    fun extractPayload(token: String): JwtPayload {
        val claims = getClaims(token)
        val userId = claims.get(USER_ID_CLAIM_KEY) as Long
        val role = UserRole.from(claims.get(AUTHORITY_CLAIM_KEY) as String)
        return JwtPayload(userId, role)
    }

    private fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .body
    }
}
