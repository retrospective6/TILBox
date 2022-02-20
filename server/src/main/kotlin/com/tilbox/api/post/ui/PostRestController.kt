package com.tilbox.api.post.ui

import com.tilbox.api.post.application.PostService
import com.tilbox.api.post.application.dto.request.PostCreateRequest
import com.tilbox.api.security.LoginUserId
import com.tilbox.core.post.query.PostQueryDao
import com.tilbox.core.post.query.UserPostQueryRequest
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import springfox.documentation.annotations.ApiIgnore
import java.net.URI
import java.time.LocalDateTime
import javax.validation.Valid

const val DEFAULT_PAGE_SIZE = 20L

@Api(description = "TIL 게시글 API")
@RestController
@RequestMapping("/v1")
class PostRestController(private val postService: PostService, private val postQueryDao: PostQueryDao) {

    @Operation(summary = "새 게시글 저장", description = "새로운 게시글을 생성한다.")
    @ApiResponses(
        ApiResponse(code = 201, message = "게시글 생성 완료"),
        ApiResponse(code = 400, message = "필수 값 누락으로 생성 실패")
    )
    @PostMapping("/posts")
    fun createPost(
        @Valid @RequestBody request: PostCreateRequest,
        @LoginUserId userId: Long
    ): ResponseEntity<Long> {
        val createdPostId = postService.savePost(request, userId, LocalDateTime.now())
        return ResponseEntity
            .created(URI.create("/v1/posts/$createdPostId"))
            .body(createdPostId)
    }

    @ApiResponses(
        ApiResponse(code = 200, message = "게시글 수정 완료"),
        ApiResponse(code = 400, message = "필수 값 누락으로 수정 실패")
    )
    @PutMapping("/posts/{postId}")
    fun updatePost(
        @PathVariable postId: Long,
        @Valid @RequestBody request: PostCreateRequest,
        @LoginUserId userId: Long
    ): ResponseEntity<Long> {
        val updatedPostId = postService.updatePost(postId, request, userId, LocalDateTime.now())
        return ResponseEntity.ok(updatedPostId)
    }

    @ApiResponses(
        ApiResponse(code = 204, message = "게시글 삭제 완료"),
        ApiResponse(code = 400, message = "본인이 작성한 게시글이 아니어서 삭제 실패")
    )
    @DeleteMapping("/posts/{postId}")
    fun remove(
        @PathVariable postId: Long,
        @LoginUserId userId: Long
    ): ResponseEntity<Void> {
        postService.remove(postId, userId)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "내 게시물 조회", description = "내가 작성한 게시물을 조회한다.")
    @ApiResponses(
        ApiResponse(code = 204, message = "내 게시글 조회 성공"),
    )
    @GetMapping("/me/posts")
    fun readMyPosts(
        @ApiIgnore @LoginUserId userId: Long,
        @RequestParam(required = false) size: Long?,
        @RequestParam(required = false) lastPostId: Long?,
        @RequestParam(required = false) keyword: String?
    ) = postQueryDao.readUserPosts(UserPostQueryRequest(lastPostId, size ?: DEFAULT_PAGE_SIZE, userId, keyword, null))
}
