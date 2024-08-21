const cards = [
  "A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H",
];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let time = 60;
let timer;
let isPaused = false;
let isTimerStarted = false; // Flag to track if the timer has started

const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffle(cards);
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.value = card;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (isPaused) return;
  
  const card = this;

  // Start the timer when the first card is flipped
  if (!isTimerStarted) {
    startTimer();
    isTimerStarted = true;
  }

  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2);
    score += 10;
    scoreDisplay.textContent = score;
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "";
    card2.textContent = "";
  }
  flippedCards = [];

  if (matchedCards.length === cards.length) {
    clearInterval(timer);
    alert("You won!");
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      time--;
      timeDisplay.textContent = time;
      if (time === 0) {
        clearInterval(timer);
        alert("Time's up!");
      }
    }
  }, 1000);
}

document.getElementById("play").addEventListener("click", () => {
  resetGame();
  startTimer();
});

document.getElementById("pause").addEventListener("click", () => {
  isPaused = true;
});

document.getElementById("resume").addEventListener("click", () => {
  isPaused = false;
});

document.getElementById("reset").addEventListener("click", resetGame);

function resetGame() {
  clearInterval(timer);
  time = 60;
  score = 0;
  flippedCards = [];
  matchedCards = [];
  isPaused = false;
  isTimerStarted = false; // Reset the timer start flag
  timeDisplay.textContent = time;
  scoreDisplay.textContent = score;
  gameBoard.innerHTML = "";
  createBoard();
}

createBoard();
