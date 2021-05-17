import React, { useState, useEffect, useRef } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const Timer = props => {
  const [seconds, setSeconds] = useState(0)
  useInterval(() => {
    setSeconds(seconds + 1)
  }, 1000)

  return <p>{seconds}</p>
}

export default {
  description: '定义一个自定义hooks，实现setInterval，销毁时自动注销',
  component: (
    <Timer />
  ),
}
