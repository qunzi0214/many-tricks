import React, { useReducer } from 'react'

const useAsync = fn => {
  const initialState = { loading: false, error: null, value: null }
  const stateReducer = (_, action) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null }
      case 'finish':
        return { loading: false, error: null, value: action.value }
      case 'error':
        return { loading: false, error: action.error, value: null }
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const run = async (args = null) => {
    try {
      dispatch({ type: 'start' })
      const value = await fn(args)
      dispatch({ type: 'finish', value })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return { ...state, run }
}

const RandomImage = () => {
  const imgFetch = useAsync(url => window.fetch(url).then(response => response.json()))

  return (
    <div>
      <button onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')} disabled={imgFetch.isLoading}>
        Load image
      </button>
      <br />
      {imgFetch.loading && <div>Loading...</div>}
      {imgFetch.error && <div>Error {imgFetch.error}</div>}
      {imgFetch.value && <img src={imgFetch.value.message} alt='avatar' width={400} height='auto' />}
    </div>
  )
}

export default {
  description: '一个自定义hooks，可以处理异步逻辑',
  component: (
    <RandomImage />
  ),
}
