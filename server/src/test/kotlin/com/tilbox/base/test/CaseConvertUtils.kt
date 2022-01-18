package com.tilbox.base.test

val CAMEL_REGEX = "(?<=[a-zA-Z])[A-Z]".toRegex()

fun convertCamelToSnakeCase(value: String): String {
    return CAMEL_REGEX.replace(value) { matchResult ->
        "_" + matchResult.value.lowercase()
    }
}
