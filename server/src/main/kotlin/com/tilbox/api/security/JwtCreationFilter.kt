package com.tilbox.api.security

import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtCreationFilter(private val jwtProvider: JwtProvider) : GenericFilterBean() {
    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        createJwtToken(request, response)
        chain.doFilter(request, response)
    }

    private fun createJwtToken(request: ServletRequest, response: ServletResponse) {
        if (isAuthenticated() && duringLogin(request as HttpServletRequest)) {
            val userPrincipal = getUserPrincipal()
            val token = jwtProvider.createToken(userPrincipal)
            setToken(response as HttpServletResponse, token)
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
        response.writer.flush()
    }
}
