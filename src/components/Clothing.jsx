import React from 'react'

const Clothing = ({ clothing }) => {
	return (
		<div
			style={{
				borderRadius: '1em',
				border: '2px solid white',
				width: '45vh',
				height: '15vh',
				margin: '30px',
			}}
		>
			<p>{clothing.id}</p>
			<p>{clothing.price}</p>
		</div>
	)
}

export default Clothing
