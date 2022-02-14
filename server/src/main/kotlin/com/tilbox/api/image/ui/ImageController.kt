package com.tilbox.api.image.ui

import com.tilbox.api.image.application.ImageUploadService
import com.tilbox.common.validation.ImageFile
import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.net.URI

@Api(description = "이미지")
@Validated
@RestController
@RequestMapping("/v1/images")
class ImageController(private val imageUploadService: ImageUploadService) {
    @Operation(summary = "이미지 업로드", description = "이미지 파일을 업로드한다.")
    @PostMapping("/upload", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @ApiResponses(
        ApiResponse(code = 200, message = "이미지 파일 업로드 실패"),
        ApiResponse(code = 400, message = "올바르지 않은 이미지 파일 형식")
    )
    fun upload(
        @Parameter(
            description = "업로드 할 이미지 파일",
            required = true
        ) @RequestPart @ImageFile imageFile: MultipartFile
    ): ResponseEntity<Void> {
        val url = imageUploadService.upload(imageFile)
        return ResponseEntity.created(URI(url)).build()
    }
}
