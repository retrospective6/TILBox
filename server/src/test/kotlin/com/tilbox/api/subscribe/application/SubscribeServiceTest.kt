package com.tilbox.api.subscribe.application

import com.tilbox.core.subscribe.domain.repository.SubscribeRepository
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestConstructor
import javax.transaction.Transactional

@Transactional
@SpringBootTest
@ActiveProfiles("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class SubscribeServiceTest(
    private val subscribeService: SubscribeService,
    private val subscribeRepository: SubscribeRepository
) {

    @Test
    fun `구독하기`() {
        subscribeService.subscribe(0L, 1L)
        subscribeService.subscribe(0L, 2L)

        val actual = subscribeRepository.findAll()
        actual.size shouldBe 2
    }

    @Test
    fun `구독취소하기`() {
        subscribeService.subscribe(0L, 1L)
        subscribeService.subscribe(0L, 2L)

        subscribeService.unsubscribe(1L, 2L)

        val actual = subscribeRepository.findAll()
        actual.size shouldBe 1
    }
}
