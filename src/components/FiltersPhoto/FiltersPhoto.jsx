import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useGetPhotosByIntervalQuery } from '../../api/photosApi'
import { useDispatch } from 'react-redux'
import { setPhotos } from '../../store/slices/photosSlice'

const FiltersPhoto = ({ pageSize, totalCount, savedPhotos }) => {
	const [firstId, setFirstId] = useState(null)
	const [lastId, setLastId] = useState(null)
	const dispatch = useDispatch()

	const { data, isLoading } = useGetPhotosByIntervalQuery(
		{
			firstId,
			lastId,
			pageSize,
		},
		{ skip: !firstId && !lastId }
	)

	useEffect(() => {
		if ((data && !savedPhotos.length) || (data && firstId && lastId))
			dispatch(setPhotos({ photos: data, fullReplace: true }))
	}, [data])

	return (
		<Formik
			initialValues={{ firstId: '', lastId: '' }}
			onSubmit={(values, { setSubmitting }) => {
				if (!values.firstId && !values.lastId) {
					if (!savedPhotos.length) {
						setSubmitting(false)
						return
					}
					setFirstId(null)
					setLastId(null)
					dispatch(setPhotos({ photos: null, fullReplace: false }))
				} else {
					setFirstId(values.firstId || 1)
					setLastId(values.lastId || totalCount)
				}

				setSubmitting(false)
			}}
		>
			{({ isSubmitting }) => (
				<Form autoComplete='false' className={styles.form}>
					<div className={styles.form_interval}>
						<Field type='text' name='firstId' placeholder='Введите id от' />
						<Field type='text' name='lastId' placeholder='Введите id до' />
					</div>
					<button type='submit' disabled={isSubmitting || isLoading}>
						Search
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default FiltersPhoto
