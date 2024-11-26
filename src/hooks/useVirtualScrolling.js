import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setIsScrolling } from '../store/slices/simpleSlice'

const useVirtualScrolling = props => {
	const { containerHeight, rowHeight, scrollElementRef } = props

	const [scrollTop, setScrollTop] = useState(0)
	const items = useSelector(state => state.simpleSlice.items)
	const overscan = useSelector(state => state.simpleSlice.overscan)

	useLayoutEffect(() => {
		const scrollElement = scrollElementRef.current
		if (!scrollElement) return

		const handleScroll = () => {
			const scrollTop = scrollElement.scrollTop
			setScrollTop(scrollTop)
		}

		handleScroll()

		scrollElement.addEventListener('scroll', handleScroll)
		return () => scrollElement.removeEventListener('scroll', handleScroll)
	}, [])

	const rangeStart = scrollTop
	const rangeEnd = scrollTop + containerHeight

	const startIndex = Math.max(0, Math.floor(rangeStart / rowHeight) - overscan)
	const endIndex = Math.min(
		items.length * rowHeight,
		Math.ceil(rangeEnd / rowHeight) + overscan
	)

	const topDivHeight = Math.min(startIndex * rowHeight)
	const bottomDivHeight = rowHeight * (items.length - endIndex)

	const virtualItems = items.slice(startIndex, endIndex + 1)
	return {
		virtualItems,
		topDivHeight,
		bottomDivHeight,
		startIndex,
		endIndex,
	}
}

export default useVirtualScrolling
