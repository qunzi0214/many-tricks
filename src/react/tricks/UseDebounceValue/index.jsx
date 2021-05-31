import React, { useState, useEffect } from 'react'

const useDebounceValue = (value, wait) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    return () => {
      clearTimeout(timer)
    }
  }, [value, wait])

  return debouncedValue
}

const Counter = () => {
  const [value, setValue] = useState(0)
  const debouncedValue = useDebounceValue(value, 500)

  return (
    <div>
      <p>
        value: {value} - debouncedValue: {debouncedValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  )
}

export default {
  description: '定义一个自定义hooks，返回传入value的debounce版本',
  component: (
    <Counter />
  ),
}
