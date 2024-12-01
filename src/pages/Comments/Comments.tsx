import React, { useEffect, useRef } from 'react'
import {
	setComments,
	setCurrentPage,
} from '../../store/slices/commentsSlice.ts'
import Skeleton from '../../shared/Skeleton/Skeleton.tsx'
import { useGetCommentsAPIQuery } from '../../api/commentsApi.ts'
import ErrorModal from '../../shared/ErrorModal.tsx'
import { useAppSelector, useAppDispatch } from '../../helpers/hooks/appHooks.ts'

const Comments = () => {
	const commentsListRef = useRef<HTMLDivElement | null>(null)
	const comments = useAppSelector(state => state.commentsSlice.comments)
	const current_page = useAppSelector(state => state.commentsSlice.currentPage)
	const page_size = useAppSelector(state => state.commentsSlice.pageSize)
	const dispatch = useAppDispatch()

	const { data, isLoading, error } = useGetCommentsAPIQuery({
		current_page,
		page_size,
	})

	useEffect(() => {
		if (data) dispatch(setComments(data))
	}, [data, dispatch])

	useEffect(() => {
		if (!commentsListRef || !commentsListRef.current) return

		const observer = new IntersectionObserver(
			([entry], observer) => {
				if (entry.isIntersecting) {
					dispatch(setCurrentPage(current_page + 1))
					observer.unobserve(entry.target)
				}
			},
			{
				rootMargin: '15px',
			}
		)

		const lastComment = commentsListRef.current.lastElementChild
		if (lastComment) observer.observe(lastComment)

		return () => {
			if (lastComment) observer.unobserve(lastComment)
		}
	}, [comments.length, dispatch])

	if (isLoading && !comments.length) {
		return <Skeleton countElems={page_size} marginY={20} marginX={20} />
	}
	if (error) return <ErrorModal />

	return (
		<div ref={commentsListRef}>
			{comments.map(comment => (
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
