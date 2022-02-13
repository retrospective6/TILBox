package com.tilbox.core.post.domain.value

import javax.persistence.CollectionTable
import javax.persistence.ElementCollection
import javax.persistence.Embeddable
import javax.persistence.FetchType
import javax.persistence.Index
import javax.persistence.JoinColumn
import javax.persistence.UniqueConstraint

@Embeddable
class Tags(
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "tag",
        joinColumns = [
            JoinColumn(name = "post_id")
        ],
        uniqueConstraints = [
            UniqueConstraint(name = "uk_post_id_tag_name", columnNames = ["post_id", "name"])
        ],
        indexes = [
            Index(name = "idx_post_id", columnList = "post_id"),
            Index(name = "idx_tag_name", columnList = "name")
        ]
    )
    val items: MutableList<Tag> = mutableListOf()
) {
    companion object {
        fun of(items: List<String>): Tags {
            val tags = items.map { Tag(it) }
                .toMutableList()
            return Tags(tags)
        }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Tags

        if (items != other.items) return false

        return true
    }

    override fun hashCode(): Int {
        return items.hashCode()
    }
}
