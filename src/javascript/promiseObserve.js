// 注册promise决议回调函数
// 在Promise.race Promise.all中可以监测到被忽略的promise

if (!Promise.observe) {
  Promise.observe = (promise, callback) => {
    promise.then(
      value => {
        Promise.resolve(value).then(callback)
      },
      error => {
        Promise.resolve(error).then(callback)
      },
    )
    return promise
  }
}

Promise.race([
  Promise.observe(
    new Promise((resolve, reject) => setTimeout(() => {
      resolve('async job is finish')
    }, 3000)),
    v => console.log(v),
  ),
  new Promise((resolve, reject) => setTimeout(() => {
    reject(new Error('reject! timeout'))
  }, 2000)), // 任务超时限制
])

// 2s: VM113:26 Uncaught (in promise) Error: reject! timeout
// 3s: async job is finish
