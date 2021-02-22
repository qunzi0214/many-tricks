// 返回一个从右至左依次调用参数的函数
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
multiplyAndAdd5(5, 2) // 15
