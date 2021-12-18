package com.tilbox.api.user.ui

import com.tilbox.api.authenticationcode.application.AuthenticationCodeService
import com.tilbox.api.mail.application.MailService
import com.tilbox.api.user.application.UserCreateService
import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/v1/users")
class UserRestController(
    private val userCreateService: UserCreateService,
    private val authenticationCodeService: AuthenticationCodeService,
    private val mailService: MailService
) {
    @PostMapping
    fun createUser(@RequestBody request: UserCreateRequest): ResponseEntity<UserCreateResponse> {
        val response = userCreateService.createUser(request)
        return ResponseEntity
            .created(URI.create("/v1/users/${response.myTilAddress}"))
            .body(response)
    }
}
