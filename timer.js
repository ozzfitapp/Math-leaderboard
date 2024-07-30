document.addEventListener("DOMContentLoaded", function () {
  const circle = document.querySelector(".ring");
  const timeDisplay = document.querySelector(".time-display");
  const inputMinutes = document.getElementById("inputMinutes");
  const inputSeconds = document.getElementById("inputSeconds");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");

  let radius = circle.r.baseVal.value;
  let circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = 0; // Start with full circle

  let timerInterval;
  let timeInSeconds = 0;
  let totalTimeInSeconds = 0;
  let isPaused = false;
  let timerRunning = false; // Track if timer is currently running

  function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
    timeDisplay.textContent = display;
  }

  function setProgress(percent) {
    const offset = (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function startTimer() {
    const minutes = parseInt(inputMinutes.value) || 0;
    const seconds = parseInt(inputSeconds.value) || 0;
    totalTimeInSeconds = minutes * 60 + seconds;
    timeInSeconds = totalTimeInSeconds;
    updateTimerDisplay(timeInSeconds);
    setProgress(0);

    timerInterval = setInterval(() => {
      if (!isPaused) {
        timeInSeconds--;
        updateTimerDisplay(timeInSeconds);
        const percentComplete =
          ((totalTimeInSeconds - timeInSeconds) / totalTimeInSeconds) * 100;
        setProgress(percentComplete);
      }

      if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        console.log("Timer completed!");
        timerRunning = false;
        startBtn.textContent = "Start";
        restartBtn.disabled = true;
      }
    }, 1000);

    timerRunning = true;
    startBtn.textContent = "Pause";
    restartBtn.disabled = false;
  }

  function pauseTimer() {
    isPaused = true;
    startBtn.textContent = "Resume";
  }

  function resumeTimer() {
    isPaused = false;
    startBtn.textContent = "Pause";
  }

  function restartTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    timerRunning = false;
    inputMinutes.disabled = false;
    inputSeconds.disabled = false;
    startBtn.textContent = "Start";
    restartBtn.disabled = true;
    updateTimerDisplay(0);
    setProgress(0);
  }

  startBtn.addEventListener("click", function () {
    if (timerRunning) {
      if (isPaused) {
        resumeTimer();
      } else {
        pauseTimer();
      }
    } else {
      startTimer();
    }
  });

  restartBtn.addEventListener("click", restartTimer);
});
