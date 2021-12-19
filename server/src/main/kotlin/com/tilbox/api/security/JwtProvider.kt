package com.tilbox.api.security

import com.tilbox.core.user.domain.UserRole
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.Date
import javax.crypto.SecretKey

@Component
class JwtProvider {
    companion object {
        private val SECRET_KEY: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256) // TODO secret key 변경
        private val EXPIRATION_TIME_MILLISECOND: Long = Duration.ofDays(30L).toMillis()
        private const val AUTHORIZATION_TYPE = "Bearer"
        private const val TOKEN_DELIMITER = " "
        private const val USER_ID_CLAIM_KEY = "userId"
        private const val ROLE_CLAIM_KEY = "role"
    }

    fun createToken(userId: Long, role: UserRole): String {
        val now = Date()
        val expiration = Date(now.time + EXPIRATION_TIME_MILLISECOND)

        val token = Jwts.builder()
            .setClaims(
                mutableMapOf(
                    USER_ID_CLAIM_KEY to userId,
                    ROLE_CLAIM_KEY to role.title
                )
            )
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(SECRET_KEY)
            .compact()
        return AUTHORIZATION_TYPE + TOKEN_DELIMITER + token
    }

    fun extractPayload(token: String): UserPrincipal {
        val claims = getClaims(token.substringAfter(AUTHORIZATION_TYPE + TOKEN_DELIMITER))
        val userId = claims.get(USER_ID_CLAIM_KEY, Integer::class.java).toLong()
        val role = claims.get(ROLE_CLAIM_KEY, String::class.java)
        return UserPrincipal(userId, null, null, listOf(SimpleGrantedAuthority(role)))
    }

    private fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .body
    }
}
