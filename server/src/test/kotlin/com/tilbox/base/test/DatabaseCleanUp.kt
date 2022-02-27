package com.tilbox.base.test

import org.hibernate.metamodel.internal.MetamodelImpl
import org.hibernate.persister.collection.BasicCollectionPersister
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
class DatabaseCleanUp constructor(private val entityManager: EntityManager) :
    InitializingBean {
    private lateinit var tableNames: List<String>
    private lateinit var embeddedTableNames: List<String>

    override fun afterPropertiesSet() {
        tableNames = entityManager.metamodel.entities
            .filter {
                it.javaType.kotlin.findAnnotation<Entity>() != null
            }
            .map {
                convertCamelToSnakeCase(it.name)
            }
        embeddedTableNames =
            (entityManager.metamodel as MetamodelImpl)
                .collectionPersisters().values.map { (it as BasicCollectionPersister).tableName }
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
        embeddedTableNames.forEach { tableName ->
            entityManager.createNativeQuery("TRUNCATE TABLE $tableName").executeUpdate()
        }
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate()
    }
}
