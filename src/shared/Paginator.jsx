import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Paginator = ({
	currentPage,
	pageSize,
	portionSize,
	totalCount,
	setCurrentPage,
}) => {
	const dispatch = useDispatch()

	const countAllPages = Math.ceil(totalCount / pageSize)
	const [currentPortion, setCurrentPortion] = useState(
		Math.ceil(currentPage / portionSize)
	)

	const leftNumber = (currentPortion - 1) * portionSize + 1
	const rightNumber =
		currentPortion * portionSize > countAllPages
			? countAllPages
			: currentPortion * portionSize

	const buttonsElements = []

	for (let i = leftNumber; i <= rightNumber; i++) {
		if (i === currentPage) {
			buttonsElements.push(
				<button disabled style={{ background: 'gray', color: 'black' }} key={i}>
					{i}
				</button>
			)
		} else {
			buttonsElements.push(
				<button key={i} onClick={() => dispatch(setCurrentPage(i))}>
					{i}
				</button>
			)
		}
	}

	return (
		<div>
			<button
				disabled={leftNumber === 1}
				style={{ margin: '15px' }}
				onClick={() => {
					setCurrentPortion(currentPortion - 1)
					dispatch(setCurrentPage(leftNumber - portionSize))
				}}
			>
				previous
			</button>

			{buttonsElements}

			<button
				disabled={rightNumber === countAllPages}
				style={{ margin: '15px' }}
				onClick={() => {
					setCurrentPortion(currentPortion + 1)
					dispatch(setCurrentPage(rightNumber + 1))
				}}
			>
				next
			</button>
		</div>
	)
}

export default Paginator
