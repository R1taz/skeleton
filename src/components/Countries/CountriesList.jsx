import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { setCountries, setTotalCount } from '../../store/slices/countriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../../helpers/getCountries'
import Skeleton from '../../shared/Skeleton/Skeleton'

const CountriesList = () => {
	const countries = useSelector(state => state.countriesSlice.countries)
	const page_size = useSelector(state => state.countriesSlice.pageSize)
	const total_count = useSelector(state => state.countriesSlice.totalCount)
	const dispatch = useDispatch()

	const { data, isLoading, error } = getCountries()

	useEffect(() => {
		if (data && JSON.stringify(countries) !== JSON.stringify(data.countries)) {
			if (total_count !== data.totalCount) {
				dispatch(setTotalCount(data.totalCount))
			}
			dispatch(setCountries(data.countries))
		}
	}, [data, dispatch])

	if (error) return <ErrorModal />
	if (isLoading || (data.totalCount !== 0 && !countries.length)) {
		return <Skeleton countElems={page_size} margin={`${30}px ${0}`} />
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
