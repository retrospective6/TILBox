package com.tilbox.api.image.ui

import com.tilbox.api.image.application.ImageUploadResponse
import com.tilbox.api.image.application.ImageUploadService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@Api(description = "이미지")
@RestController
@RequestMapping("/v1/images")
class ImageController(private val imageUploadService: ImageUploadService) {
    @PostMapping("/upload")
    fun upload(@RequestPart imageFile: MultipartFile): ResponseEntity<ImageUploadResponse> {
        val response = imageUploadService.upload(imageFile)
        return ResponseEntity.ok(response)
    }
}
