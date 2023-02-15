/*

    Implement Promise.race()

*/
// short-circuits when an any input promise is settled (resolved or rejected)
// Remember: It will return only one promise

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((resolvedData) => {
          resolve(resolvedData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// First test case
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.myRace([promise1, promise2]).then((value) => {
  console.log("resolved", value);
  // Both resolve, but promise2 is faster
});

// Second test case
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "two");
});

Promise.myRace([promise3, promise4])
  .then((value) => {
    console.log("resolved", value);
  })
  .catch((error) => {
    console.log("rejected with error ", error);
  });
