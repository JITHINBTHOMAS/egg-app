import React, { useState, useEffect } from 'react'
import { Box, IconButton, Modal, Tooltip, Typography, TextField, Button } from '@mui/material'
import bullseyeIcon from './assets/icons/bullseye.png'
import boiled from './assets/icons/boiled2.png'
import omeletteIcon from './assets/icons/omelette.png'
import scrambledIcon from './assets/icons/scrambled.png'
import closeIcon from './assets/icons/close_button.png'
import minimizeIcon from './assets/icons/minimize_button.png'
import settingsIcon from './assets/icons/settings.png'
import title_bar from './assets/icons/title_bar.png'
import pauseIcon from './assets/icons/pause_continue_button.png'
import resetIcon from './assets/icons/reset_button.png'
import logo from '../../../resources/egg-app-logo.png?asset'
import eggAppBackground from './assets/icons/egg-app-background.png'

function App() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentEgg, setCurrentEgg] = useState('')
  const [open, setOpen] = useState(false)
  const [eggTimes, setEggTimes] = useState({
    ommelet: 10,
    bullseye: 200,
    boiledegg: 300,
    scrammbled: 400
  })
  const eggTypes = {
    ommelet: { time: eggTimes.ommelet, name: 'Omelette', image: omeletteIcon },
    bullseye: { time: eggTimes.bullseye, name: 'Bullseye', image: bullseyeIcon },
    boiledegg: { time: eggTimes.boiledegg, name: 'Boiled Egg', image: boiled },
    scrammbled: { time: eggTimes.scrammbled, name: 'Scrambled', image: scrambledIcon }
  }

  const handleMinimize = () => window.electron.minimize()
  const handleClose = () => window.electron.close()
  const handleSettingsOpen = () => setOpen(true)
  const handleSettingsClose = () => setOpen(false)

  const startTimer = (type) => {
    setTimeLeft(eggTypes[type].time)
    setCurrentEgg(type)
    setIsRunning(true)
    setHasStarted(true)
  }

  const stopTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(0)
    setIsRunning(false)
    setCurrentEgg('')
    setHasStarted(false)
  }

  const handleTimeChange = (type, value) => {
    setEggTimes((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0 // Ensure integer, default to 0 if invalid
    }))
  }

  const applyChanges = () => {
    // No additional state update needed since eggTimes is already updated
    handleSettingsClose()
  }

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      alert('Egg timer done!')
      setIsRunning(false)
      setCurrentEgg('')
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

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
          WebkitAppRegion: 'drag'
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
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', mb: 2 }}>
          <h2>
            {!isRunning && !currentEgg ? 'CHOOSE YOUR EGG' : eggTypes[currentEgg]?.name || ''}
          </h2>
          {!hasStarted && (
            <IconButton hidden={hasStarted} onClick={handleSettingsOpen} sx={{ ml: 1 }}>
              <img src={settingsIcon} alt="Settings" style={{ width: '25px', height: '25px' }} />
            </IconButton>
          )}
        </Box>
        <div>
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
              <h1>{formatTime(timeLeft)}</h1>
              <img
                src={eggTypes[currentEgg]?.image || bullseyeIcon}
                alt={eggTypes[currentEgg]?.name || 'egg'}
                style={{
                  width: '170px',
                  height: '170px'
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={() => {
              console.log(hasStarted)
              if (hasStarted) stopTimer()
            }}
          >
            <img src={pauseIcon} alt="Pause/Continue" style={{ width: '100px', height: '32px' }} />
          </IconButton>
          <IconButton onClick={resetTimer}>
            <img src={resetIcon} alt="Reset" style={{ width: '100px', height: '32px' }} />
          </IconButton>
        </div>
      </div>
      <Modal open={open} onClose={handleSettingsClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280, // Slightly smaller than 300px window width
            height: 360, // Slightly smaller than 400px window height
            bgcolor: 'background.paper',
            backgroundImage: `url(${eggAppBackground})`, // Fixed: Use template literal
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            color: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: 'inherit', textAlign: 'center', flexGrow: 1 }}
            >
              Settings
            </Typography>
            <IconButton onClick={handleSettingsClose} sx={{ p: 0 }}>
              <img src={closeIcon} alt="Close" style={{ width: '16px', height: '16px' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField
              label={eggTypes.ommelet.name}
              type="number"
              value={eggTimes.ommelet}
              onChange={(e) => handleTimeChange('ommelet', e.target.value)}
              variant="outlined"
              size="small"
              sx={{ input: { color: '#000' } }}
            />
            <TextField
              label={eggTypes.bullseye.name}
              type="number"
              value={eggTimes.bullseye}
              onChange={(e) => handleTimeChange('bullseye', e.target.value)}
              variant="outlined"
              size="small"
              sx={{ input: { color: '#000' } }}
            />
            <TextField
              label={eggTypes.boiledegg.name}
              type="number"
              value={eggTimes.boiledegg}
              onChange={(e) => handleTimeChange('boiledegg', e.target.value)}
              variant="outlined"
              size="small"
              sx={{ input: { color: '#000' } }}
            />
            <TextField
              label={eggTypes.scrammbled.name}
              type="number"
              value={eggTimes.scrammbled}
              onChange={(e) => handleTimeChange('scrammbled', e.target.value)}
              variant="outlined"
              size="small"
              sx={{ input: { color: '#000' } }}
            />
          </Box>
          <Button variant="contained" onClick={applyChanges} sx={{ mt: 2 }}>
            Apply
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default App
