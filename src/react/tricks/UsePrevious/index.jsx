import React, { useState, useEffect, useRef } from 'react'

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const Counter = () => {
  const [value, setValue] = useState(0)
  const lastValue = usePrevious(value)

  return (
    <div>
      <p>
        Current: {value} - Previous: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  )
}

export default {
  description: '定义一个自定义hooks，可以保存state上一次的值',
  component: (
    <Counter />
  ),
}
