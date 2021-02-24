// 模拟Promise.all

const all = (arr) => new Promise((resolve, reject) => {
  const res = []
  let count = 0
  arr.forEach((promise, index) => {
    promise.then(
      v => {
        res[index] = v
        if (++count === arr.length) resolve(res)
      },
      reject,
    )
  })
})

const delay = (d, m) => new Promise((resolve, reject) => setTimeout(() => {
  console.log(m)
  resolve(m)
}, d))

all([
  delay(3000, '1'),
  delay(6000, '2'),
  delay(5000, '3'),
  delay(1000, '4'),
  delay(2000, '5'),
  delay(4000, '6'),
])
  .then(v => console.log(v))

// 1s: 4
// 2s: 5
// 3s: 1
// 4s: 6
// 5s: 3
// 6s: 2
// 6s: ["1", "2", "3", "4", "5", "6"]
