/*
  [Asked in FAANG (Facebook, Amazon, Apple, Netflix and Google ) companies]
  Debounce implementation:
*/

/*
Assume that we have these two button in HTML =>

    <button id="leading_button">Leading Click</button>
    <button id="trailing_button">Trailing Click</button>
*/

//usecase 1
let i = 0;
document.querySelector("#leading_button").addEventListener(
  "click",
  customAdvancedDebounce(
    function (event) {
      console.log("Leading ", ++i, event.target);
    },
    3000,
    (option = { leading: true, trailing: false })
  )
);

//usecase 2
let j = 0;
document.querySelector("#trailing_button").addEventListener(
  "click",
  customAdvancedDebounce(
    function (event) {
      console.log("Trailing ", ++j, event.target);
    },
    3000,
    (option = { leading: false, trailing: true })
  )
);

// Basic debounce [It's By Default: { leading: false, trailing: true }]
function debounce(func, wait) {
  var timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// With options: { leading: true, trailing: true }
/*
In short,
    If leading true -> Capture initial click before delay,
    if trailing true -> Capture latest click after a delay
*/
function customAdvancedDebounce(
  func,
  wait,
  option = { leading: false, trailing: true }
) {
  let timer; // for clearTimeout and also for shouldRun check
  let trailingArgs; // as we require last arguments for trailing

  if (!option.leading && !option.trailing) {
    return function () {
      return null;
    };
  } // if both false, return null

  return function (...args) {
    if (!timer && option.leading) {
      // timer done but leading true
      func.apply(this, args); //call func
    } else {
      trailingArgs = args; // arguments will be the last args
    }

    clearTimeout(timer); // clear timer for avoiding multiple timer instances

    timer = setTimeout(() => {
      if (option.trailing && trailingArgs) {
        // trailingArgs is present and trailing is true
        func.apply(this, trailingArgs);
        trailingArgs = null;
      }
      timer = null;
    }, wait);
  };
}
