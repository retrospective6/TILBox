package com.tilbox.api.config

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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.logout.LogoutFilter
import org.springframework.security.web.header.HeaderWriterFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(private val jwtCreationFilter: JwtCreationFilter, private val jwtAuthenticationFilter: JwtAuthenticationFilter) : WebSecurityConfigurerAdapter() {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder()
    }

    @Bean
    override fun authenticationManager(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun usernamePasswordAuthenticationFilter(): UsernamePasswordAuthenticationFilter {
        return CustomUsernamePasswordAuthenticationFilter(authenticationManager())
    }

    override fun configure(http: HttpSecurity) {
        http {
            formLogin {
            }
            headers {
                frameOptions { sameOrigin }
            }
            cors {
            }
            authorizeRequests {
                authorize("/**", permitAll)
            }
            addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
            addFilterAfter(usernamePasswordAuthenticationFilter(), LogoutFilter::class.java)
            addFilterAfter(jwtCreationFilter, HeaderWriterFilter::class.java)
            sessionManagement { SessionCreationPolicy.STATELESS }
        }
    }
}
