import React, { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState(0) // Time in seconds
  const [isRunning, setIsRunning] = useState(false)
  const { ommelet, bullseye, boiledegg, scrammbled } = [10, 200, 300, 400]

  // Start timer with 5 minutes (300 seconds) by default (for a typical boiled egg)
  const startTimer = (type) => {
    setTimeLeft(type) // 5 minutes
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
      alert('Egg timer done!') // You could enhance this with a notification
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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Egg Timer</h1>
      <div>
        <h2>{formatTime(timeLeft)}</h2>
        <button onClick={() => startTimer(10)} disabled={isRunning}>
          ommelet
        </button>
        <button onClick={() => startTimer(200)} disabled={isRunning}>
          bullseye
        </button>
        <button onClick={() => startTimer(300)} disabled={isRunning}>
          boiledegg
        </button>
        <button onClick={() => startTimer(400)} disabled={isRunning}>
          scrammbled
        </button>
        <button onClick={stopTimer}>{isRunning ? 'pause' : 'continue'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default App
