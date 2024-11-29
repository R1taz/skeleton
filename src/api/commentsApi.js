import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { JSONPLACEHOLDER_URL } from '../constants/constants'

const commentsApi = createApi({
	reducerPath: 'commentsApi',
	baseQuery: fetchBaseQuery({ baseUrl: JSONPLACEHOLDER_URL }),
	endpoints: builder => ({
		getCommentsAPI: builder.query({
			queryFn: async ({ current_page, page_size }) => {
				try {
					const response = await axios.get(`${JSONPLACEHOLDER_URL}comments`, {
						params: {
							_page: current_page,
							_per_page: page_size,
						},
					})

					return { data: response.data }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export default commentsApi
export const { useGetCommentsAPIQuery } = commentsApi
