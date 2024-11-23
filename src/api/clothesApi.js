import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const clothesApi = createApi({
	reducerPath: 'clothesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
	endpoints: builder => ({
		getClothes: builder.query({
			query: () => 'clothes',
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useGetClothesQuery } = clothesApi
