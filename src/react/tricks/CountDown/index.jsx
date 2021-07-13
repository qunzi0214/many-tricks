import React, { useState, useEffect } from 'react'

function CountDown ({ hours = 0, minutes = 0, seconds = 0 }) {
  const [paused, setPaused] = useState(false)
  const [over, setOver] = useState(false)
  const [time, setTime] = useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  })

  const tick = () => {
    if (paused || over) return
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) setOver(true)
    else if (time.minutes === 0 && time.seconds === 0) {
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      })
    } else if (time.seconds === 0) {
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      })
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      })
    }
  }

  const reset = () => {
    setTime({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    })
    setPaused(false)
    setOver(false)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  return (
    <div>
      <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  )
}

export default {
  description: '倒计时组件',
  component: (
    <CountDown hours='1' minutes='45' />
  ),
}
