package com.tilbox.api.security

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.core.log.LogMessage
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class CustomUsernamePasswordAuthenticationFilter(
    authenticationManager: AuthenticationManager,
    private val objectMapper: ObjectMapper
) : UsernamePasswordAuthenticationFilter(authenticationManager) {
    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse?): Authentication? {
        if (!request.method.equals(HttpMethod.POST.name)) {
            throw AuthenticationServiceException("Authentication method not supported: " + request.method)
        }
        val loginRequest = objectMapper.readValue(request.inputStream, LoginRequest::class.java)
        var username = loginRequest?.email ?: ""
        username = username.trim { it <= ' ' }
        val password = loginRequest?.password ?: ""
        val authRequest = UsernamePasswordAuthenticationToken(username, password)
        // Allow subclasses to set the "details" property
        setDetails(request, authRequest)
        return authenticationManager.authenticate(authRequest)
    }

    override fun successfulAuthentication(
        request: HttpServletRequest,
        response: HttpServletResponse,
        chain: FilterChain,
        authResult: Authentication
    ) {
        SecurityContextHolder.getContext().authentication = authResult
        if (logger.isDebugEnabled) {
            logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult))
        }
        rememberMeServices.loginSuccess(request, response, authResult)
        if (eventPublisher != null) {
            eventPublisher.publishEvent(InteractiveAuthenticationSuccessEvent(authResult, this::class.java))
        }
        chain.doFilter(request, response)
    }
}
