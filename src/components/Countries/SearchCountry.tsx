import React from 'react'
import { setKeywords } from '../../store/slices/countriesSlice.ts'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/appHooks.ts'

const SearchCountry = () => {
	const keywords = useAppSelector(state => state.countriesSlice.keywords)
	const dispatch = useAppDispatch()

	return (
		<input
			value={keywords}
			onChange={e => dispatch(setKeywords(e.target.value))}
			placeholder='Enter the name of the city'
		/>
	)
}

export default SearchCountry
