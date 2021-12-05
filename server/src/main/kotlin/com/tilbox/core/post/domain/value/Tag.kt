package com.tilbox.core.post.domain.value

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
class Tag(
    @Column(nullable = false, length = 10, columnDefinition = "태그의 이름")
    private val name: String
)
