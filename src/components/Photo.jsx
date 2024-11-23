import React from 'react'

const Photo = ({ photo }) => {
	return (
		<div>
			<p>{photo.id}</p>
			<img
				style={{
					margin: '10px',
					borderRadius: '1em',
					width: '30vh',
					height: '30vh',
				}}
				src={photo.thumbnailUrl}
				alt=''
			/>
		</div>
	)
}

export default Photo
