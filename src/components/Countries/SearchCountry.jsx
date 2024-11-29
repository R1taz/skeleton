import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKeywords } from '../../store/slices/countriesSlice'

const SearchCountry = () => {
	const keywords = useSelector(state => state.countriesSlice.keywords)
	const dispatch = useDispatch()

	return (
		<input
			value={keywords}
			onChange={e => dispatch(setKeywords(e.target.value))}
			placeholder='Enter the name of the city'
		/>
	)
}

export default SearchCountry
