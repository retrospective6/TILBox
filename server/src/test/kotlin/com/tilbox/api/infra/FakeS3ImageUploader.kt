package com.tilbox.api.infra

import com.tilbox.api.image.application.ImageUploadRequest
import com.tilbox.api.image.application.ImageUploadResponse
import com.tilbox.api.image.application.ImageUploader
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Profile("test")
@Component
class FakeS3ImageUploader : ImageUploader {
    override fun upload(request: ImageUploadRequest): ImageUploadResponse {
        return ImageUploadResponse("https://s3.amazonaws-northeast.com/${request.fileName}")
    }
}
