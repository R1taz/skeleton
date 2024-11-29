/* interface UseFizedSizeListProps {
	itemsCount: number
	itemHeight: number
	listHeight: number
	overscan?: number
	scrollingDelay: number
	getScrollingElement: () => HTMLElement | null
} */

const DEFAULT_OVERSCAN = 3
const DEFAULT_SCROLLING_DELAY = 150

export const useFizedSizeList = props => {
	const {
		itemHeight,
		itemCount,
		scrollingDelay = DEFAULT_SCROLLING_DELAY,
		overscan = DEFAULT_OVERSCAN,
		listHeight,
		getScrollingElement,
	} = props

	const [scrollTop, setScrollTop] = useState(0)
	const [isScrolling, setIsScrolling] = useState(false)

	useLayoutEffect(() => {
		const scrollElement = getScrollingElement()
		if (!scrollElement) return

		const handleScroll = () => {
			const scrollTop = scrollElement.scrollTop
			setScrollTop(scrollTop)
		}
		handleScroll()

		scrollElement.addEventListener('scroll', handleScroll)
		return () => scrollElement.addEventListener('scroll', handleScroll)
	}, [getScrollingElement])

	useEffect(() => {
		const scrollElement = getScrollingElement()
		if (!scrollElement) return

		let timeoutId = null
		const handleScroll = () => {
			setIsScrolling(true)

			if (typeof timeoutId === 'number') clearTimeout(timeoutId)

			timeoutId = setTimeout(() => setIsScrolling(false), scrollingDelay)
		}

		scrollElement.addEventListener('scroll', handleScroll)
		return () => scrollElement.addEventListener('scroll', handleScroll)
	}, [getScrollingElement])

	const { virtualItems, startIndex, endIndex } = useMemo(() => {
		const rangeStart = scrollTop
		const rangeEnd = scrollTop + containerHeight

		let startIndex = Math.floor(rangeStart / itemHeight)
		let endIndex = Math.ceil(rangeEnd / itemHeight)

		startIndex = Math.max(0, startIndex - overscan)
		endIndex = Math.min(listItems.length - 1, endIndex + overscan)

		const virtualItems = []

		for (let index = startIndex; index <= endIndex; index++) {
			virtualItems.push({
				index,
				offsetTop: index * itemHeight,
			})
		}

		return { virtualItems, startIndex, endIndex }
	}, [scrollTop, listHeight, itemCount])

	const totalListHeight = itemHeight * listItems.length

	return {
		virtualItems,
		startIndex,
		endIndex,
		totalListHeight,
		isScrolling,
	}
}
