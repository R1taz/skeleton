import React, { useEffect } from 'react'
import { useGetPhotosQuery } from '../../api/photosApi'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCurrentPage,
	setPhotos,
	setTotalCount,
} from '../../store/slices/photosSlice'
import styles from './styles.module.css'

import ErrorModal from '../../shared/ErrorModal'
import Skeleton from '../../shared/Skeleton/Skeleton'
import Photo from '../../components/Photo'
import Preloader from '../../shared/Preloader'
import FiltersPhoto from '../../components/FiltersPhoto/FiltersPhoto'

const PhotosPage = () => {
	const photos = useSelector(state => state.photosSlice.photos)
	const savedPhotos = useSelector(state => state.photosSlice.savedPhotos)
	const currentPage = useSelector(state => state.photosSlice.currentPage)
	const pageSize = useSelector(state => state.photosSlice.pageSize)
	const totalCount = useSelector(state => state.photosSlice.totalCount)
	const dispatch = useDispatch()

	const { data, isLoading, isError, isFetching } = useGetPhotosQuery(
		{
			currentPage,
			pageSize,
		},
		{ skip: savedPhotos.length !== 0 }
	)

	useEffect(() => {
		if ((data && !photos.length) || (data && !savedPhotos.length)) {
			dispatch(setTotalCount(data.totalCount))
			dispatch(setPhotos({ photos: data.photos, fullReplace: false }))
		}
	}, [data])

	useEffect(() => {
		if (savedPhotos.length) return
		if (photos.length) {
			const divObserver = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(entry => {
						if (entry.isIntersecting && currentPage * pageSize !== totalCount) {
							dispatch(setCurrentPage(currentPage + 1))
							observer.unobserve(entry.target)
						}
					})
				},
				{
					rootMargin: '50px 0px',
				}
			)
			divObserver.observe(document.querySelector('#photos div:last-child'))
		}
	}, [photos.length])

	const photosElements = photos.map(photo => (
		<Photo key={photo.id} photo={photo} />
	))

	return (
		<div id='photos' className={styles.photos}>
			{isLoading && <Skeleton countElems={pageSize} type='photo' />}
			{isError && <ErrorModal />}

			<FiltersPhoto
				savedPhotos={savedPhotos}
				pageSize={pageSize}
				totalCount={totalCount}
			/>
			{photosElements}
			{photos.length !== 0 && isFetching && <Preloader />}
		</div>
	)
}

export default PhotosPage
