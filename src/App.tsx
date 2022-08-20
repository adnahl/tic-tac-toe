import React, { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {

  type players = {
    player1: string,
    player2: string,
  }
  const [players, setPlayers] = useState<players>({ player1: '', player2: '' })
  const [ready, setReady] = useState<boolean>(false)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target
    setPlayers({ ...players, [name]: value })
  }

  return (
    <div className='app'>
      {
        ready
          ?
          <Board
            players={[
              players.player1 === '' ? 'Player 1' : players.player1,
              players.player2 === '' ? 'Player 2' : players.player2
            ]}
            ready={ready}
            goBack={setReady}
          />
          :
          <>
            <form>
              <div className='title'>TIC-TAC-TOE</div>
              <input type='text'
                name='player1'
                placeholder='Player 1'
                value={players.player1}
                onChange={handleChange}
              />
              <span>vs.</span>
              <input type='text'
                name='player2'
                placeholder='Player 2'
                value={players.player2}
                onChange={handleChange}
              />
              <button type='submit' onClick={() => setReady(true)}>Submit</button>
            </form>
          </>
      }
    </div>
  )
}

export default App
