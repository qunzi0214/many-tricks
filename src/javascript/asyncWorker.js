// safari 控制台可测
// chrome 因为 CSP 会报错 https://medium.com/@krishnachirumamilla/content-security-policy-worker-src-cd06ecfa2fe8

const runAsync = fn => {
  const worker = new window.Worker(
    URL.createObjectURL(new window.Blob([`postMessage((${fn})());`], {
      type: 'application/javascript; charset=utf-8',
    })),
  )
  return new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      resolve(data)
      worker.terminate()
    }
    worker.onerror = err => {
      reject(err)
      worker.terminate()
    }
  })
}
const longRunningFunction = () => {
  let result = 0
  for (let i = 0; i < 1000; i++) for (let j = 0; j < 700; j++) for (let k = 0; k < 300; k++) result = result + i + j + k

  return result
}
/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log) // 209685000000
runAsync(() => 10 ** 3).then(console.log) // 1000
const outsideVariable = 50
runAsync(() => typeof outsideVariable).then(console.log) // 'undefined'
