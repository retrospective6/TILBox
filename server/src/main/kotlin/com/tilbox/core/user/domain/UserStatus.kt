package com.tilbox.core.user.domain

enum class UserStatus(val title: String) {
    UNAUTHENTICATED("인증 대기중"),
    AUTHENTICATED("인증 완료"),
    DEACTIVATED("비활성"),
    BLOCKED("정지"),
}
