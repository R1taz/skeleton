import React, { useState } from 'react'
import styles from './styles.module.css'

interface Props {
	totalCount: number
	currentPage: number
	pageSize: number
	portionSize: number
	setCurrentPage: (page: number) => void
}

const Paginator = ({
	totalCount,
	currentPage,
	pageSize,
	portionSize,
	setCurrentPage,
}: Props) => {
	const allPagesCount = Math.ceil(totalCount / pageSize)
	const allPortionCount = Math.ceil(allPagesCount / portionSize)
	const [currentPortion, setCurrentPortion] = useState(
		Math.ceil(currentPage / portionSize)
	)

	const leftNumber = (currentPortion - 1) * portionSize + 1
	const rightNumber = Math.min(allPagesCount, currentPortion * portionSize)

	const buttons: React.JSX.Element[] = []

	for (let i = leftNumber; i <= rightNumber; i++) {
		buttons.push(
			<button
				className={styles.button}
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
				className={styles.button}
				disabled={currentPortion === 1}
				onClick={() => {
					setCurrentPage(leftNumber - portionSize)
					setCurrentPortion(currentPortion - 1)
				}}
			>
				&#8592;
			</button>
			{buttons.map(item => item)}
			<button
				className={styles.button}
				disabled={currentPortion === allPortionCount}
				onClick={() => {
					setCurrentPage(rightNumber + 1)
					setCurrentPortion(currentPortion + 1)
				}}
			>
				&#8594;
			</button>
		</div>
	)
}

export default Paginator
