/*

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)(4)(5)); // 15
console.log(curriedSum(1, 2)(3)(4)(5)); // 15
console.log(curriedSum(1, 2)(3)(4, 5)); // 15
console.log(curriedSum(1, 2, 3)(4)(5)); // 15
console.log(curriedSum(1, 2, 3)(4, 5)); // 15
console.log(curriedSum(1, 2, 3, 4)(5)); // 15
console.log(curriedSum(1, 2, 3, 4, 5)); // 15


Implement the above "curry" function ?

*/

function curry(callbackFunc) {
  const callbackFuncArgLength = callbackFunc.length;
  return function inner(...args) {
    if (args.length >= callbackFuncArgLength) {
      return args.reduce((a, b) => a + b);
    } else {
      return inner.bind(null, ...args);
    }
  };
}

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)(4)(5)); // 15
console.log(curriedSum(1, 2)(3)(4)(5)); // 15
console.log(curriedSum(1, 2)(3)(4, 5)); // 15
console.log(curriedSum(1, 2, 3)(4)(5)); // 15
console.log(curriedSum(1, 2, 3)(4, 5)); // 15
console.log(curriedSum(1, 2, 3, 4)(5)); // 15
console.log(curriedSum(1, 2, 3, 4, 5)); // 15
