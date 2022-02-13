package com.tilbox.core.post.domain.value

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
class Tag(
    @Column(nullable = false, length = 10)
    val name: String

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Tag

        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        return name.hashCode()
    }
}
