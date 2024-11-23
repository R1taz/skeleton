import React from 'react'

const Car = ({ car }) => {
	return (
		<div
			style={{
				borderRadius: '1em',
				border: '2px solid white',
				width: '45vh',
				height: '25vh',
				margin: '30px',
			}}
		>
			<p>{car.id}</p>
			<p>{car.brand}</p>
			<p>{car.model}</p>
			<p>{car.indexEngine}</p>
		</div>
	)
}

export default Car
