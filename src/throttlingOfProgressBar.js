/*
  Question: 

  Start the progress bar on the button click
  and also handle the throttling. means how many progress bars
  can be run at once, that should be limit.

  [Without using setTimeout]

*/

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
  width: 0%;
  animation-name: fillbar;
  width: 100%;
}
*/

const divRootElement = document.querySelector("#root"); // Assume that we have root div in html
const button = document.querySelector("#button"); // Assume that we have button in html

var throttlingLimit = 3; // Max progress-bar counts that can run in once
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

function createProgressBar(timeToCompleteInSec) {
  const progressBar = document.createElement("div");
  progressBar.classList.add("progressbar");
  progressBar.style.animationDuration = `${timeToCompleteInSec}s`;

  const container = document.createElement("div");
  container.classList.add("container");
  container.appendChild(progressBar);

  return { container, progressBar };
}

button.addEventListener("click", () => {
  const data = createProgressBar(8);
  queue.push(data);

  if (queue.length && runningProgressBarCount < throttlingLimit) {
    runProgressBar(queue.pop());
  }
});
