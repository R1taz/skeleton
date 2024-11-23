import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	clothes: [],
	currentPage: 1,
	pageSize: 5,
	portionSize: 5,
	totalCount: 30,
}

const clothesSlice = createSlice({
	name: 'clothesReducer',
	initialState,
	reducers: {
		setClothes(state, action) {
			state.clothes = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export default clothesSlice.reducer
export const { setClothes, setCurrentPage } = clothesSlice.actions
