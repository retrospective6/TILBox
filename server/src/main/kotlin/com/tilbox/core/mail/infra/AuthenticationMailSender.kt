package com.tilbox.core.mail.infra

import com.tilbox.api.mail.application.MailSender
import org.springframework.boot.autoconfigure.mail.MailProperties
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Component

@Component
class AuthenticationMailSender (
    private val mailProperties: MailProperties,
    private val mailSender: JavaMailSender
) : MailSender {
    override fun send(toAddress: String, subject: String, body: String) {
        val message = mailSender.createMimeMessage()
        MimeMessageHelper(message).apply {
            setTo(toAddress)
            setFrom(mailProperties.username)
            setSubject(subject)
            setText(body, true)
        }
        mailSender.send(message)
    }

}
