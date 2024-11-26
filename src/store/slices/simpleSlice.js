import { createSlice } from '@reduxjs/toolkit'

const items = Array.from({ length: 10000 }, (_, index) => ({
	id: Math.random().toString(36).slice(2),
	text: String(index),
}))

const simpleSlice = createSlice({
	name: 'simpleSlice',
	initialState: {
		items: items,
		rowHeight: 60,
		containerHeight: 700,
		overscan: 5,
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

export default simpleSlice.reducer
export const { reverseItems, setIsScrolling } = simpleSlice.actions
