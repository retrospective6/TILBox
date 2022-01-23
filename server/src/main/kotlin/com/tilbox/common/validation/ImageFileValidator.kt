package com.tilbox.common.validation

import org.springframework.web.multipart.MultipartFile
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

val ALLOWED_CONTENT_TYPES = listOf("image/gif", "image/png", "image/jpg", "image/jpeg")

class ImageFileValidator : ConstraintValidator<ImageFile?, MultipartFile> {
    override fun isValid(file: MultipartFile, context: ConstraintValidatorContext): Boolean {
        val contentType = file.contentType ?: return false
        return isSupportedContentType(contentType)
    }

    private fun isSupportedContentType(contentType: String): Boolean {
        return ALLOWED_CONTENT_TYPES.any { it == contentType }
    }
}
