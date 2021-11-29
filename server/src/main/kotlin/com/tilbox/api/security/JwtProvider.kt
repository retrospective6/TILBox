package com.tilbox.api.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtProvider {
    companion object {
        private val SECRET_KEY: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256) // TODO secret key 변경
        private val EXPIRATION_TIME_MILLISECOND: Long = Duration.ofDays(30L).toMillis()
        private const val USER_ID_CLAIM_KEY = "userId";
        private const val ROLE_CLAIM_KEY = "role";
    }

    fun createToken(userPrincipal: UserPrincipal): String {
        val now = Date()
        val expiration = Date(now.time + EXPIRATION_TIME_MILLISECOND)

        return Jwts.builder()
            .setClaims(mutableMapOf(USER_ID_CLAIM_KEY to userPrincipal.userId, ROLE_CLAIM_KEY to userPrincipal.authorities.first().toString()))
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(SECRET_KEY)
            .compact()
    }

    fun extractPayload(token: String): UserPrincipal {
        val claims = getClaims(token)
        val userId = claims.get(USER_ID_CLAIM_KEY, Long::class.java)
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
