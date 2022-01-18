package com.tilbox.api.mail.application

interface MailSender {
    fun send(toAddress: String, subject: String, body: String)
}
