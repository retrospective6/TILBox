package com.tilbox.api.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.tilbox.api.security.CustomUsernamePasswordAuthenticationFilter
import com.tilbox.api.security.JwtAuthenticationFilter
import com.tilbox.api.security.JwtCreationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.config.web.servlet.invoke
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.logout.LogoutFilter
import org.springframework.security.web.header.HeaderWriterFilter

@Configuration
@EnableWebSecurity(debug = true)
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val jwtCreationFilter: JwtCreationFilter,
    private val objectMapper: ObjectMapper
) : WebSecurityConfigurerAdapter() {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder()
    }

    @Bean
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    override fun configure(http: HttpSecurity) {
        http {
            cors {
            }
            csrf { disable() }
            authorizeRequests {
                authorize("/**", permitAll)
            }
            addFilterBefore(jwtAuthenticationFilter, HeaderWriterFilter::class.java)
            addFilterAfter(CustomUsernamePasswordAuthenticationFilter(authenticationManager(), objectMapper), LogoutFilter::class.java)
            addFilterAfter(jwtCreationFilter, CustomUsernamePasswordAuthenticationFilter::class.java)
            sessionManagement { SessionCreationPolicy.STATELESS }
            formLogin {
                loginProcessingUrl = "/login"
            }
        }
    }
}
