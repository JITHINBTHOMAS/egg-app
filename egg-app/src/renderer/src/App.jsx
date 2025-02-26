import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import bullseye from './assets/icons/bullseye.png'
import boiled from './assets/icons/boiled2.png'
import closeIcon from './assets/icons/close_button.png'
import minimizeIcon from './assets/icons/minimize_button.png'

function App() {
  const [timeLeft, setTimeLeft] = useState(0) // Time in seconds
  const [isRunning, setIsRunning] = useState(false)
  const { ommelet, bullseyeTimer, boiledegg, scrammbled } = {
    ommelet: 10,
    bullseyeTimer: 200,
    boiledegg: 300,
    scrammbled: 400
  } // Renamed 'bullseye' to avoid conflict

  // Start timer with specific type duration
  const startTimer = (type) => {
    setTimeLeft(type)
    setIsRunning(true)
  }

  // Stop/Pause timer
  const stopTimer = () => {
    setIsRunning(!isRunning)
  }

  // Reset timer
  const resetTimer = () => {
    setTimeLeft(0)
    setIsRunning(false)
  }

  // Timer logic
  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      alert('Egg timer done!')
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <>
      <div
        style={{
          height: '32px',
          backgroundColor: '#333',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10px',
          WebkitAppRegion: 'drag' // Makes the title bar draggable
        }}
      >
        <span>Egg Timer</span>
        <div style={{ display: 'flex', gap: '5px', WebkitAppRegion: 'no-drag' }}>
          <button
            onClick={''}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src={minimizeIcon} alt="Minimize" style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={''}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src={closeIcon} alt="Close" style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Choose your egg</h1>
        <div>
          <h2>{formatTime(timeLeft)}</h2>
          {!isRunning ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                  src={bullseye}
                  alt="bullseye"
                  onClick={() => startTimer(ommelet)}
                  disabled={isRunning}
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: isRunning ? 'not-allowed' : 'pointer' // Cursor on image
                  }}
                />
                <img
                  src={bullseye}
                  alt="bullseye"
                  onClick={() => startTimer(bullseyeTimer)}
                  disabled={isRunning}
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: isRunning ? 'not-allowed' : 'pointer' // Cursor on image
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                  src={boiled}
                  alt="boiled"
                  onClick={() => startTimer(boiledegg)}
                  disabled={isRunning}
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: isRunning ? 'not-allowed' : 'pointer' // Cursor on image
                  }}
                />
                <img
                  src={boiled}
                  alt="boiled"
                  onClick={() => startTimer(scrammbled)}
                  disabled={isRunning}
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: isRunning ? 'not-allowed' : 'pointer' // Cursor on image
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{}}>
              <img
                src={bullseye}
                alt="bullseye"
                style={{
                  width: '225px',
                  height: '225px'
                }}
              />
            </Box>
          )}
          <button onClick={stopTimer}>{isRunning ? 'pause' : 'continue'}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </>
  )
}

export default App
