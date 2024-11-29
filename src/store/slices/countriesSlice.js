import { createSlice } from '@reduxjs/toolkit'

const countriesSlice = createSlice({
	name: 'countriesSlice',
	initialState: {
		countries: [],
		categories: ['All', 'Colorado'],
		selectedCategory: 'All',
		keywords: '',
		currentPage: 1,
		pageSize: 20,
		portionSize: 5,
		totalCount: 0,
	},
	reducers: {
		setCountries(state, action) {
			state.countries = action.payload
		},
		setSelectedCategory(state, action) {
			state.currentPage = 1
			state.selectedCategory = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setTotalCount(state, action) {
			state.totalCount = action.payload
		},
		setKeywords(state, action) {
			state.keywords = action.payload
		},
	},
})

export default countriesSlice.reducer
export const {
	setCountries,
	setSelectedCategory,
	setCurrentPage,
	setTotalCount,
	setIsLoading,
	setKeywords,
} = countriesSlice.actions
