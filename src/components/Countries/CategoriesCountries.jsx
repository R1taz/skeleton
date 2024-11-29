import React from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../store/slices/commentsSlice'
import { setSelectedCategory } from '../../store/slices/countriesSlice'

const CategoriesCountries = () => {
	const categories = useSelector(state => state.countriesSlice.categories)
	const dispatch = useDispatch()

	return (
		<div>
			{categories.map(category => (
				<button
					key={category}
					className={styles.category}
					onClick={() => dispatch(setSelectedCategory(category))}
				>
					{category}
				</button>
			))}
		</div>
	)
}

export default CategoriesCountries
