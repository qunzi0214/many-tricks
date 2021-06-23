const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key]
    acc[val] = acc[val] || []
    acc[val].push(key)
    return acc
  }, {})

invertKeyValues({ a: 1, b: 2, c: 1 }) // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value) // { group1: [ 'a', 'c' ], group2: [ 'b' ] }
