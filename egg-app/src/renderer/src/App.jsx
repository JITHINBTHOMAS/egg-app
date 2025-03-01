import React, { useState, useEffect, useRef } from 'react'
import { Box, IconButton, Modal, Tooltip, Typography, TextField, Button } from '@mui/material'
import '@fontsource/press-start-2p' // Import the pixel font
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
import timerRunAudio from './assets/audio/timer_run.mp3'
import timerStopAudio from './assets/audio/timer_stop.mp3'

function App() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentEgg, setCurrentEgg] = useState('')
  const [openSettings, setOpenSettings] = useState(false)
  const [openDoneModal, setOpenDoneModal] = useState(false)
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

  const timerRunRef = useRef(new Audio(timerRunAudio))
  const timerStopRef = useRef(new Audio(timerStopAudio))

  const handleMinimize = () => window.electron.minimize()
  const handleClose = () => window.electron.close()
  const handleSettingsOpen = () => setOpenSettings(true)
  const handleSettingsClose = () => setOpenSettings(false)

  const handleDoneModalClose = () => {
    setHasStarted(false)
    setIsRunning(false)
    setOpenDoneModal(false)
    timerStopRef.current.pause()
    timerStopRef.current.currentTime = 0
  }

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
    timerRunRef.current.pause()
    timerRunRef.current.currentTime = 0
    timerStopRef.current.pause()
    timerStopRef.current.currentTime = 0
  }

  const handleTimeChange = (type, value) => {
    setEggTimes((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0
    }))
  }

  const applyChanges = () => {
    handleSettingsClose()
  }

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      timerRunRef.current.loop = true
      timerRunRef.current.play().catch((error) => console.error('Audio play error:', error))
      timerStopRef.current.pause()
    } else if (timeLeft === 0 && isRunning) {
      timerRunRef.current.pause()
      timerRunRef.current.currentTime = 0
      timerStopRef.current.loop = true
      timerStopRef.current.play().catch((error) => console.error('Audio play error:', error))
      setIsRunning(false)
      setCurrentEgg('')
      setOpenDoneModal(true)
    } else {
      timerRunRef.current.pause()
    }
    return () => {
      clearInterval(interval)
    }
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
          <Typography
            sx={{ mt: 1, ml: 1, fontFamily: "'Press Start 2P', cursive", fontSize: '13px' }}
          >
            Yolk-o-Clock
          </Typography>
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px' }}
          >
            {!isRunning && !currentEgg ? 'CHOOSE YOUR EGG' : eggTypes[currentEgg]?.name || ''}
          </Typography>
          {!hasStarted && (
            <IconButton onClick={handleSettingsOpen} sx={{ ml: 1 }}>
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
              <Typography
                variant="h1"
                sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '24px' }}
              >
                {formatTime(timeLeft)}
              </Typography>
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
      <Modal open={openSettings} onClose={handleSettingsClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            height: 360,
            bgcolor: 'background.paper',
            backgroundImage: `url(${eggAppBackground})`,
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
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '16px',
                textAlign: 'center',
                flexGrow: 1
              }}
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
              sx={{
                '& .MuiInputLabel-root, & .MuiInputBase-input': {
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '12px',
                  color: '#000'
                }
              }}
            />
            <TextField
              label={eggTypes.bullseye.name}
              type="number"
              value={eggTimes.bullseye}
              onChange={(e) => handleTimeChange('bullseye', e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiInputLabel-root, & .MuiInputBase-input': {
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '12px',
                  color: '#000'
                }
              }}
            />
            <TextField
              label={eggTypes.boiledegg.name}
              type="number"
              value={eggTimes.boiledegg}
              onChange={(e) => handleTimeChange('boiledegg', e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiInputLabel-root, & .MuiInputBase-input': {
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '12px',
                  color: '#000'
                }
              }}
            />
            <TextField
              label={eggTypes.scrammbled.name}
              type="number"
              value={eggTimes.scrammbled}
              onChange={(e) => handleTimeChange('scrammbled', e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiInputLabel-root, & .MuiInputBase-input': {
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '12px',
                  color: '#000'
                }
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={applyChanges}
            sx={{ mt: 2, fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            Apply
          </Button>
        </Box>
      </Modal>
      <Modal open={openDoneModal} onClose={handleDoneModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 250,
            bgcolor: 'background.paper',
            backgroundImage: `url(${eggAppBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            color: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '16px', textAlign: 'center' }}
          >
            Your Egg is Ready!
          </Typography>
          <Button
            variant="contained"
            onClick={handleDoneModalClose}
            sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default App
