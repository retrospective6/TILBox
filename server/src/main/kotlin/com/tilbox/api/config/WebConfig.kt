package com.tilbox.api.config

import com.tilbox.api.security.LoginUserArgumentResolver
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig(private val loginUserArgumentResolver: LoginUserArgumentResolver) : WebMvcConfigurer {
    companion object {
        private val CORS_ALLOWED_METHODS: List<HttpMethod> = listOf(
            HttpMethod.GET,
            HttpMethod.POST,
            HttpMethod.PUT,
            HttpMethod.PATCH,
            HttpMethod.DELETE,
            HttpMethod.OPTIONS,
            HttpMethod.HEAD
        )
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedMethods(*CORS_ALLOWED_METHODS.map(HttpMethod::name).toTypedArray())
    }

    override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
        resolvers.add(loginUserArgumentResolver)
    }
}
