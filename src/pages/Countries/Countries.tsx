import React from 'react'
import styles from './styles.module.css'

import PaginatorCountries from '../../components/Countries/PaginatorCountries.tsx'
import CategoriesCountries from '../../components/Countries/CategoriesCountries.tsx'
import SearchCountry from '../../components/Countries/SearchCountry.tsx'
import CountriesList from '../../components/Countries/CountriesList.tsx'

const Countries = () => {
	return (
		<div className={styles.countries}>
			<CategoriesCountries />
			<PaginatorCountries />
			<SearchCountry />
			<CountriesList />
		</div>
	)
}

export default Countries
