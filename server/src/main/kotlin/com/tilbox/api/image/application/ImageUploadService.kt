package com.tilbox.api.image.application

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Transactional
@Service
class ImageUploadService(private val imageUploader: ImageUploader) {
    fun upload(imageFile: MultipartFile): String {
        requireNotNull(imageFile.originalFilename) { "올바르지 않은 이미지입니다." }
        val fileName = generateFileName(imageFile.originalFilename!!)
        val response = imageFile.inputStream.use { stream ->
            imageUploader.upload(
                ImageUploadRequest(
                    stream,
                    imageFile.size,
                    fileName
                )
            )
        }
        return response.url
    }

    private fun generateFileName(originalFileName: String): String {
        return UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf("."))
    }
}
