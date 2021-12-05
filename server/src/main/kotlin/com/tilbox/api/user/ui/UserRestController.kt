package com.tilbox.api.user.ui

import com.tilbox.api.security.UserPrincipal
import com.tilbox.api.user.application.EmailUserCreateService
import com.tilbox.api.user.application.UserUpdateService
import com.tilbox.api.user.application.UserWithdrawalService
import com.tilbox.api.user.application.dto.request.UserCreateRequest
import com.tilbox.api.user.application.dto.request.UserUpdateRequest
import com.tilbox.api.user.application.dto.response.UserCreateResponse
import com.tilbox.api.user.application.dto.response.UserUpdateResponse
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI
import javax.validation.Valid

@Api(description = "회원 API")
@RestController
@RequestMapping("/v1/users")
class UserRestController(
    private val emailUserCreateService: EmailUserCreateService,
    private val userWithdrawalService: UserWithdrawalService,
    private val userUpdateService: UserUpdateService
) {

    @Operation(summary = "회원가입", description = "이메일 인증을 통한 회원가입을 진행한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "회원가입 완료"),
        ApiResponse(code = 409, message = "회원가입 실패"),
    )
    @PostMapping
    fun createUser(@Valid @RequestBody request: UserCreateRequest): ResponseEntity<UserCreateResponse> {
        val response = emailUserCreateService.createUser(request)
        return ResponseEntity
            .created(URI.create("/v1/users/${response.myTilAddress}"))
            .body(response)
    }

    @Operation(summary = "프로필 업데이트", description = "사용자의 개인정보를 갱신한다.")
    @ApiResponses(
        ApiResponse(code = 200, message = "프로필 업데이트 성공"),
        ApiResponse(code = 400, message = "잘못된 요청"),
        ApiResponse(code = 409, message = "프로필 업데이트 실패")
    )
    @PutMapping
    fun updateUser(
        @Valid @RequestBody request: UserUpdateRequest,
        @AuthenticationPrincipal loginUser: UserPrincipal
    ): ResponseEntity<UserUpdateResponse> {
        val response = userUpdateService.updateUser(request, loginUser)
        return ResponseEntity
            .ok(response)
    }

    @Operation(summary = "회원탈퇴", description = "현재 로그인한 사용자의 회원탈퇴를 진행한다.")
    @ApiResponses(
        ApiResponse(code = 204, message = "회원탈퇴 완료"),
        ApiResponse(code = 409, message = "회원탈퇴 실패")
    )
    @DeleteMapping
    fun withdrawUser(@AuthenticationPrincipal loginUser: UserPrincipal): ResponseEntity<Void> {
        userWithdrawalService.withdraw(loginUser)
        return ResponseEntity
            .noContent()
            .build()
    }
}
