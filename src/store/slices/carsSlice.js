import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cars: [],
	currentPage: 1,
	pageSize: 5,
	portionSize: 5,
	totalCount: 11,
}

const carsSlice = createSlice({
	name: 'carsReducer',
	initialState,
	reducers: {
		setCars(state, action) {
			state.cars = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export default carsSlice.reducer
export const { setCars, setCurrentPage } = carsSlice.actions
