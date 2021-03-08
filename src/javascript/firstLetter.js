const lowerCaseFirst = ([first, ...rest]) => first.toLowerCase() + rest.join('')

const upperCaseFirst = ([first, ...rest]) => first.toUpperCase() + rest.join('')

console.log(lowerCaseFirst('Foobar')) // foobar

console.log(upperCaseFirst('foobar')) // Foobar
