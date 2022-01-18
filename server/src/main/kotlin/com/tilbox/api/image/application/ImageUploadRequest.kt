package com.tilbox.api.image.application

import java.io.InputStream

data class ImageUploadRequest(
    val inputStream: InputStream,
    val size: Long,
    val fileName: String
)
