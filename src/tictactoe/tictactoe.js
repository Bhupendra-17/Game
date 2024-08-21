const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const timeDisplay = document.getElementById("time");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

let currentPlayer = "X";
let board = Array(9).fill(null);
let isPlaying = false;
let timerInterval;
let timeLeft = 60; // 1 minute in seconds
let score = { X: 0, O: 0 };

const updateScoreboard = () => {
  scoreX.textContent = `Player X: ${score.X}`;
  scoreO.textContent = `Player O: ${score.O}`;
};

const updateTimeDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimeDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      handleEndGame();
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const handleClick = (event) => {
  const index = event.target.getAttribute("data-index");

  if (!isPlaying || board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    alert(`${winner} wins!`);
    score[winner]++;
    updateScoreboard();
    handleEndGame();
  } else if (!board.includes(null)) {
    alert("It's a tie!");
    handleEndGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const handleEndGame = () => {
  stopTimer();
  isPlaying = false;
};

const resetGame = () => {
  board = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  timeLeft = 60;
  updateTimeDisplay();
  handleEndGame();
};

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    startTimer();
  }
});

pauseButton.addEventListener("click", () => {
  if (isPlaying) {
    stopTimer();
    isPlaying = false;
  }
});

resetButton.addEventListener("click", resetGame);

cells.forEach((cell) => cell.addEventListener("click", handleClick));
