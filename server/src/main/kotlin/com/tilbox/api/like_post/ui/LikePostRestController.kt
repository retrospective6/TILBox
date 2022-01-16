package com.tilbox.api.like_post.ui

import com.tilbox.api.like_post.application.LikePostService
import com.tilbox.api.like_post.application.UnlikePostService
import com.tilbox.api.security.LoginUserId
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("posts")
class LikePostRestController(
    private val likePostService: LikePostService,
    private val unlikePostService: UnlikePostService
) {
    @PostMapping("/{postId}/like")
    fun like(@PathVariable postId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        likePostService.like(postId, userId)
        return ResponseEntity.noContent().build()
    }

    @PostMapping("/{postId}/unlike")
    fun unlike(@PathVariable postId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        unlikePostService.unlike(postId, userId)
        return ResponseEntity.noContent().build()
    }
}
