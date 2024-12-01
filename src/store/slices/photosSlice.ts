import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPhoto } from '../../helpers/interfaces/photosInterfaces'

const items: IPhoto[] = Array.from({ length: 10000 }, (_, index) => ({
	id: Math.random().toString(36).slice(2),
	text: String(index),
}))

interface State {
	items: IPhoto[]
	rowHeight: number
	containerHeight: number
	overscan: number
	isScrolling: boolean
}

const initialState: State = {
	items: items,
	rowHeight: 60,
	containerHeight: 500,
	overscan: 3,
	isScrolling: false,
}

const photosSlice = createSlice({
	name: 'simpleSlice',
	initialState,
	reducers: {
		reverseItems(state) {
			state.items = state.items.reverse()
		},
		setIsScrolling(state, action: PayloadAction<boolean>) {
			state.isScrolling = action.payload
		},
	},
})

export default photosSlice.reducer
export const { reverseItems, setIsScrolling } = photosSlice.actions
