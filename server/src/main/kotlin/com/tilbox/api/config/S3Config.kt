package com.tilbox.api.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client

@Profile("!test")
@Configuration
class S3Config(
    @Value("\${cloud.aws.region.static}") val region: String,
    @Value("\${cloud.aws.credentials.access-key}") val accessKey: String,
    @Value("\${cloud.aws.credentials.secret-key}") val secretKey: String
) {
    @Bean
    fun amazonS3(): S3Client {
        return S3Client.builder()
            .region(Region.of(region))
            .credentialsProvider(credentialsProvider())
            .build()
    }

    private fun credentialsProvider(): AwsCredentialsProvider {
        return StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
    }
}
