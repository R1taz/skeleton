import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState: {
		comments: [],
		currentPage: 1,
		pageSize: 10,
		category: 'All',
	},
	reducers: {
		setComments(state, action) {
			state.comments = [...state.comments, ...action.payload]
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export default commentsSlice.reducer
export const { setComments, setCurrentPage } = commentsSlice.actions
