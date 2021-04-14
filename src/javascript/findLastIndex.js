const findLastIndex = (arr, fn) =>
  (arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop() || [-1])[0]

findLastIndex([1, 2, 3, 4], n => n % 2 === 1) // 2
findLastIndex([1, 2, 3, 4], n => n === 5) // -1
