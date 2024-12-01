import { useGetCountriesAPIQuery } from '../api/countriesApi'
import { useDebounce } from './hooks/useDebounce'
import { useAppSelector } from './hooks/appHooks'

export const getCountries = () => {
	const keywords = useAppSelector(state => state.countriesSlice.keywords)
	const current_page = useAppSelector(state => state.countriesSlice.currentPage)
	const page_size = useAppSelector(state => state.countriesSlice.pageSize)
	const selected_category = useAppSelector(
		state => state.countriesSlice.selectedCategory
	)

	const debouncedValue = useDebounce<string>({ value: keywords, delay: 1000 })

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
