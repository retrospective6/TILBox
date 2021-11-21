package com.tilbox.api.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtTokenProvider {
    companion object {
        private val SECRET_KEY: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256) // TODO secret key 변경
        private val EXPIRATION_TIME_MILLISECOND: Long = Duration.ofDays(30L).toMillis()
        private const val AUTHORITIES_CLAIM_KEY = "role";
        private const val ROLE_DELIMITER = ","
    }

    fun createToken(authentication: Authentication): String {
        val authorities: List<String> = authentication.authorities.map(GrantedAuthority::getAuthority)

        val now = Date()
        val expiration = Date(now.time + EXPIRATION_TIME_MILLISECOND)

        return Jwts.builder()
            .setSubject(authentication.name)
            .claim(AUTHORITIES_CLAIM_KEY, authorities)
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(SECRET_KEY)
            .compact()
    }

    fun getAuthentication(token: String): Authentication {
        val claims: Claims = getClaims(token)

        val authorities = getAuthorities(claims)
        val principal = User(claims.subject, "", authorities)

        return UsernamePasswordAuthenticationToken(principal, token, authorities)
    }

    private fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .body
    }

    private fun getAuthorities(claims: Claims): List<SimpleGrantedAuthority> {
        return claims[AUTHORITIES_CLAIM_KEY].toString()
            .split(ROLE_DELIMITER)
            .map { SimpleGrantedAuthority(it) }
    }
}
