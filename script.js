let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapArray = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.innerHTML = "Stop";
        startStopBtn.style.backgroundColor = "#f44336"; // Change button color to indicate stopping
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = "Start";
        startStopBtn.style.backgroundColor = "#4CAF50"; // Change button color to indicate starting
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    startStopBtn.style.backgroundColor = "#4CAF50"; // Reset button color to starting state
    running = false;
    difference = 0;
    lapArray = [];
    laps.innerHTML = "";
}

function recordLap() {
    if (running) {
        lapArray.push(display.innerHTML);
        displayLaps();
    }
}

function displayLaps() {
    laps.innerHTML = "";
    lapArray.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.innerHTML = `Lap ${index + 1}: ${lap}`;
        laps.appendChild(lapElement);
    });
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
