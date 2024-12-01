import React from 'react'
import styles from './styles.module.css'
import { setSelectedCategory } from '../../store/slices/countriesSlice.ts'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/appHooks.ts'

const CategoriesCountries = () => {
	const categories = useAppSelector(state => state.countriesSlice.categories)
	const dispatch = useAppDispatch()

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
