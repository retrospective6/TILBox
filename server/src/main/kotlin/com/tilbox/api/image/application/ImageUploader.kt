package com.tilbox.api.image.application

interface ImageUploader {
    fun upload(request: ImageUploadRequest): ImageUploadResponse
}
