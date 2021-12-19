package com.tilbox.api.image.application

import com.amazonaws.services.s3.model.ObjectMetadata
import java.io.InputStream

data class ImageUploadRequest(val inputStream: InputStream, val objectMetadata: ObjectMetadata, val fileName: String)
