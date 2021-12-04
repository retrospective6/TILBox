package com.tilbox.core.user.domain.value

enum class UserRole(val title: String) {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    companion object {
        fun from(title: String): UserRole {
            return values()
                .find { it.equalsTitle(title) } ?: throw IllegalArgumentException("권한을 찾지 못했습니다. title=$title")
        }
    }

    private fun equalsTitle(title: String): Boolean {
        return this.title == title
    }
}
