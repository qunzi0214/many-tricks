import React, { useState, useEffect } from 'react'

import styles from './index.less'

function RippleButton ({ children, onClick }) {
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 1200)
    } else setIsRippling(false)
  }, [coords])

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  return (
    <button
      className={styles['ripple-button']}
      onClick={e => {
        const rect = e.target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setCoords({ x, y })
        onClick && onClick(e)
      }}
    >
      {isRippling
        ? <span
            className={styles.ripple}
            style={{
              left: coords.x + 10,
              top: coords.y,
            }}
          />

        : ''}
      <span className={styles.content}>{children}</span>
    </button>
  )
}

export default RippleButton
