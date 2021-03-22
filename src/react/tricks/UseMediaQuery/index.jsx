import React, { useState, useEffect } from 'react'

const useMediaQuery = (query) => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false

  const mediaQuery = window.matchMedia(query)
  const [match, setMatch] = useState(mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(mediaQuery.matches)
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  return match
}

const ResponsiveText = () => {
  const media = useMediaQuery('(max-width: 1000px)')

  return (
    <span>
      媒体查询条件：'(max-width: 1000px)'
      <br />
      {media ? '匹配到媒体查询条件' : '没有匹配到媒体查询条件'}
    </span>
  )
}

export default {
  description: '定义一个媒体查询hooks',
  component: (
    <ResponsiveText />
  ),
}
