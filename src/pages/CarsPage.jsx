import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Car from '../components/Car'
import { setCars, setCurrentPage } from '../store/slices/carsSlice'
import { useGetCarsQuery } from '../api/carsApi'

import Paginator from '../shared/Paginator'
import ErrorModal from '../shared/ErrorModal'
import Skeleton from '../shared/Skeleton/Skeleton'

const CarsPage = () => {
	const cars = useSelector(state => state.carsSlice.cars)
	const totalCount = useSelector(state => state.carsSlice.totalCount)
	const pageSize = useSelector(state => state.carsSlice.pageSize)
	const portionSize = useSelector(state => state.carsSlice.portionSize)
	const currentPage = useSelector(state => state.carsSlice.currentPage)

	const dispatch = useDispatch()
	const { data, isLoading, isError } = useGetCarsQuery()

	useEffect(() => {
		if (data) dispatch(setCars(data))
	}, [data, dispatch])

	const carsElements = cars.map(car => <Car key={car.id} car={car} />)

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<NavLink style={{ margin: '15px 0px' }} to='/'>
				Back to Main
			</NavLink>
			{isError && <ErrorModal />}
			{isLoading && <Skeleton type='car' countElems={pageSize} />}
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

				{carsElements.slice(
					(currentPage - 1) * pageSize,
					currentPage * pageSize
				)}
			</div>
		</div>
	)
}

export default CarsPage
