package com.tilbox.api.security

import io.jsonwebtoken.JwtException
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtAuthenticationFilter(private val jwtProvider: JwtProvider) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (hasAuthorizationHeader(request)) {
            authenticate(request)
        }
        filterChain.doFilter(request, response)
    }

    private fun authenticate(request: HttpServletRequest) {
        try {
            val token = extractTokenFromHeader(request)
            val payload = jwtProvider.extractPayload(token)
            SecurityContextHolder.getContext().authentication = UsernamePasswordAuthenticationToken(
                payload.userId, "", payload.authorities
            )
        } catch (exception: JwtException) {
            logger.info("사용자 인증에 실패했습니다. message=${exception.message}")
        } catch (exception: IllegalArgumentException) {
            logger.info("올바르지 않은 입력값을 포함하고 있습니다. message=${exception.message}")
        }
    }

    private fun hasAuthorizationHeader(request: HttpServletRequest): Boolean {
        return request.getHeader(HttpHeaders.AUTHORIZATION) != null
    }

    private fun extractTokenFromHeader(request: HttpServletRequest): String {
        return request.getHeader(HttpHeaders.AUTHORIZATION) ?: throw IllegalArgumentException("토큰이 존재하지 않습니다.")
    }
}
