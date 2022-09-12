import React, { useState, useEffect } from 'react'
import Square from './resources/Square'

const rowStyle = {
	display: 'flex',
	FlexDirection: 'column'
}

const instructionsStyle = {
	marginTop: '5px',
	marginBottom: '5px',
	fontSize: '16px',
}

const buttonStyle = {
	marginTop: '15px',
	marginBottom: '16px',
	width: '80px',
	height: '40px',
	backgroundColor: 'transparent',
	border: 'none',
	color: '#999',
	fontSize: '16px',
	cursor: 'pointer'
}

const winnerStyle = {
	padding: '.5rem 1rem',
	fontWeight: 'bold',
	fontSize: '.75rem',
	color: '#185a47',
	marginTop: '1rem'
}

interface Props {
	players: Array<string>,
	ready?: boolean,
	goBack: (ready: boolean) => void
}

interface ListWinners {
	name?: string,
	winners?: number
}

const Board = ({ players, ready, goBack }: Props) => {
	const [list, setList] = useState<Array<ListWinners>>([
		{
			name: players[0],
			winners: 0
		},
		{
			name: players[1],
			winners: 0
		}
	])
	const [turn, setTurn] = useState<string>(players[0])
	const [msg, setMsg] = useState<string>('')
	const [winner, setWinner] = useState<string>('')

	// 0 to 8 for each square (up-left to down-right)
	const [info, setInfo] = useState<Array<string>>(['', '', '', '', '', '', '', '', ''])

	const chkTie = () => {
		let count = 0
		info.forEach(cell => { if (cell !== '') count++ })
		console.log(count)
		if (count > 8) return true
		return false
	}

	const chkWinner = () => {
		if (chkHorizontal() || chkVertical() || chkDiagonal()) {
			setWinner(turn)
			return
		}
		if (chkTie()) {
			setWinner('TIE')
		}
	}

	//  horizontal, vertical, diagonal
	const chkHorizontal = () => {
		let h = false
		for (let i = 0; i < 9; i += 3) {
			if (info[i] !== '' && info[i] === info[i + 1] && info[i + 1] === info[i + 2])
				h = true
		}
		return h
	}

	const chkVertical = () => {
		let v = false
		for (let i = 0; i < 3; i++) {
			if (info[i] !== '' && info[i] === info[i + 3] && info[i + 3] === info[i + 6])
				v = true
		}
		return v
	}

	const chkDiagonal = () => {
		let d = false
		if (((info[0] === info[4] && info[4] === info[8]) ||
			(info[2] === info[4] && info[4] === info[6]))
			&& info[4] !== '') d = true
		return d
	}


	const handleReset = () => {
		setInfo(['', '', '', '', '', '', '', '', ''])
		setTurn(players[0])
		if (winner) {
			setMsg(`Last winner: ${winner}`)

			if (winner !== 'TIE') {
				let tmpList = list
				let index = tmpList.findIndex(l => l.name === winner)
				if (index > -1) {
					let cant = tmpList[index].winners || 0
					tmpList[index] = {
						name: winner,
						winners: cant + 1
					}
				} else {
					tmpList.push({
						name: winner,
						winners: 1
					})
				}
				setList(tmpList)
			}

		}
		setWinner('')
	}

	useEffect(() => {
		handleReset()
	}, [winner])

	// event + index
	const handleClick = (i: number) => {
		if (info[i] === '') {
			let shape = turn === players[0] ? 'X' : 'O'
			let arr = [...info]
			arr[i] = shape
			setInfo(arr)
			chkWinner()
			setTurn(turn === players[0] ? players[1] : players[0])
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={instructionsStyle}>
				Next player: <b>{turn}</b>
			</div>
			<div style={{
				backgroundColor: '#d4ebe4',
				border: '3px solid #d4ebe4',
				display: 'flex',
				flexDirection: 'column'
			}}>
				<div style={rowStyle}>
					<Square shape={info[0]} onClick={() => handleClick(0)} />
					<Square shape={info[1]} onClick={() => handleClick(1)} />
					<Square shape={info[2]} onClick={() => handleClick(2)} />
				</div>
				<div style={rowStyle}>
					<Square shape={info[3]} onClick={() => handleClick(3)} />
					<Square shape={info[4]} onClick={() => handleClick(4)} />
					<Square shape={info[5]} onClick={() => handleClick(5)} />
				</div>
				<div style={rowStyle}>
					<Square shape={info[6]} onClick={() => handleClick(6)} />
					<Square shape={info[7]} onClick={() => handleClick(7)} />
					<Square shape={info[8]} onClick={() => handleClick(8)} />
				</div>
			</div>
			<div>
				<button style={buttonStyle} onClick={() => goBack(false)}>Go back</button>
				<button style={buttonStyle} onClick={handleReset}>Reset</button>
			</div>
			{
				msg !== '' &&
				<div id="winnerArea" style={winnerStyle}>
					<span>{msg}</span>
				</div>
			}
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '.2rem',
				padding: '1rem',
				width: '100%',
				height: '64px',
				overflowY: 'auto',
				fontSize: '.7rem',
				backgroundColor: '#d4ebe4',
				textAlign: 'center',
			}}>
				<span><b>SCORE</b></span>
				{
					list.map(l =>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span>{l.name}</span>
							<span>{l.winners}</span>
						</div>
					)}
			</div>
		</div>
	);
}

export default Board