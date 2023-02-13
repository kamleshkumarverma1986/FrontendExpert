/*
  Question: 

  Find the min and max value from stack
  in the constant time.

*/

class MinAndMaxStack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    if (!this.stack.length) {
      this.stack.push({ value, max: value, min: value });
    } else {
      const topItem = this.stack[this.stack.length - 1];
      const max = topItem.max < value ? value : topItem.max;
      const min = topItem.min > value ? value : topItem.min;
      this.stack.push({ value, max, min });
    }
  }

  pop() {
    return this.stack.pop();
  }

  getMinValue() {
    return this.stack[this.stack.length - 1].min;
  }

  getMaxValue() {
    return this.stack[this.stack.length - 1].max;
  }
}

const stack = new MinAndMaxStack();
stack.push(18);
stack.push(19);
stack.push(29);
stack.push(15);
stack.push(16);
console.log("getMinValue ", stack.getMinValue()); // 15
stack.pop();
console.log("getMinValue ", stack.getMinValue()); // 15
stack.pop();
console.log("getMinValue ", stack.getMinValue()); // 18

console.log("getMinValue ", stack.getMaxValue()); // 29
stack.pop();

console.log("getMinValue ", stack.getMinValue()); // 18
console.log("getMinValue ", stack.getMaxValue()); // 19
