/*

console.log(add(1)(2).value() == 3); // true
console.log(add(1, 2)(3).value() == 6); // true
console.log(add(1)(2)(3).value() == 6); // true
console.log(add(1)(2)(3)(10)(4).value() == 20); // true
console.log(add(1)(2)(3)(10)(4)(50)(30).value() == 100); // true
console.log(add(1)(2)(3)(10)(4)(50, 30).value() == 100); // true
console.log(add(1)(2)(3, 10, 4)(50, 30).value() == 100); // true
console.log(add(1)(2)(3, 10, 4)(50, 30)(200).value()); // 300
console.log(add(1)(2) + 3); // 6

Implement this "add" function.

*/

function add(...argsA) {
  var total = argsA.reduce((a, b) => a + b);
  function inner(...argsB) {
    total = total + argsB.reduce((a, b) => a + b);
    return inner;
  }

  inner.valueOf = inner.value = function () {
    return total;
  };

  return inner;
}

console.log(add(1)(2).value() == 3); // true
console.log(add(1, 2)(3).value() == 6); // true
console.log(add(1)(2)(3).value() == 6); // true
console.log(add(1)(2)(3)(10)(4).value() == 20); // true
console.log(add(1)(2)(3)(10)(4)(50)(30).value() == 100); // true
console.log(add(1)(2)(3)(10)(4)(50, 30).value() == 100); // true
console.log(add(1)(2)(3, 10, 4)(50, 30).value() == 100); // true
console.log(add(1)(2)(3, 10, 4)(50, 30)(200).value()); // 300
console.log(add(1)(2) + 3); // 6
