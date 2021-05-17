import React, { useState, useEffect } from 'react'

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await window.fetch(url, options)
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])

  return { response, error }
}

const ImageFetch = props => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {})
  if (!res.response) {
    return <div>Loading...</div>
  }
  const imageUrl = res.response.message
  return (
    <div>
      <img src={imageUrl} alt='avatar' width={400} height='auto' />
    </div>
  )
}

export default {
  description: '定义一个自定义hooks，通过fetch api来调用接口，返回一个包含相应对象和错误对象的state',
  component: (
    <ImageFetch />
  ),
}
