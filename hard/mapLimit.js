// Implement mapLimit, which is a utility function that produces a list of outputs
// by mapping each input through an asynchronous iteratee function.
// The provided limit dictates how many async operations can occur at once.

// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  console.log("task is started running ===>", id);
  setTimeout(() => {
    console.log("task is completed ===>", id);
    callback("User" + id);
  }, randomRequestTime);
}

// First Approach
function mapLimit(inputs, limit, iterateeFn, callback) {
  var result = [];
  var runningParrallelTask = 0;
  var queue = [];
  var totalValueResolvedCount = 0;
  for (let index = 0; index < inputs.length; index++) {
    queue.push({ index, task: inputs[index] });
    (function inner() {
      if (runningParrallelTask < limit) {
        const taskObj = queue.shift();
        if (taskObj) {
          runningParrallelTask++;
          var promise = new Promise((resolve) => {
            iterateeFn(taskObj.task, resolve);
          });
          promise.then((data) => {
            runningParrallelTask--;
            totalValueResolvedCount++;
            result[taskObj.index] = data;
            if (totalValueResolvedCount === inputs.length) {
              callback(result);
            } else {
              inner();
            }
          });
        }
      }
    })();
  }
}

// Second Approach
function mapLimit(inputs, limit, iterateeFn, callback) {
  // write your solution here
  let index = 0;
  let result = [];
  let count = 0;
  while (index < limit) {
    (function (i) {
      iterateeFn(inputs[index], function (data) {
        postCompletionCallback(i, data);
      });
    })(index);
    index++;
  }

  function postCompletionCallback(i, data) {
    result[i] = data;
    count++;

    if (count === inputs.length) {
      callback(result);
      return;
    } else if (index >= inputs.length || count > inputs.length) {
      return;
    }

    (function (i) {
      iterateeFn(inputs[index], function (data) {
        postCompletionCallback(i, data);
      });
    })(index);
    index++;
  }
}

mapLimit([1, 2, 3, 4, 5], 5, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

mapLimit([1, 2, 3, 4, 5], 1, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

mapLimit([1, 2, 3, 4, 5], 3, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
