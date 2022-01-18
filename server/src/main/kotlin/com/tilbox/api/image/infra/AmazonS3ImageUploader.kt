package com.tilbox.api.image.infra

import com.tilbox.api.image.application.ImageUploadRequest
import com.tilbox.api.image.application.ImageUploadResponse
import com.tilbox.api.image.application.ImageUploader
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetUrlRequest
import software.amazon.awssdk.services.s3.model.ObjectCannedACL.PUBLIC_READ
import software.amazon.awssdk.services.s3.model.PutObjectRequest

@Profile("!test")
@Component
class AmazonS3ImageUploader(
    @Value("\${cloud.aws.s3.bucket}") private val bucket: String,
    private val s3Client: S3Client
) : ImageUploader {
    override fun upload(request: ImageUploadRequest): ImageUploadResponse {
        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucket)
            .key(request.fileName)
            .acl(PUBLIC_READ)
            .build()
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(request.inputStream, request.size))
        val url =
            s3Client.utilities().getUrl(GetUrlRequest.builder().bucket(bucket).key(request.fileName).build()).toString()
        return ImageUploadResponse(url)
    }
}
