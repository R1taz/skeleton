import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reverseItems } from '../../store/slices/photosSlice'
import Skeleton from '../../shared/Skeleton/Skeleton'
import useVirtualScrolling from '../../helpers/hooks/useVirtualScrolling'
import styles from './styles.module.css'

const Photos = () => {
	const scrollElementRef = useRef(null)
	const isScrolling = useSelector(state => state.photosSlice.isScrolling)
	const rowHeight = useSelector(state => state.photosSlice.rowHeight)
	const containerHeight = useSelector(
		state => state.photosSlice.containerHeight
	)
	const items = useSelector(state => state.photosSlice.items)
	const overscan = useSelector(state => state.photosSlice.overscan)
	const dispatch = useDispatch()

	const { virtualItems, topDivHeight, bottomDivHeight } = useVirtualScrolling({
		containerHeight,
		rowHeight,
		scrollElementRef,
		items,
		overscan,
	})

	return (
		<div className={styles.photos}>
			<button
				className={styles.reverseBtn}
				onClick={() => dispatch(reverseItems())}
			>
				reverse
			</button>

			<div
				style={{
					height: containerHeight,
					overflow: 'auto',
					border: '1px solid lightgrey',
				}}
				ref={scrollElementRef}
			>
				<div style={{ height: topDivHeight }}></div>
				<div style={{ height: containerHeight }}>
					{/* {isScrolling && (
						<Skeleton countElems={virtualItems.length} height={rowHeight} />
					)} */}
					{!isScrolling &&
						virtualItems.map(virtualItem => (
							<div
								key={virtualItem.id}
								className={styles.photo}
								style={{ height: rowHeight }}
							>
								{virtualItem.text}
							</div>
						))}
				</div>
				<div style={{ height: bottomDivHeight }}></div>
			</div>
		</div>
	)
}

export default Photos
