import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments, setCurrentPage } from '../../store/slices/commentsSlice'
import Skeleton from '../../shared/Skeleton/Skeleton'
import { JSONPLACEHOLDER_URL } from '../../constants/constants'

const Comments = () => {
	const commentsListRef = useRef(null)
	const comments = useSelector(state => state.commentsSlice.comments)
	const currentPage = useSelector(state => state.commentsSlice.currentPage)
	const pageSize = useSelector(state => state.commentsSlice.pageSize)
	const commentHeight = useSelector(state => state.commentsSlice.commentHeight)
	const dispatch = useDispatch()

	useEffect(() => {
		axios
			.get(
				`${JSONPLACEHOLDER_URL}/comments?_page=${currentPage}&_limit=${pageSize}`
			)
			.then(response => dispatch(setComments(response.data)))
	}, [currentPage, dispatch])

	useEffect(() => {
		if (!commentsListRef || !commentsListRef.current) return

		const observer = new IntersectionObserver(
			([entry], observer) => {
				if (entry.isIntersecting) {
					dispatch(setCurrentPage(currentPage + 1))
					observer.unobserve(entry.target)
				}
			},
			{
				rootMargin: '15px',
			}
		)

		const lastComment = commentsListRef.current.lastChild
		observer.observe(lastComment)
	}, [comments.length, dispatch])

	if (!comments.length) {
		return <Skeleton countElems={pageSize} height={commentHeight} />
	}

	return (
		<div ref={commentsListRef}>
			{comments.length &&
				comments.map(comment => (
					<div
						key={comment.id}
						style={{
							border: '1px solid lightgrey',
							borderRadius: '1em',
							margin: '20px',
						}}
					>
						<p>{comment.id}</p>
						<p>{comment.name}</p>
						<p>{comment.body}</p>
					</div>
				))}
		</div>
	)
}

export default Comments
