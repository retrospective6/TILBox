package com.tilbox.base.test

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import com.tilbox.api.security.JwtProvider
import com.tilbox.api.security.LoginUserArgumentResolver
import com.tilbox.api.security.LoginUserId
import com.tilbox.api.security.RestAccessDeniedHandler
import io.mockk.every
import io.mockk.slot
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.MethodParameter
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActionsDsl
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.filter.CharacterEncodingFilter

abstract class RestControllerTest {
    lateinit var mockMvc: MockMvc

    @Autowired
    protected lateinit var objectMapper: ObjectMapper

    @MockkBean
    private lateinit var jwtProvider: JwtProvider

    @MockkBean
    private lateinit var restAccessDeniedHandler: RestAccessDeniedHandler

    @MockkBean
    private lateinit var loginUserArgumentResolver: LoginUserArgumentResolver

    @BeforeEach
    internal fun setUp(
        webApplicationContext: WebApplicationContext,
    ) {
        mockMvc = MockMvcBuilders
            .webAppContextSetup(webApplicationContext)
            .addFilter<DefaultMockMvcBuilder>(CharacterEncodingFilter("UTF-8", true))
            .alwaysDo<DefaultMockMvcBuilder>(MockMvcResultHandlers.print())
            .build()

        loginUserArgumentResolver.also {
            slot<MethodParameter>().also { slot ->
                every { it.supportsParameter(capture(slot)) } answers {
                    slot.captured.hasParameterAnnotation(LoginUserId::class.java)
                }
            }
            slot<NativeWebRequest>().also { slot ->
                every { it.resolveArgument(any(), any(), capture(slot), any()) } answers {
                    1L
                }
            }
        }
    }

    protected fun post(path: String): ResultActionsDsl {
        return mockMvc.post(path) {
            accept = MediaType.APPLICATION_JSON
        }
    }

    protected fun post(path: String, request: Any): ResultActionsDsl {
        return mockMvc.post(path) {
            content = objectMapper.writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }
    }

    protected fun put(path: String, request: Any): ResultActionsDsl {
        return mockMvc.put(path) {
            content = objectMapper.writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }
    }

    protected fun delete(path: String, request: Any): ResultActionsDsl {
        return mockMvc.delete(path) {
            content = objectMapper.writeValueAsBytes(request)
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
        }
    }
}
