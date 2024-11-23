import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	photos: [],
	savedPhotos: [],
	currentPage: 1,
	pageSize: 10,
	totalCount: 0,
}

const photosSlice = createSlice({
	name: 'photosReducer',
	initialState,
	reducers: {
		setPhotos(state, action) {
			if (action.payload.fullReplace) {
				state.savedPhotos = state.photos
				state.photos = action.payload.photos
			} else if (!action.payload.photos) {
				state.photos = state.savedPhotos
				state.savedPhotos = []
			} else {
				state.photos = [...state.photos, ...action.payload.photos]
			}
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setTotalCount(state, action) {
			state.totalCount = +action.payload
		},
	},
})

export default photosSlice.reducer
export const { setPhotos, setCurrentPage, setTotalCount } = photosSlice.actions
