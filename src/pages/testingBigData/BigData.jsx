import React, { useCallback, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useFizedSizeList } from '../../hooks/useFizedSizeList'

const items = Array.from({ length: 10000 }, (_, index) => ({
	id: Math.random().toString(36).slice(2),
	text: String(index),
}))

const itemHeight = 40
const containerHeight = 600

const BigData = () => {
	const [listItems, setListItems] = useState(items)
	const scrollElementRef = useRef(null)

	const { isScrolling, virtualItems, totalListHeight } = useFizedSizeList({
		itemHeight: itemHeight,
		itemsCount: listItems.length,
		listHeight: containerHeight,
		getScrollingElement: useCallback(() => scrollElementRef.current, []),
	})

	return (
		<div className={styles.main}>
			<h1>List</h1>
			<div className={styles.reverseBtn}>
				<button onClick={() => setListItems(items => items.slice().reverse())}>
					reverse
				</button>
			</div>

			<div
				ref={scrollElementRef}
				style={{ height: containerHeight, position: 'relative' }}
				className={styles.container}
			>
				<div style={{ height: totalListHeight }}>
					{virtualItems.map(virtualItem => {
						const item = listItems[virtualItem.index]

						return (
							<div
								style={{
									height: itemHeight,
									position: 'absolute',
									top: 0,
									transform: `translateY(${virtualItem.offsetTop}px)`,
								}}
								className={styles.item}
								key={item.id}
							>
								{isScrolling ? 'skeleton item' : item.text}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default BigData
