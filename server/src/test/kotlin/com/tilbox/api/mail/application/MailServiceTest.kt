package com.tilbox.api.mail.application

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class MailServiceTest(
    private val mailService: MailService,
) {
    @Test
    fun send() {
        mailService.sendAuthenticationCodeMail("jnunseok@gmail.com", "testCode")
    }
}
