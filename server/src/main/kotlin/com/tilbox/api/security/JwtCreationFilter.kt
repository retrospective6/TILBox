package com.tilbox.api.security

import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtCreationFilter(authenticationManager: AuthenticationManager, private val jwtProvider: JwtProvider) :
    BasicAuthenticationFilter(authenticationManager) {
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        if (isAuthenticated() && duringLogin(request as HttpServletRequest)) {
            val userPrincipal = getUserPrincipal()
            val token = jwtProvider.createToken(userPrincipal)
            setToken(response as HttpServletResponse, token)
        } else {
            chain.doFilter(request, response)
        }
    }

    private fun isAuthenticated(): Boolean {
        val authentication = SecurityContextHolder.getContext().authentication
        return authentication != null && authentication !is AnonymousAuthenticationToken
    }

    private fun duringLogin(request: HttpServletRequest): Boolean {
        val token = request.getHeader(HttpHeaders.AUTHORIZATION)
        return token == null
    }

    private fun getUserPrincipal(): UserPrincipal {
        val authentication = SecurityContextHolder.getContext().authentication
        return authentication.principal as UserPrincipal
    }

    private fun setToken(response: HttpServletResponse, token: String) {
        response.setHeader(HttpHeaders.AUTHORIZATION, token)
    }
}
