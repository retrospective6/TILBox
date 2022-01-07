package com.tilbox.base.test

import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import org.springframework.test.context.TestConstructor
import javax.persistence.Entity
import javax.persistence.EntityManager
import javax.transaction.Transactional
import kotlin.reflect.full.findAnnotation

@Service
@Profile("test")
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
class DatabaseCleanUp constructor(private val entityManager: EntityManager) : InitializingBean {
    private lateinit var tableNames: List<String>

    override fun afterPropertiesSet() {
        tableNames = entityManager.metamodel.entities
            .filter {
                it.javaType.kotlin.findAnnotation<Entity>() != null
            }
            .map {
                convertCamelToSnakeCase(it.name)
            }
    }

    @Transactional
    fun truncate() {
        entityManager.flush()
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate()
        tableNames.forEach { tableName ->
            entityManager.createNativeQuery("TRUNCATE TABLE $tableName").executeUpdate()
            entityManager.createNativeQuery("ALTER TABLE $tableName ALTER COLUMN id RESTART WITH 1")
                .executeUpdate()
        }
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate()
    }
}
