import { createSlice } from '@reduxjs/toolkit'

const items = Array.from({ length: 10000 }, (_, index) => ({
	id: Math.random().toString(36).slice(2),
	text: String(index),
}))

const photosSlice = createSlice({
	name: 'simpleSlice',
	initialState: {
		items: items,
		rowHeight: 60,
		containerHeight: 500,
		overscan: 3,
		isScrolling: false,
	},
	reducers: {
		reverseItems(state) {
			state.items = state.items.reverse()
		},
		setIsScrolling(state, action) {
			state.isScrolling = action.payload
		},
	},
})

export default photosSlice.reducer
export const { reverseItems, setIsScrolling } = photosSlice.actions
