/*
    Problem Statement -
        Create a pausable auto incrementor in JavaScript, which takes an
        initial value and steps as input and increments the initial value with
        given steps every second. The incrementer can be paused and resumed
        back.
*/

function timer(init, step) {
  var currentValue = init;
  var intervalTimer;
  function startInterval() {
    intervalTimer = setInterval(() => {
      console.log(currentValue);
      currentValue = currentValue + step;
    }, 1000);
  }
  return {
    startTimer: function () {
      startInterval();
    },

    stopTimer: function () {
      clearInterval(intervalTimer);
    },
  };
}

const timerObj = timer(10, 10);

timerObj.startTimer();

setTimeout(() => {
  timerObj.stopTimer();
}, 5000);

setTimeout(() => {
  timerObj.startTimer();
}, 8000);

/*
  Output:
      10
      20
      30
      40
  
      .....
  
      50
      60
      ...
  */
