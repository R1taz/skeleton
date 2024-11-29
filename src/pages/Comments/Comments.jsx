import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments, setCurrentPage } from '../../store/slices/commentsSlice'
import Skeleton from '../../shared/Skeleton/Skeleton'
import { useGetCommentsAPIQuery } from '../../api/commentsApi'
import ErrorModal from '../../shared/ErrorModal'

const Comments = () => {
	const commentsListRef = useRef(null)
	const comments = useSelector(state => state.commentsSlice.comments)
	const current_page = useSelector(state => state.commentsSlice.currentPage)
	const page_size = useSelector(state => state.commentsSlice.pageSize)
	const comment_height = useSelector(state => state.commentsSlice.commentHeight)
	const dispatch = useDispatch()

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

		const lastComment = commentsListRef.current.lastChild
		observer.observe(lastComment)
	}, [comments.length, dispatch])

	if (isLoading && !comments.length) {
		return <Skeleton countElems={page_size} height={comment_height} />
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
