package com.tilbox.api.subscribe.ui

import com.tilbox.api.security.LoginUserId
import com.tilbox.api.subscribe.application.SubscribeService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(description = "구독 API")
@RestController
@RequestMapping("/v1/subscription")
class SubscribeController(private val subscribeService: SubscribeService) {

    @Operation(summary = "구독신청", description = "사용자가 구독 신청한다.")
    @ApiResponses(
        ApiResponse(code = 200, message = "구독 신청"),
        ApiResponse(code = 409, message = "구독 신청 실패")
    )
    @PostMapping("/subscribe/{followingId}")
    fun subscribe(@PathVariable followingId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        subscribeService.subscribe(userId, followingId)
        return ResponseEntity
            .noContent()
            .build()
    }

    @Operation(summary = "구독취소", description = "사용자가 구독 취소한다.")
    @ApiResponses(
        ApiResponse(code = 200, message = "구독 취소"),
        ApiResponse(code = 409, message = "구독 취소 실패")
    )
    @PostMapping("/unsubscribe/{followingId}")
    fun unsubscribe(@PathVariable followingId: Long, @LoginUserId userId: Long): ResponseEntity<Void> {
        subscribeService.unsubscribe(userId, followingId)
        return ResponseEntity
            .noContent()
            .build()
    }
}
