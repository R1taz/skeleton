import { configureStore } from '@reduxjs/toolkit'
import simpleSlice from './slices/simpleSlice'
import commentsSlice from './slices/commentsSlice'

const store = configureStore({
	reducer: {
		simpleSlice,
		commentsSlice,
	},
})
export default store
