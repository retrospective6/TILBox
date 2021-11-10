package com.tilbox.core.user.domain.value

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
data class Password(
    @Column(name = "password", nullable = false)
    val value: String
) {
    constructor(value: String, encodingStrategy: PasswordEncodingStrategy) : this(encodingStrategy.encode(value))

    fun match(rawPassword: String, passwordMatchStrategy: PasswordMatchStrategy): Boolean {
        return passwordMatchStrategy.match(rawPassword, this.value)
    }
}
