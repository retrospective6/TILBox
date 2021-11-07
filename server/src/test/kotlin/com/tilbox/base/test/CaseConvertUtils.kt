package com.tilbox.base.test

class CaseConvertUtils {
    companion object {
        val CAMEL_REGEX = "(?<=[a-zA-Z])[A-Z]".toRegex()

        fun camelToSnakeCase(value: String): String {
            return CAMEL_REGEX.replace(value) {
                "_$value"
            }.lowercase()
        }
    }
}
