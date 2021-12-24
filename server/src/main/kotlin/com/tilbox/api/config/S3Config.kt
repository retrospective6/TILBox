package com.tilbox.api.config

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile

@Profile("!test")
@Configuration
class S3Config(
    @Value("\${cloud.aws.region.static}") val region: String,
    @Value("\${cloud.aws.credentials.access-key}") val accessKey: String,
    @Value("\${cloud.aws.credentials.secret-key}") val secretKey: String
) {
    @Bean
    fun amazonS3(): AmazonS3 {
        return AmazonS3ClientBuilder.standard()
            .withRegion(region)
            .withCredentials(credentialsProvider())
            .build()
    }

    private fun credentialsProvider(): AWSStaticCredentialsProvider {
        return AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey))
    }
}
