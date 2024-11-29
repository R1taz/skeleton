import { useSelector } from 'react-redux'
import { useGetCountriesAPIQuery } from '../api/countriesApi'
import { useDebounce } from './hooks/useDebounce'

export const getCountries = () => {
	const keywords = useSelector(state => state.countriesSlice.keywords)
	const current_page = useSelector(state => state.countriesSlice.currentPage)
	const page_size = useSelector(state => state.countriesSlice.pageSize)
	const selected_category = useSelector(
		state => state.countriesSlice.selectedCategory
	)

	const debouncedValue = useDebounce(keywords, 1000)

	const { data, isLoading, error } = useGetCountriesAPIQuery({
		current_page: current_page,
		page_size: page_size,
		category: selected_category,
		keywords: debouncedValue,
	})

	let result = data
	if (!data) result = { countries: [], totalCount: 0 }

	return { data: result, isLoading: isLoading, error: error }
}
