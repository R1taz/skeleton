import { configureStore } from '@reduxjs/toolkit'
import photosSlice from './slices/photosSlice.ts'
import commentsSlice from './slices/commentsSlice.ts'
import countriesSlice from './slices/countriesSlice.ts'
import countriesApi from '../api/countriesApi'
import commentsApi from '../api/commentsApi'

const store = configureStore({
	reducer: {
		photosSlice,
		commentsSlice,
		countriesSlice,
		[countriesApi.reducerPath]: countriesApi.reducer,
		[commentsApi.reducerPath]: commentsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			countriesApi.middleware,
			commentsApi.middleware,
		]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
