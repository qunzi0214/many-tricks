// 限制并发数量的异步队列

const asyncLimitationQueue = (arr, limit) => {
  const shift = () => {
    if (arr.length === 0) return
    const promise = arr.shift()()
    promise.finally(shift)
    return promise
  }

  while (limit-- > 0 && arr.length > 0) {
    shift()
  }
}

const delay = (d, m) => new Promise((resolve, reject) => setTimeout(() => {
  console.log(m)
  resolve()
}, d))

asyncLimitationQueue([
  () => delay(1000, 'step1'),
  () => delay(2000, 'step2'),
  () => delay(3000, 'step3'),
  () => delay(3000, 'step4'),
  () => delay(3000, 'step5'),
  () => delay(3000, 'step6'),
  () => delay(3000, 'step7'),
  () => delay(3000, 'step8'),
  () => delay(3000, 'step9'),
], 3)

// 1s: step1
// 2s: step2
// 3s: step3
// 4s: step4
// 5s: step5
// 6s: step6
// 7s: step7
// 8s: step8
// 9s: step9
