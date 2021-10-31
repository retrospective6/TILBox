package com.tilbox.core.user.domain.value

enum class UserStatus (val title: String) {
    UNAUTHENTICATED("UNAUTHENTICATED"),
    AUTHENTICATED("AUTHENTICATED"),
    DEACTIVATED("DEACTIVATED"),
    BLOCKED("BLOCKED"),
}