/*
    Promise.any() implementation
*/

// Promise.any =>	short-circuits when an any input promise is fulfilled
// if all promise is get rejected then return the AggregateError

Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    var errors = [];
    var rejectedPromiseCount = 0;
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          rejectedPromiseCount++;
          errors[index] = error;
          if (rejectedPromiseCount === promises.length) {
            reject(new AggregateError("All promises were rejected", errors));
          }
        });
    });
  });
};

// First usecase
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

Promise.any([promise1, promise2, promise3]).then((value) => console.log(value));

// Second usecase (if all rejected)
const promise4 = Promise.reject(0);
const promise5 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "quick")
);

Promise.any([promise4, promise5])
  .then((value) => console.log(value))
  .catch((error) => {
    console.log(error);
  });
