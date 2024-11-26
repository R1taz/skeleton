import React from 'react'
import style from './Skeleton.module.css'

const Skeleton = ({ countElems, width, height, margin }) => {
	const elements = []
	const styles = {
		width: width ? `${width}px` : '100%',
		height: height ? `${height}px` : '100%',
		margin: margin ? `${margin}px` : '0px',
	}

	for (let i = 0; i < countElems; i++) {
		elements.push(<div key={i} style={styles} className={style.item}></div>)
	}

	return <div>{elements}</div>
}

export default Skeleton
