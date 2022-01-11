package com.tilbox.api.mail.application

import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.thymeleaf.ITemplateEngine
import org.thymeleaf.context.Context

@Service
class MailService(
    private val templateEngine: ITemplateEngine,
    private val mailSender: MailSender
) {
    @Async
    fun sendAuthenticationCodeMail(email: String, authenticationCode: String) {
        val context = Context().apply {
            setVariables(
                mapOf(
                    "email" to email,
                    "authenticationCode" to authenticationCode
                )
            )
        }
        send(
            email,
            "메일 인증 코드를 발송해 드립니다.",
            templateEngine.process("mail/authentication.html", context)
        )
    }

    private fun send(toAddress: String, subject: String, body: String) {
        mailSender.send(
            toAddress,
            subject,
            body
        )
    }
}
