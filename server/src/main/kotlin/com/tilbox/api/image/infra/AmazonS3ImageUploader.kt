package com.tilbox.api.image.infra

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.CannedAccessControlList
import com.amazonaws.services.s3.model.PutObjectRequest
import com.tilbox.api.image.application.ImageUploadRequest
import com.tilbox.api.image.application.ImageUploadResponse
import com.tilbox.api.image.application.ImageUploader
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class AmazonS3ImageUploader(
    @Value("\${cloud.aws.s3.bucket}") private val bucket: String,
    private val s3Client: AmazonS3
) : ImageUploader {
    override fun upload(request: ImageUploadRequest): ImageUploadResponse {
        s3Client.putObject(
            PutObjectRequest(
                bucket,
                request.fileName,
                request.inputStream,
                request.objectMetadata
            ).withCannedAcl(CannedAccessControlList.PublicRead)
        )
        val url = s3Client.getUrl(bucket, request.fileName).toString()
        return ImageUploadResponse(url)
    }
}
