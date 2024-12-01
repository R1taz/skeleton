import React, { useEffect } from 'react'
import styles from './styles.module.css'
import {
	setCountries,
	setTotalCount,
} from '../../store/slices/countriesSlice.ts'
import { getCountries } from '../../helpers/getCountries.ts'
import Skeleton from '../../shared/Skeleton/Skeleton.tsx'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/appHooks.ts'
import ErrorModal from '../../shared/ErrorModal.tsx'

const CountriesList = () => {
	const countries = useAppSelector(state => state.countriesSlice.countries)
	const page_size = useAppSelector(state => state.countriesSlice.pageSize)
	const total_count = useAppSelector(state => state.countriesSlice.totalCount)
	const dispatch = useAppDispatch()

	const { data, isLoading, error } = getCountries()

	useEffect(() => {
		if (data && JSON.stringify(countries) !== JSON.stringify(data.countries)) {
			if (total_count !== data.totalCount) {
				dispatch(setTotalCount(data.totalCount!))
			}
			dispatch(setCountries(data.countries!))
		}
	}, [data, dispatch])

	if (error) return <ErrorModal />
	if (isLoading || (data!.totalCount !== 0 && !countries.length)) {
		return <Skeleton countElems={page_size} marginY={30} marginX={0} />
	}

	return (
		<div>
			{countries.map((country, index) => (
				<div key={index} className={styles.country}>
					<p>Популярность - {country.population}</p>
					<p>Штат - {country.state}</p>
					<p>Город - {country.name}</p>
				</div>
			))}
		</div>
	)
}

export default CountriesList
