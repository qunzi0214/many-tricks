const curry = (fn, length) => {
  const limit = length || fn.length
  const caller = (fn, ...arg) => (...newArg) => fn(...[...arg, ...newArg])

  return (...arg) => {
    if (arg.length < limit) {
      return curry(caller(fn, ...arg), limit - arg.length)
    } else {
      return fn(...arg)
    }
  }
}

const fn = curry(function (a, b, c) {
  return [a, b, c]
})

fn('a', 'b', 'c') // ["a", "b", "c"]
fn('a', 'b')('c') // ["a", "b", "c"]
fn('a')('b')('c') // ["a", "b", "c"]
fn('a')('b', 'c') // ["a", "b", "c"]
