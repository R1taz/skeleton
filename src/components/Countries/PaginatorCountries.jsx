import React, { memo } from 'react'
import { setCurrentPage } from '../../store/slices/countriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import Paginator from '../../shared/Paginator/Paginator'

const PaginatorCountries = memo(() => {
	const current_page = useSelector(state => state.countriesSlice.currentPage)
	const page_size = useSelector(state => state.countriesSlice.pageSize)
	const portion_size = useSelector(state => state.countriesSlice.portionSize)
	const total_count = useSelector(state => state.countriesSlice.totalCount)
	const dispatch = useDispatch()

	return (
		<Paginator
			totalCount={total_count}
			currentPage={current_page}
			pageSize={page_size}
			portionSize={portion_size}
			setCurrentPage={page => dispatch(setCurrentPage(page))}
		/>
	)
})

export default PaginatorCountries
