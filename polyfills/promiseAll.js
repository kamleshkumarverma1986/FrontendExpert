// Promise.all => 	short-circuits as soon as when an any input promise is rejected

// My implementation:
Promise.myAll = function (promises) {
  if (!Array.isArray(promises) || !promises.length) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    var result = [];
    var resolvedPromiseCount = 0;
    promises.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        // dummy promise with resolved for unpromise items (example: 1, "2", etc)
        promise = Promise.resolve(promise);
      }
      promise
        .then((resolvedData) => {
          result[index] = resolvedData;
          resolvedPromiseCount++;
          if (resolvedPromiseCount === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const allPromises = [
  Promise.resolve(100),
  new Promise((resolve) => {
    setTimeout(resolve, 5000, 200);
  }),
  new Promise((resolve) => {
    setTimeout(resolve, 1000, 300);
  }),
];

const allPromisesWithOneReject = [
  Promise.resolve(100),
  new Promise((_, reject) => {
    setTimeout(reject, 5000, 200);
  }),
  new Promise((resolve) => {
    setTimeout(resolve, 1000, 300);
  }),
];

const allPromisesWithAnImmediateReject = [
  Promise.reject(100),
  new Promise((resolve) => {
    setTimeout(resolve, 5000, 200);
  }),
  new Promise((resolve) => {
    setTimeout(resolve, 1000, 300);
  }),
];

const allPromisesWithMultipleReject = [
  Promise.resolve(100),
  new Promise((_, reject) => {
    setTimeout(reject, 5000, 200);
  }),
  new Promise((_, reject) => {
    setTimeout(reject, 1000, 300);
  }),
];

const allPromisesWithAllReject = [
  Promise.reject(100),
  new Promise((_, reject) => {
    setTimeout(reject, 5000, 200);
  }),
  new Promise((_, reject) => {
    setTimeout(reject, 1000, 300);
  }),
];

Promise.myAll(allPromises).then((result) => {
  console.log("resolved ", result);
});

Promise.myAll(allPromisesWithOneReject)
  .then((result) => {
    console.log("resolved ", result);
  })
  .catch((error) => {
    console.log("rejected ", error);
  });

Promise.myAll(allPromisesWithAnImmediateReject)
  .then((result) => {
    console.log("resolved ", result);
  })
  .catch((error) => {
    console.log("rejected ", error);
  });

Promise.myAll(allPromisesWithMultipleReject)
  .then((result) => {
    console.log("resolved ", result);
  })
  .catch((error) => {
    console.log("rejected ", error);
  });

Promise.myAll(allPromisesWithAllReject)
  .then((result) => {
    console.log("resolved ", result);
  })
  .catch((error) => {
    console.log("rejected ", error);
  });
