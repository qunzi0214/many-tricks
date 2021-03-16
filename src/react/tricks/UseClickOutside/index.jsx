import React, { useRef, useEffect } from 'react'

const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
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
  useClickOutside(clickRef, () => window.alert('点击事件在组件外'))
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
  description: '通过自定义hooks定义一个全局的点击事件，只有点击组件区域外，事件才会触发',
  component: (
    <ClickBox />
  ),
}
