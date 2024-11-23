import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const carsApi = createApi({
	reducerPath: 'carsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
	endpoints: builder => ({
		getCars: builder.query({
			query: () => 'cars',
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useGetCarsQuery } = carsApi
