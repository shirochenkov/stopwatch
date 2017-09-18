class Stopwatch {
    constructor(parentNode) {
        this.step = 0;
        this.isRunning = false;

        this.render(parentNode);
    }

    get value() {
        return Math.floor(this.step/100);
    }

    render(parentNode) {
        let stopwatch = document.createElement("div");
        stopwatch.classList.add("stopwatch");
        parentNode.insertBefore(stopwatch, parentNode.firstChild);

        let stopwatchArrow = document.createElement("div");
        stopwatchArrow.classList.add("stopwatch__arrow");
        stopwatch.appendChild(stopwatchArrow);
        this.arrow = stopwatchArrow;

        let stopwatchCenter = document.createElement("div");
        stopwatchCenter.classList.add("stopwatch__center");
        stopwatch.appendChild(stopwatchCenter);
    }

    start() {
        if (this.isRunning) { return; }
        this.isRunning = true;

        this.interval = setInterval(() => {
            this.step += 1;
            this.moveArrow(this.step);
        }, 10);
    }

    moveArrow(sec) {
        let deg = 360 / 60;
        let arrowDeg = (deg / 100) * sec;

        this.arrow.style.transform = `rotate(${arrowDeg}deg)`;
    }

    pause() {
        clearInterval(this.interval);
        this.isRunning = false;
    }

    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.step = 0;
        this.moveArrow(this.step);
    }
}

let parentNode = document.getElementById("root");
let sw = new Stopwatch(parentNode);

var start = document.getElementById("start");
var pause = document.getElementById("pause");

start.addEventListener("click", (e) => {
    e.target.classList.add("stopwatch__btn_hide");
    pause.classList.remove("stopwatch__btn_hide");
    sw.start();
});

pause.addEventListener("click", (e) => {
    e.target.classList.add("stopwatch__btn_hide");
    start.classList.remove("stopwatch__btn_hide");
    sw.pause();
});

let stop = document.getElementById("stop");
stop.addEventListener("click", () => {
    if(start.classList.contains("stopwatch__btn_hide")) {
        start.classList.remove("stopwatch__btn_hide");
        pause.classList.add("stopwatch__btn_hide");
    }
    sw.stop();
});
