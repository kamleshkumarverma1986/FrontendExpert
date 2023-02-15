/*

  [Asked in Uber, Microsoft etc.]
   
*/
/*
  Question:

  Start the progress bar on the button click
  and also handle the throttling. means how many progress bars
  can be run at once, that should be limit.

*/

// First Approach [with setTimeout]

const divRootElement = document.querySelector("#root"); // Assume that we have root div in html
const button = document.querySelector("#button"); // Assume that we have button in html
var throttlingLimit = 3; // Max progress-bar's counts that can run in once.
var timeToCompleteProgressBarInSec = 5; // Time taken to complete one progress bar

(({
  button,
  divRootElement,
  throttlingLimit,
  timeToCompleteProgressBarInSec,
}) => {
  var queue = [];
  var runningProgressBarCount = 0;

  function runProgressBar({ container, progressBar }) {
    runningProgressBarCount++;
    divRootElement.appendChild(container);

    let percentComplete = 0;
    const intervalTimerId = setInterval(() => {
      percentComplete++;
      progressBar.style.width = `${percentComplete}%`;
      if (percentComplete === 100) {
        clearInterval(intervalTimerId);
        runningProgressBarCount--;
        if (queue.length && runningProgressBarCount < 3) {
          runProgressBar(queue.pop());
        }
      }
    }, (timeToCompleteProgressBarInSec * 1000) / 100);
  }

  function createProgressBar() {
    const container = document.createElement("div");
    container.style.backgroundColor = "gray";
    container.style.height = "50px";
    container.style.width = "500px";
    container.style.margin = "10px";

    const progressBar = document.createElement("div");
    progressBar.style.backgroundColor = "green";
    progressBar.style.height = "100%";
    progressBar.style.width = "0%";

    container.appendChild(progressBar);
    return { container, progressBar };
  }

  button.addEventListener("click", () => {
    const data = createProgressBar();
    queue.push(data);

    if (queue.length && runningProgressBarCount < throttlingLimit) {
      runProgressBar(queue.pop());
    }
  });
})({ button, divRootElement, throttlingLimit, timeToCompleteProgressBarInSec });

// Second Approach [Without setTimeout]

/*
  CSS ==>

@keyframes fillbar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.container {
  background-color: grey;
  height: 50px;
  width: 500px;
  margin: 10px;
}

.container .progressbar {
  background-color: green;
  height: 100%;
  width: 100%;
  animation-name: fillbar;
}
*/

(({
  button,
  divRootElement,
  throttlingLimit,
  timeToCompleteProgressBarInSec,
}) => {
  var queue = [];
  var runningProgressBarCount = 0;

  function runProgressBar({ container, progressBar }) {
    runningProgressBarCount++;
    divRootElement.appendChild(container);
    progressBar.addEventListener("animationend", function () {
      runningProgressBarCount--;
      if (queue.length && runningProgressBarCount < 3) {
        runProgressBar(queue.pop());
      }
    });
  }

  function createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.classList.add("progressbar");
    progressBar.style.animationDuration = `${timeToCompleteProgressBarInSec}s`;

    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(progressBar);

    return { container, progressBar };
  }

  button.addEventListener("click", () => {
    const data = createProgressBar();
    queue.push(data);

    if (queue.length && runningProgressBarCount < throttlingLimit) {
      runProgressBar(queue.pop());
    }
  });
})({ button, divRootElement, throttlingLimit, timeToCompleteProgressBarInSec });
