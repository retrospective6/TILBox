package com.tilbox.core.post.domain.repository

import com.tilbox.core.post.domain.entity.Post
import org.springframework.data.jpa.repository.JpaRepository

interface PostRepository : JpaRepository<Post, Long>
