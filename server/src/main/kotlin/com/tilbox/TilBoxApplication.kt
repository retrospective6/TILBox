package com.tilbox

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TilBoxApplication

fun main(args: Array<String>) {
    runApplication<TilBoxApplication>(*args)
}
