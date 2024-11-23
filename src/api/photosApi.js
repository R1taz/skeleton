import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const BASEURL = 'https://jsonplaceholder.typicode.com/'

const instance = axios.create({
	baseURL: BASEURL,
})

export const photosApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASEURL,
	}),
	endpoints: builder => ({
		getPhotos: builder.query({
			queryFn: async ({ currentPage = 1, pageSize = 10 }) => {
				try {
					const params = { _limit: pageSize, _page: currentPage }
					const response = await instance.get('photos', { params })
					const photos = response.data
					const totalCount = response.headers['x-total-count']

					return { data: { photos, totalCount } }
				} catch (error) {
					return { error }
				}
			},
		}),
		getPhotosByInterval: builder.query({
			queryFn: async ({ firstId, lastId, pageSize }) => {
				try {
					firstId = Number(firstId)
					lastId = Number(lastId)

					if (!firstId && !lastId) return { data: null }
					const pageFirstId = Math.ceil(firstId / pageSize)
					const pageLastId = Math.ceil(lastId / pageSize)

					const requests = []

					for (let i = pageFirstId; i <= pageLastId; i++) {
						const params = { _limit: pageSize, _page: i }
						requests.push(instance.get('photos', { params }))
					}

					const responses = await Promise.all(requests)

					const photos = []

					if (firstId === lastId) {
						return { data: [responses[0].data.find(i => i.id === firstId)] }
					}

					for (let response of responses) {
						const startAndLast = response.data.filter(
							i => i.id === firstId || i.id === lastId
						)

						if (startAndLast.length === 2) {
							const startIndex = response.data.findIndex(i => i.id === firstId)
							const lastIndex = response.data.findIndex(i => i.id === lastId)
							photos.push(...response.data.slice(startIndex, lastIndex + 1))
						}

						if (startAndLast.length === 1 && startAndLast[0].id === firstId) {
							const index = response.data.findIndex(i => i.id === firstId)
							photos.push(...response.data.slice(index))
						}

						if (startAndLast.length === 1 && startAndLast[0].id === lastId) {
							const index = response.data.findIndex(i => i.id === lastId)
							photos.push(...response.data.slice(0, index + 1))
						}

						if (!startAndLast.length) photos.push(...response.data)
					}

					return { data: photos }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export const { useGetPhotosQuery, useGetPhotosByIntervalQuery } = photosApi
