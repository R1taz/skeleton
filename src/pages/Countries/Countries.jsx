import React from 'react'
import styles from './styles.module.css'

import PaginatorCountries from '../../components/Countries/PaginatorCountries'
import CategoriesCountries from '../../components/Countries/CategoriesCountries'
import SearchCountry from '../../components/Countries/SearchCountry'
import CountriesList from '../../components/Countries/CountriesList'

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
