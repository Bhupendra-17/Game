let x = document.getElementById('num1');
let y = document.getElementById('num2');
let inputNum = document.getElementById('myNum');

let a = getRandomInt(1, 100);
let b = getRandomInt(1, 100);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disp(a, b) {
    x.textContent = a;
    y.textContent = b;
    return a + b; // Return the sum of a and b
}

let c = disp(a, b);
let score = 0;
let fscore = document.getElementById('fscore');
let flag = 0;

function dispScore() {
    score += 10; // Update the global score variable
    flag = 1;
    fscore.textContent = score;
    let scoretext = score.toString().padStart(3, "0");
    document.getElementById('score').textContent = scoretext;
}

window.onload = function () {
    inputNum.focus();
    startTimer(); // Start the inactivity timer when the page loads
};

let inactivityTimer;

function startTimer() {
    inactivityTimer = setTimeout(stopPlay, 7000); // Stop game after 6.5 seconds of inactivity
}

function resetTimer() {
    clearTimeout(inactivityTimer); // Clear the current timer
    startTimer(); // Restart the timer
}

inputNum.addEventListener("keypress", function check(event) {
    if (event.key === "Enter") {
        let ans = parseInt(inputNum.value); // Get the value from input and convert to number
        if (ans === c) {
            dispScore();
            refresh();
            a = getRandomInt(1, 100);
            b = getRandomInt(1, 100);
            c = disp(a, b);
        } else if (ans !== c) {
            stopPlay();
        }
        resetTimer(); // Reset the timer on input
    }
});

function stopPlay() {
    cont.classList.remove("animate-motion");
    function showScore() {
        const fscont = document.getElementById('finalScore');
        fscont.classList.remove('hidden');
        replay.focus();
    }
    showScore();
    clearTimeout(inactivityTimer); // Clear the timer when the game stops
}

let cont = document.getElementById('movingCont');

function refresh() {
    if (cont.classList.contains("animate-motion")) {
        cont.classList.remove("animate-motion");
        inputNum.value = "";
        setTimeout(comeBack, 100);
    }
}

function comeBack() {
    cont.classList.add("top-0");
    cont.classList.add("animate-motion");
}

x.textContent = a;
y.innerText = b;

// Reloading after clicking the button
const replay = document.getElementById('replay');
replay.addEventListener("click", () => {
    window.location.reload();
});

replay.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        window.location.reload();
    }
});
