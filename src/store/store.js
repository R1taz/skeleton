import { configureStore } from '@reduxjs/toolkit'
import carsSlice from './slices/carsSlice'
import clothesSlice from './slices/clothesSlice'
import photosSlice from './slices/photosSlice'
import { carsApi } from '../api/carsApi'
import { clothesApi } from '../api/clothesApi'
import { photosApi } from '../api/photosApi'

export default configureStore({
	reducer: {
		carsSlice,
		clothesSlice,
		photosSlice,
		[carsApi.reducerPath]: carsApi.reducer,
		[clothesApi.reducerPath]: clothesApi.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			carsApi.middleware,
			clothesApi.middleware,
			photosApi.middleware,
		]),
})
