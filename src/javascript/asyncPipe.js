const asyncPipe = (...fns) => (arg) => fns.reduce((accumulator, fn) => accumulator.then(fn), Promise.resolve(arg))

const mutiCompute = asyncPipe(
  x => x + 1,
  x => new Promise((resolve, reject) => setTimeout(() => {
    resolve(x * 5)
  }, 1000)),
  async x => (await x) + 2,
  x => x * 3,
);

(async () => {
  console.log(await mutiCompute(5))
})()

// 1s: 96
