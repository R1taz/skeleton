import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	ICountry,
	CategoryType,
} from '../../helpers/interfaces/countriesInterfaces'

interface State {
	countries: ICountry[]
	categories: CategoryType[]
	selectedCategory: CategoryType
	keywords: string
	currentPage: number
	pageSize: number
	portionSize: number
	totalCount: number
}

const initialState: State = {
	countries: [],
	categories: ['All', 'Colorado'],
	selectedCategory: 'All',
	keywords: '',
	currentPage: 1,
	pageSize: 20,
	portionSize: 5,
	totalCount: 0,
}

const countriesSlice = createSlice({
	name: 'countriesSlice',
	initialState,
	reducers: {
		setCountries(state, action: PayloadAction<ICountry[]>) {
			state.countries = action.payload
		},
		setSelectedCategory(state, action: PayloadAction<CategoryType>) {
			state.currentPage = 1
			state.selectedCategory = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setTotalCount(state, action: PayloadAction<number>) {
			state.totalCount = action.payload
		},
		setKeywords(state, action: PayloadAction<string>) {
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
	setKeywords,
} = countriesSlice.actions
