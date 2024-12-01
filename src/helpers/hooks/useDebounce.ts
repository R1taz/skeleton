import { useEffect, useState } from 'react'

interface DebounceParams<T> {
	value: T
	delay: number
}

export const useDebounce = <T>({ value, delay }: DebounceParams<T>): T => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay)

		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}
