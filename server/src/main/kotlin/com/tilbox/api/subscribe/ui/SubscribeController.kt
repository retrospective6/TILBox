package com.tilbox.api.subscribe.ui

import com.tilbox.api.security.LoginUserId
import com.tilbox.api.subscribe.application.SubscribeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/subscription")
class SubscribeController(private val subscribeService: SubscribeService) {

    @PostMapping("/subscribe/{followingId}")
    fun subscribe(@PathVariable followingId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        subscribeService.subscribe(userId, followingId)
        return ResponseEntity
            .noContent()
            .build()
    }

    @PostMapping("/unsubscribe/{followingId}")
    fun unsubscribe(@PathVariable followingId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        subscribeService.unsubscribe(userId, followingId)
        return ResponseEntity
            .noContent()
            .build()
    }
}
