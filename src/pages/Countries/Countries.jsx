import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LOCALHOST_URL } from '../../constants/constants'
import Paginator from '../../shared/Paginator/Paginator'

const Countries = () => {
	const [counrties, setCounrties] = useState([])
	const [totalCount, setTotalCount] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 20
	const portionSize = 5

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${LOCALHOST_URL}/us-counties?_page=${currentPage}`
				)

				const counrties = response.data.data
				const totalCount = response.data.items

				setTotalCount(totalCount)
				setCounrties(counrties)
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [currentPage])

	if (!counrties.length) return <div>Loading...</div>

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Paginator
				totalCount={totalCount}
				currentPage={currentPage}
				pageSize={pageSize}
				portionSize={portionSize}
				setCurrentPage={setCurrentPage}
			/>
			<div>
				{counrties.map(country => (
					<div
						key={country.population}
						style={{
							border: '2px solid blue',
							padding: '10px',
							margin: '30px 0px',
						}}
					>
						<p>Штат - {country.state}</p>
						<p>Город - {country.name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Countries
