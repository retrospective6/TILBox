package com.tilbox.api.image.application

import com.amazonaws.services.s3.model.ObjectMetadata
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Transactional
@Service
class ImageUploadService(private val imageUploader: ImageUploader) {
    fun upload(image: MultipartFile): ImageUploadResponse {
        requireNotNull(image.originalFilename) { "올바르지 않은 이미지입니다." }
        val fileName = generateFileName(image.originalFilename!!)
        val objectMetadata = ObjectMetadata()
        objectMetadata.contentLength = image.size
        objectMetadata.contentType = image.contentType
        return image.inputStream.use { stream ->
            imageUploader.upload(
                ImageUploadRequest(
                    stream,
                    objectMetadata,
                    fileName
                )
            )
        }
    }

    private fun generateFileName(originalFileName: String): String {
        return UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf("."))
    }
}
