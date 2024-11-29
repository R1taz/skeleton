import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { LOCALHOST_URL } from '../constants/constants'

const countriesApi = createApi({
	reducerPath: 'countriesApi',
	baseQuery: fetchBaseQuery({ baseUrl: LOCALHOST_URL }),
	endpoints: builder => ({
		getCountriesAPI: builder.query({
			queryFn: async ({ current_page, page_size, category, keywords }) => {
				try {
					let filtredCountries
					let totalCount

					if (keywords === '') {
						const response = await axios.get(`${LOCALHOST_URL}us-counties`, {
							params: {
								_page: current_page,
								_per_page: page_size,
								state: category === 'All' ? null : category,
							},
						})

						filtredCountries = response.data.data
						totalCount = response.data.items
					}

					if (keywords !== '') {
						const response = await axios.get(`${LOCALHOST_URL}us-counties`, {
							params: {
								state: category === 'All' ? null : category,
							},
						})

						const countries = response.data
						filtredCountries = countries.filter(country => {
							if (country.name.toLowerCase().includes(keywords.toLowerCase()))
								return country
						})

						totalCount = filtredCountries.length
					}

					return {
						data: {
							countries: filtredCountries,
							totalCount: totalCount,
						},
					}
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export default countriesApi
export const { useGetCountriesAPIQuery } = countriesApi
