package com.tilbox.common.validation

import org.springframework.web.multipart.MultipartFile
import java.util.Objects
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

val ALLOWED_CONTENT_TYPES = listOf("image/gif", "image/png", "image/jpg", "image/jpeg")

class ImageFileValidator : ConstraintValidator<ImageFile?, MultipartFile> {
    override fun isValid(file: MultipartFile, context: ConstraintValidatorContext): Boolean {
        val contentType = getContentType(file)
        return isSupportedContentType(contentType)
    }

    private fun getContentType(file: MultipartFile): String? {
        return Objects.requireNonNull(file.contentType, "파일 형식을 찾을 수 없습니다.")
    }

    private fun isSupportedContentType(contentType: String?): Boolean {
        return ALLOWED_CONTENT_TYPES.any { it == contentType }
    }
}
