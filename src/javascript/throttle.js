const throttle = (fn, wait) => {
  let timer
  let lastTime = Date.now()
  return function (...args) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
      lastTime = Date.now()
    }, Math.max(wait - (Date.now() - lastTime), 0))
  }
}

setInterval(
  throttle(() => console.log(Date.now()), 1000),
  100,
)
