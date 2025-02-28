import React, { useState, useEffect } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import bullseyeIcon from './assets/icons/bullseye.png'
import boiled from './assets/icons/boiled2.png'
import omeletteIcon from './assets/icons/omelette.png'
import scrambledIcon from './assets/icons/scrambled.png'
import closeIcon from './assets/icons/close_button.png'
import minimizeIcon from './assets/icons/minimize_button.png'
import title_bar from './assets/icons/title_bar.png'
import pauseIcon from './assets/icons/pause_continue_button.png'
import resetIcon from './assets/icons/reset_button.png'
import logo from '../../../resources/egg-app-logo.png?asset'

function App() {
  const [timeLeft, setTimeLeft] = useState(0) // Time in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentEgg, setCurrentEgg] = useState('') // Stores the current egg type
  const eggTypes = {
    ommelet: { time: 10, name: 'Omelette', image: omeletteIcon },
    bullseye: { time: 200, name: 'Bullseye', image: bullseyeIcon },
    boiledegg: { time: 300, name: 'Boiled Egg', image: boiled },
    scrammbled: { time: 400, name: 'Scrambled', image: scrambledIcon }
  }

  const handleMinimize = () => window.electron.minimize()
  const handleClose = () => window.electron.close()

  // Start timer with specific type duration and set current egg
  const startTimer = (type) => {
    setTimeLeft(eggTypes[type].time)
    setCurrentEgg(type) // Store the selected egg type
    setIsRunning(true)
    setHasStarted(true)
  }

  // Stop/Pause timer
  const stopTimer = () => {
    setIsRunning(!isRunning)
  }

  // Reset timer
  const resetTimer = () => {
    setTimeLeft(0)
    setIsRunning(false)
    setCurrentEgg('') // Clear current egg on reset
    setHasStarted(false)
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
      setCurrentEgg('') // Clear current egg when timer finishes
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
          height: '50px',
          width: '300px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundImage: `url(${title_bar})`,
          alignItems: 'center',
          padding: '0 10px',
          WebkitAppRegion: 'drag' // Makes the title bar draggable
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="no logo" width={25} height={25} />
          <Typography sx={{ ml: 1 }}>മുട്ട ടൈമർ</Typography>
        </Box>
        <div style={{ display: 'flex', gap: '5px', WebkitAppRegion: 'no-drag' }}>
          <IconButton onClick={handleMinimize}>
            <img src={minimizeIcon} alt="Minimize" style={{ width: '16px', height: '16px' }} />
          </IconButton>
          <IconButton onClick={handleClose}>
            <img src={closeIcon} alt="Close" style={{ width: '16px', height: '16px' }} />
          </IconButton>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '10px', height: '270px', width: '300px' }}>
        <h2>{!isRunning && !currentEgg ? 'CHOOSE YOUR EGG' : eggTypes[currentEgg]?.name || ''}</h2>
        <div>
          <h2>{formatTime(timeLeft)}</h2>
          {!isRunning && !currentEgg ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1, height: '200px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Tooltip title={eggTypes.ommelet.name}>
                  <img
                    src={eggTypes.ommelet.image}
                    alt="omelette"
                    onClick={() => startTimer('ommelet')}
                    disabled={isRunning}
                    style={{
                      marginTop: 2,
                      width: '80px',
                      height: '80px',
                      cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                  />
                </Tooltip>
                <Tooltip title={eggTypes.bullseye.name}>
                  <img
                    src={eggTypes.bullseye.image}
                    alt="bullseye"
                    onClick={() => startTimer('bullseye')}
                    disabled={isRunning}
                    style={{
                      width: '100px',
                      height: '100px',
                      cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                  />
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Tooltip title={eggTypes.boiledegg.name}>
                  <img
                    src={eggTypes.boiledegg.image}
                    alt="boiled"
                    onClick={() => startTimer('boiledegg')}
                    disabled={isRunning}
                    style={{
                      width: '100px',
                      height: '100px',
                      cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                  />
                </Tooltip>
                <Tooltip title={eggTypes.scrammbled.name}>
                  <img
                    src={eggTypes.scrammbled.image}
                    alt="scrambled"
                    onClick={() => startTimer('scrammbled')}
                    disabled={isRunning}
                    style={{
                      width: '100px',
                      height: '100px',
                      cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box sx={{}}>
              <img
                src={eggTypes[currentEgg]?.image || bullseyeIcon} // Fallback to bullseyeIcon if no egg selected
                alt={eggTypes[currentEgg]?.name || 'egg'}
                style={{
                  width: '200px',
                  height: '200px'
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={() => {
              console.log(hasStarted)
              hasStarted ? stopTimer() : ''
            }}
          >
            <img src={pauseIcon} alt="Pause/Continue" style={{ width: '100px', height: '32px' }} />
          </IconButton>
          <IconButton onClick={resetTimer}>
            <img src={resetIcon} alt="Reset" style={{ width: '100px', height: '32px' }} />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default App
