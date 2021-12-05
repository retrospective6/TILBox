package com.tilbox.core.post.domain.value

import javax.persistence.CollectionTable
import javax.persistence.ElementCollection
import javax.persistence.Embeddable
import javax.persistence.FetchType

@Embeddable
class Tags(
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tags")
    private val items: MutableList<Tag> = mutableListOf()
)
