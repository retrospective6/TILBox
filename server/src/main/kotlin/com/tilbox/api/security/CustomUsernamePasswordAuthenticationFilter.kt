package com.tilbox.api.security

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.core.log.LogMessage
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.stereotype.Component
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class CustomUsernamePasswordAuthenticationFilter(objectMapper: ObjectMapper) : UsernamePasswordAuthenticationFilter() {
    override fun successfulAuthentication(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain, authResult: Authentication) {
        SecurityContextHolder.getContext().authentication = authResult
        if (this.logger.isDebugEnabled) {
            this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
        }
        this.rememberMeServices.loginSuccess(request, response, authResult);
        if (this.eventPublisher!=null) {
            this.eventPublisher.publishEvent(InteractiveAuthenticationSuccessEvent(authResult, this::class.java));
        }
        chain.doFilter(request, response)
    }
}
