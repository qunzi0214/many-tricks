const curry = (fn, length) => {
  const limit = length || fn.length
  const caller = (fn, ...arg1) => (...arg2) => fn(...arg1, ...arg2)
  return (...arg) => arg.length >= limit
    ? fn(...arg)
    : curry(caller(fn, ...arg), limit - arg.length)
}

const fn = curry(function (a, b, c) {
  return [a, b, c]
})

fn('a', 'b', 'c') // ["a", "b", "c"]
fn('a', 'b')('c') // ["a", "b", "c"]
fn('a')('b')('c') // ["a", "b", "c"]
fn('a')('b', 'c') // ["a", "b", "c"]
