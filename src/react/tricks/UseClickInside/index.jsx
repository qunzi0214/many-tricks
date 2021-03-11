import React, { useRef, useEffect } from 'react'

const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback()
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
  useClickInside(clickRef, () => window.alert('click'))
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
  description: '实现一个点击后有波纹样式的按钮',
  component: (
    <ClickBox />
  ),
}
