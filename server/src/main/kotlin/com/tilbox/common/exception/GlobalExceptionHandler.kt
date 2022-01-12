package com.tilbox.common.exception

import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import java.io.IOException
import javax.validation.ConstraintViolationException

private val log = KotlinLogging.logger {}

@ControllerAdvice
@RestController
class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = [ConstraintViolationException::class, IllegalArgumentException::class])
    fun handleInvalidArgumentException(exception: Exception): ApiErrorResponse {
        log.error { exception.message }
        return ApiErrorResponse(message = "입력값이 올바르지 않습니다.")
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(value = [IllegalStateException::class])
    fun handleIllegalStateException(exception: Exception): ApiErrorResponse {
        log.error { exception.message }
        return ApiErrorResponse(message = "요청을 처리할 수 없는 상태입니다.")
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = [IOException::class])
    fun handleIOExceptionException(exception: Exception): ApiErrorResponse {
        log.error { exception.message }
        return ApiErrorResponse(message = "파일 처리 중 에러가 발생했습니다.")
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = [Exception::class])
    fun handleInternalException(exception: Exception): ApiErrorResponse {
        log.error { exception.stackTrace }
        return ApiErrorResponse(message = "알 수 없는 에러가 발생했습니다.")
    }
}
