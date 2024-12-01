import React from 'react'
import style from './Skeleton.module.css'

interface Props {
	countElems: number
	width?: number
	height?: number
	marginY?: number
	marginX?: number
}

const Skeleton = ({ countElems, width, height, marginY, marginX }: Props) => {
	const elements: React.JSX.Element[] = []

	const styles = {
		width: width ? `${width}px` : '100%',
		height: height ? `${height}px` : '100%',
		margin: `${marginY ? marginY : 0}px ${marginX ? marginX : 0}px`,
	}

	for (let i = 0; i < countElems; i++) {
		elements.push(<div key={i} style={styles} className={style.item}></div>)
	}

	return <div>{elements}</div>
}

export default Skeleton
