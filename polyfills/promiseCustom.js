// Custom Promise
// WARNING: This is not the full functional polyfill
// This will just cover the happy path of promise

class MyPromise {
  constructor(callback) {
    this.promiseState = "pending";
    this.promiseResult = null;
    this.thenCallbacks = [];
    callback(this.resolve, this.reject);
  }

  callAllThenCallbacks = () => {
    // Executing all then's callbacks one by one
    let currentCallback = this.thenCallbacks.shift();
    while (currentCallback) {
      this.promiseResult = currentCallback(this.promiseResult);
      currentCallback = this.thenCallbacks.shift();
    }
  };

  resolve = (resolvedData) => {
    this.promiseState = "fulfilled";
    this.promiseResult = resolvedData;
    this.callAllThenCallbacks();
  };

  then = (callback) => {
    if (this.promiseState === "pending") {
      this.thenCallbacks.push(callback);
    } else if (this.promiseState === "fulfilled") {
      this.promiseResult = callback(this.promiseResult);
    }
    return this;
  };

  reject = (rejectedData) => {
    this.promiseState = "rejected";
    this.promiseResult = rejectedData;

    if (this.errorCallback) {
      this.errorCallback(this.promiseResult);
    }
  };

  catch = (errorCallback) => {
    if (this.promiseState === "pending") {
      this.errorCallback = errorCallback; // will be called later
    } else if (this.promiseState === "rejected") {
      errorCallback(this.promiseResult);
    }

    return this;
  };
}

// async promise
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random() * 10;
    if (random > 5) {
      resolve(100);
    } else {
      reject("error");
    }
  }, 1000);
});

promise
  .then((data) => {
    console.log("1 => ", data);
    return data + 100;
  })
  .then((data) => {
    console.log("2 => ", data);
    return data + 100;
  })
  .then((data) => {
    console.log("3 => ", data);
  })
  .catch((error) => {
    console.log("catch => ", error);
  });

// right away resolved promise
const promise1 = new MyPromise((resolve, reject) => {
  const random = Math.random() * 10;
  if (random > 5) {
    resolve(1000);
  } else {
    reject("main error");
  }
})
  .then((data) => {
    console.log("1 => ", data);
    return data + 1000;
  })
  .then((data) => {
    console.log("2 => ", data);
    return data + 1000;
  })
  .then((data) => {
    console.log("3 => ", data);
  })
  .catch((rejectedData) => {
    console.log("rejectedData ", rejectedData);
  });
