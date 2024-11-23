import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { setClothes, setCurrentPage } from '../store/slices/clothesSlice'
import { useGetClothesQuery } from '../api/clothesApi'

import Paginator from '../shared/Paginator'
import ErrorModal from '../shared/ErrorModal'
import Skeleton from '../shared/Skeleton/Skeleton'
import Clothing from '../components/Clothing'

const ClothesPage = () => {
	const clothes = useSelector(state => state.clothesSlice.clothes)
	const totalCount = useSelector(state => state.clothesSlice.totalCount)
	const pageSize = useSelector(state => state.clothesSlice.pageSize)
	const portionSize = useSelector(state => state.clothesSlice.portionSize)
	const currentPage = useSelector(state => state.clothesSlice.currentPage)

	const dispatch = useDispatch()
	const { data, isLoading, isError } = useGetClothesQuery()

	useEffect(() => {
		if (data) dispatch(setClothes(data))
	}, [data, dispatch])

	const clothesElements = clothes.map(clothing => (
		<Clothing key={clothing.id} clothing={clothing} />
	))

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<NavLink style={{ margin: '15px 0px' }} to='/'>
				Back to Main
			</NavLink>
			{isError && <ErrorModal />}
			{isLoading && <Skeleton type='clothing' countElems={pageSize} />}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Paginator
					totalCount={totalCount}
					pageSize={pageSize}
					portionSize={portionSize}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>

				{clothesElements.slice(
					(currentPage - 1) * pageSize,
					currentPage * pageSize
				)}
			</div>
		</div>
	)
}

export default ClothesPage
