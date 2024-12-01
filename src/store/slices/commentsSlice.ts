import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '../../helpers/interfaces/commentsInterfaces'

interface State {
	comments: IComment[]
	currentPage: number
	pageSize: number
}

const initialState: State = {
	comments: [],
	currentPage: 1,
	pageSize: 10,
}

const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState,
	reducers: {
		setComments(state, action: PayloadAction<IComment[]>) {
			state.comments = [...state.comments, ...action.payload]
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
})

export default commentsSlice.reducer
export const { setComments, setCurrentPage } = commentsSlice.actions
