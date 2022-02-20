package com.tilbox.core.post.query

import com.querydsl.jpa.impl.JPAQueryFactory
import com.tilbox.core.post.domain.entity.QPost.post
import com.tilbox.core.user.domain.QUser.user
import org.springframework.stereotype.Component

@Component
class PostQueryDao(private val queryFactory: JPAQueryFactory) {
    fun readUserPosts(request: UserPostQueryRequest): List<UserPostQueryResponse> =
        queryFactory.select(QUserPostQueryResponse(post, user)).from(post)
            .join(user).on(anyUserPost(request.userId))
            .fetchJoin()
            .where(lessThanPostId(request.lastPostId), containsKeywordInTitle(request.keyword))
            .orderBy(post.createdAt.desc())
            .limit(request.size)
            .fetch()

    private fun anyUserPost(userId: Long) = post.userId.eq(user.id).and(user.id.eq(userId))

    private fun lessThanPostId(lastPostId: Long?) = lastPostId?.let { post.id.lt(it) }

    private fun containsKeywordInTitle(keyword: String?) =
        keyword?.let { post.title.contains(it).or(post.content.contains(it)) }
}
