import React, { useRef, useEffect } from 'react'

const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback(e)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

const ClickBox = () => {
  const clickRef = useRef()
  useClickInside(clickRef, (e) => console.log(e))
  return (
    <div
      className='click-box'
      ref={clickRef}
      style={{
        border: '2px dashed orangered',
        height: 200,
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Click inside this element</p>
    </div>
  )
}

export default {
  description: '通过自定义hooks提取点击事件',
  component: (
    <ClickBox />
  ),
}
