import { useState } from 'react'

const Paginator = ({
	totalCount,
	currentPage,
	pageSize,
	portionSize,
	setCurrentPage,
}) => {
	const allPagesCount = Math.ceil(totalCount / pageSize)
	const allPortionCount = Math.ceil(allPagesCount / portionSize)
	const [currentPortion, setCurrentPortion] = useState(
		Math.ceil(currentPage / portionSize)
	)

	const leftNumber = (currentPortion - 1) * portionSize + 1
	const rightNumber = Math.min(allPagesCount, currentPortion * portionSize)

	const buttons = []

	for (let i = leftNumber; i <= rightNumber; i++) {
		buttons.push(
			<button
				disabled={i === currentPage}
				onClick={() => setCurrentPage(i)}
				key={i}
			>
				{i}
			</button>
		)
	}

	return (
		<div>
			<button
				disabled={currentPortion === 1}
				onClick={() => {
					setCurrentPage(leftNumber - portionSize)
					setCurrentPortion(currentPortion - 1)
				}}
			>
				prev
			</button>
			{buttons.map(item => item)}
			<button
				disabled={currentPortion === allPortionCount}
				onClick={() => {
					setCurrentPage(rightNumber + 1)
					setCurrentPortion(currentPortion + 1)
				}}
			>
				next
			</button>
		</div>
	)
}

export default Paginator
