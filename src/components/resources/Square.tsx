import React from 'react'

const squareStyle = {
	width: '60px',
	height: '60px',
	backgroundColor: '#fff',
	margin: '4px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: '#185a47',
	fontWeight: 'bold',
	fontSize: '1.5rem',
	cursor: 'pointer'
}

interface Props {
	shape: string,
	onClick: () => void,
}

const Square = ({ shape, onClick }: Props) => {
	return (
		<div className="square" style={squareStyle} onClick={onClick}>
			{shape}
		</div>
	)
}
export default Square