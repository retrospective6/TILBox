package com.tilbox.core.like_post.domain

data class UnlikePostEvent(val postId: Long, val userId: Long)
