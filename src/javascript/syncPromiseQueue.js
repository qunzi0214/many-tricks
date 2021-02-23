// 传入一个promise回调队列，依次同步执行

const syncPromiseQueue = (promiseFns) =>
  promiseFns
    .reduce((accumulator, fn) => accumulator.then(fn), Promise.resolve())

const delay = d => new Promise((resolve, reject) => setTimeout(() => {
  console.log(d)
  resolve()
}, d))
syncPromiseQueue([() => delay(1000), () => delay(2000), () => delay(3000)])

// 1s: 1000
// 3s: 2000
// 6s: 3000
