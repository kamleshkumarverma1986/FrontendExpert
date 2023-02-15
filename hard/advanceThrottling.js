/*
  Implement the throttling
*/

const input = document.querySelector("#input"); // Assume that we have input in HTML

input.addEventListener(
  "input",
  advancedThrottle(function (e) {
    console.log("value ", e.target.value);
  }, 3000)
);

// Basic throttling [By Default: { leading: true, trailing: true }]
function throttle(func, wait) {
  /*

    ALGO ====>

    A. When return function get called:
        1 - If not cooling, run the callback (func) function, start timer (startCooling).
        2 - If cooling, swallow all the subsequent calls, and keep the track the last one.

    B. When time is up. (Cooling done)
        1 - reset cooling (timer = null)
        2 - if there is any swallow calls, then call it. and again start timer (startCooling). 

  */
  let timer = null; // if timer is null, call the callback (func) function.
  let swallow = null; // will store the last swallow call

  function timeoutCallback() {
    timer = null; // It will tell you whether cooling is running or not.
    // [timer=null] means=> no cooling... cooling is done.
    if (swallow) {
      // If there is any swallowed call, call it
      func.apply(swallow[0], swallow[1]);
      swallow = null;
      startCooling(); // again do the same process.
    }
  }

  function startCooling() {
    timer = setTimeout(timeoutCallback, wait);
  }

  return function (...args) {
    if (timer) {
      // means cooling period is still running
      swallow = [this, args];
      return;
    }
    func.apply(this, args);
    startCooling();
  };
}

// Advanced throttling with option { leading: true, trailing: true }
function advancedThrottle(
  func,
  wait,
  option = { leading: true, trailing: true }
) {
  let timer = null; // if timer is null, call the callback (func) function.
  let swallow = null; // will store the last swallow call

  function later() {
    timer = null; // It will tell you whether cooling is running or not.
    // [timer=null] means=> no cooling... cooling is done.
    if (option.trailing && swallow) {
      // If there is any swallowed call, call it
      func.apply(swallow[0], swallow[1]);
      swallow = null;
      startCooling(); // again do the same process.
    }
  }

  function startCooling() {
    timer = setTimeout(later, wait);
  }

  return function (...args) {
    if (timer) {
      // means cooling period is still running
      swallow = [this, args];
      return;
    }

    if (option.leading) {
      func.apply(this, args);
    } else {
      swallow = [this, args];
    }

    startCooling();
  };
}
