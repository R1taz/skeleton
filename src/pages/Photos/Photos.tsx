import React, { useRef } from 'react'
import { reverseItems } from '../../store/slices/photosSlice.ts'
import Skeleton from '../../shared/Skeleton/Skeleton.tsx'
import useVirtualScrolling from '../../helpers/hooks/useVirtualScrolling.ts'
import styles from './styles.module.css'
import { useAppSelector, useAppDispatch } from '../../helpers/hooks/appHooks.ts'

const Photos = () => {
	const scrollElementRef = useRef<HTMLDivElement | null>(null)
	const isScrolling = useAppSelector(state => state.photosSlice.isScrolling)
	const rowHeight = useAppSelector(state => state.photosSlice.rowHeight)
	const containerHeight = useAppSelector(
		state => state.photosSlice.containerHeight
	)
	const items = useAppSelector(state => state.photosSlice.items)
	const overscan = useAppSelector(state => state.photosSlice.overscan)
	const dispatch = useAppDispatch()

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
