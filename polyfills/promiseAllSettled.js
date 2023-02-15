/*
    Implement the Promise.allSettled()
*/
// Promise.allSettled => does not short-circuit

Promise.myAllSettled = function (promises) {
  if (!Array.isArray(promises) || !promises.length) return Promise.resolve([]);

  return new Promise((resolve) => {
    var result = [];
    var settledPromiseCount = 0;
    promises.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((resolvedData) => {
          result[index] = { status: "fulfilled", value: resolvedData };
        })
        .catch((error) => {
          result[index] = { status: "rejected", reason: new Error(error) };
        })
        .finally(() => {
          // always run
          settledPromiseCount++;
          if (settledPromiseCount === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result))
);
