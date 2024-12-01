import React, { memo } from 'react'
import { setCurrentPage } from '../../store/slices/countriesSlice.ts'
import Paginator from '../../shared/Paginator/Paginator.tsx'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/appHooks.ts'

const PaginatorCountries = memo(() => {
	const current_page = useAppSelector(state => state.countriesSlice.currentPage)
	const page_size = useAppSelector(state => state.countriesSlice.pageSize)
	const portion_size = useAppSelector(state => state.countriesSlice.portionSize)
	const total_count = useAppSelector(state => state.countriesSlice.totalCount)
	const dispatch = useAppDispatch()

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
