package com.tilbox.base.test

import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import javax.persistence.Entity
import javax.persistence.EntityManager
import javax.transaction.Transactional
import kotlin.reflect.full.findAnnotation

@Service
@Profile("test")
class DatabaseCleanUp @Autowired constructor(private val entityManager: EntityManager) : InitializingBean {
    private lateinit var tableNames: List<String>

    override fun afterPropertiesSet() {
        tableNames = entityManager.metamodel.entities
            .filter {
                it.javaType.kotlin.findAnnotation<Entity>() != null
            }
            .map {
                CaseConvertUtils.camelToSnakeCase(it.name)
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
