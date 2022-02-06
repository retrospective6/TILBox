package com.tilbox.api.subscribe.application

import com.tilbox.core.subscribe.domain.repository.SubscribeRepository
import com.tilbox.core.user.domain.Password
import com.tilbox.core.user.domain.Profile
import com.tilbox.core.user.domain.RegistrationType
import com.tilbox.core.user.domain.User
import com.tilbox.core.user.domain.UserRepository
import com.tilbox.core.user.domain.UserRole
import com.tilbox.core.user.domain.UserStatus
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import java.time.LocalDateTime
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class SubscribeServiceTest(
    private val subscribeService: SubscribeService,
    private val subscribeRepository: SubscribeRepository,
    private val userRepository: UserRepository
) {
    private lateinit  var user: User
    private lateinit  var follower: User

    @BeforeEach
    fun setUp() {
        user = userRepository.save(
            User(
                "nullable",
                "nullable@kakao.com",
                Profile(
                    "KS-KIM",
                    null,
                    "I love kotlin. I hate javascript. javascript is not a language."
                ),
                Password("password"),
                UserStatus.AUTHENTICATED,
                RegistrationType.EMAIL,
                UserRole.USER,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null
            )
        )
        follower = userRepository.save(
            User(
                "not_nullable",
                "nullable@kakao.com",
                Profile(
                    "Tigger",
                    null,
                    "I love kotlin. I hate php. php is not a language."
                ),
                Password("password"),
                UserStatus.AUTHENTICATED,
                RegistrationType.EMAIL,
                UserRole.USER,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null
            )
        )
    }

    @Test
    fun `구독하기`() {
        subscribeService.subscribe(user.id, follower.id)

        val actual = subscribeRepository.findAll()
        actual.size shouldBe 1
    }

    @Test
    fun `구독취소하기`() {
        subscribeService.subscribe(user.id, follower.id)

        subscribeService.unsubscribe(user.id, follower.id)

        val actual = subscribeRepository.findAll()
        actual.size shouldBe 0
    }
}