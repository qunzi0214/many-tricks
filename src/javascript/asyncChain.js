const asyncChain = fns => {
  const limit = fns.length
  let index = 0
  const next = () => {
    index === limit - 1
      ? fns[index++]()
      : fns[index++](next)
  }
  next()
}

asyncChain([
  next => {
    console.log('0 seconds')
    setTimeout(next, 1000)
  },
  next => {
    console.log('1 second')
    setTimeout(next, 1000)
  },
  () => {
    console.log('2 second')
  },
])
