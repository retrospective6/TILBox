package com.tilbox.api.config

import com.tilbox.api.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.config.web.servlet.invoke
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.header.HeaderWriterFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
) : WebSecurityConfigurerAdapter() {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder()
    }

    override fun configure(http: HttpSecurity) {
        http {
            cors {}
            csrf { disable() }
            httpBasic { disable() }
            headers { frameOptions { disable() } }
            authorizeRequests { authorize("/**", permitAll) }
            addFilterBefore(jwtAuthenticationFilter, HeaderWriterFilter::class.java)
            sessionManagement { SessionCreationPolicy.STATELESS }
        }
    }
}
