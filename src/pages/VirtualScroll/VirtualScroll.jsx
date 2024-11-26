import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reverseItems } from '../../store/slices/simpleSlice'
import Skeleton from '../../shared/Skeleton/Skeleton'
import useVirtualScrolling from '../../hooks/useVirtualScrolling'

const VirtualScroll = () => {
	const scrollElementRef = useRef(null)
	const isScrolling = useSelector(state => state.simpleSlice.isScrolling)
	const rowHeight = useSelector(state => state.simpleSlice.rowHeight)
	const containerHeight = useSelector(
		state => state.simpleSlice.containerHeight
	)
	const dispatch = useDispatch()

	const { virtualItems, topDivHeight, bottomDivHeight } = useVirtualScrolling({
		containerHeight,
		rowHeight,
		scrollElementRef,
	})

	return (
		<div>
			<div>
				<button onClick={() => dispatch(reverseItems())}>reverse</button>
			</div>

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
							<div key={virtualItem.id} style={{ height: rowHeight }}>
								{virtualItem.text}
							</div>
						))}
				</div>
				<div style={{ height: bottomDivHeight }}></div>
			</div>
		</div>
	)
}

export default VirtualScroll
