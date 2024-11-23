import React from 'react'
import style from './Skeleton.module.css'

const Skeleton = ({ countElems = 1, type = 'car' }) => {
	const elements = []

	for (let i = 0; i < countElems; i++) {
		elements.push(
			<div key={i} className={`${style.item} ${style[type]}`}></div>
		)
	}

	return (
		<div>
			<div style={{ margin: '15px' }}>Preloader</div>
			{elements}
		</div>
	)
}

export default Skeleton
