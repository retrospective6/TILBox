package com.tilbox.base.test

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringBootTest
@ActiveProfiles("test")
abstract class RestControllerTest {

    @field:Autowired
    private lateinit var databaseCleanUp: DatabaseCleanUp

    lateinit var mockMvc: MockMvc

    @BeforeEach
    internal fun setUp(
        webApplicationContext: WebApplicationContext,
    ) {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanupAfterEach() {
        databaseCleanUp.truncate()
    }
}
