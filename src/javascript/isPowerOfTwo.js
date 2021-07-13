const isPowerOfTwo = n => !!n && (n & (n - 1)) === 0

isPowerOfTwo(0) // false
isPowerOfTwo(1) // true
isPowerOfTwo(2) // true
isPowerOfTwo(3) // false
isPowerOfTwo(4) // true
isPowerOfTwo(8) // true
