package com.tilbox.api.post.ui

import com.tilbox.api.post.application.PostService
import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.api.post.application.dto.request.PostUpdateRequest
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI
import java.time.LocalDateTime

@Api(description = "TIL 게시글 API")
@RestController
@RequestMapping("/v1/posts")
class PostRestController(private val postService: PostService) {

    @Operation(summary = "새 게시글 저장", description = "새로운 게시글을 생성한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "게시글 생성 완료"),
        ApiResponse(code = 400, message = "필수 값 누락으로 생성 실패")
    )
    @PostMapping
    fun createPost(@RequestBody request: PostCreateRequest): ResponseEntity<Long> {
        val createdPostId = postService.savePost(request, LocalDateTime.now())
        return ResponseEntity
            .created(URI.create("/v1/posts/$createdPostId"))
            .body(createdPostId)
    }

    @ApiResponses(
        ApiResponse(code = 200, message = "게시글 수정 완료"),
        ApiResponse(code = 400, message = "필수 값 누락으로 수정 실패")
    )
    @PutMapping("/{postId}")
    fun updatePost(@PathVariable postId: Long, @RequestBody request: PostUpdateRequest): ResponseEntity<Long> {
        val updatedPostId = postService.updatePost(postId, request, LocalDateTime.now())
        return ResponseEntity.ok(updatedPostId)
    }
}
