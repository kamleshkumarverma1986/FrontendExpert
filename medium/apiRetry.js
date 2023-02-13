/*
    Hit the API if it's get failed then retries
    calling it N times with some delay.
*/

async function delayFunc(sec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
}

function retry(asyncFn, retries, delay, finalError = "Failed") {
  return new Promise((resolve, reject) => {
    asyncFn()
      .then(resolve)
      .catch(async () => {
        await delayFunc(delay);
        if (retries > 1) {
          return retry(asyncFn, retries - 1, delay, finalError)
            .then(resolve)
            .catch(() => {
              reject(finalError);
            });
        } else {
          reject(finalError);
        }
      });
  });
}

async function asyncFn() {
  const response = await fetch("https://www.google.com/dsdsadda");
  return response.json();
}

retry(asyncFn, 3, 5, "Failed")
  .then((data) => {
    console.log("resolved ", data);
  })
  .catch((error) => {
    console.log("error ", error);
  });
