document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const showAnswerButton = document.getElementById("showAnswerButton");
    const submitGuessButton = document.getElementById("submitGuessButton");
    const answerParagraph = document.getElementById("answer");
    const songTitleSpan = document.getElementById("songTitle");
    const resultMessage = document.getElementById("resultMessage"); // Make sure this is defined
    const guessInput = document.getElementById("guessInput");
    const scoreElement = document.getElementById("score");
  
    let currentSongIndex = null;
    let song = null;
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
  
    const songs = [
      { title: "Hawa Banke", file: "/src/SongGame/hawa_banke.mp3" },
      { title: "Barsat Ki Dhun", file: "/src/SongGame/barsaat_ki_dhun.mp3" },
      { title: "Saiyara", file: "/src/SongGame/saiyaara.mp3" },
      { title: "Chale Aana", file: "/src/SongGame/chale_aana.mp3" },
      { title: "jeene laga hoon", file: "/src/SongGame/jeene laga hoon.mp3" },
      { title: "Pal", file: "/src/SongGame/pal.mp3" },
      { title: "Tum Hi Ho", file: "/src/SongGame/tum_hi_ho.mp3" },
      { title: "Senorita", file: "/src/SongGame/senorita.mp3" },
    ];
  
    function playRandomSong() {
      if (song) {
        song.pause();
      }
      currentSongIndex = Math.floor(Math.random() * songs.length);
      const songDetails = songs[currentSongIndex];
      song = new Audio(songDetails.file);
      song.play().catch((error) => {
        console.error("Error playing the song:", error);
      });
      songTitleSpan.textContent = songDetails.title;
  
      playButton.disabled = true;
      setTimeout(() => {
        song.pause();
        playButton.disabled = false;
      }, 10000);
    }
  
    let isAnswerVisible = false;
  
    showAnswerButton.addEventListener("click", () => {
      if (currentSongIndex !== null) {
        if (isAnswerVisible) {
          answerParagraph.style.display = "none";
          showAnswerButton.textContent = "Show Answer";
          isAnswerVisible = false;
        } else {
          answerParagraph.style.display = "block";
          showAnswerButton.textContent = "Hide Answer";
          isAnswerVisible = true;
        }
      } else {
        alert("Play a song first!");
      }
    });
  
    submitGuessButton.addEventListener("click", () => {
      // if (song) {
      //   song.pause();
      // }
      const guess = guessInput.value.trim();
      if (guess.toLowerCase() === songs[currentSongIndex].title.toLowerCase()) {
        showSuccessMessage("Correct! You guessed the song!", () => {
          updateScore(10);
          if (score >= 100) {
            alert("You have guessed all the songs!");
            window.location.reload();
          }
          currentSongIndex = null;
        });
      } else {
        resultMessage.textContent = "Incorrect. Try again!";
        resultMessage.classList.remove("hidden");
      }
    });
  
    function showSuccessMessage(message, callback) {
      resultMessage.textContent = message;
      resultMessage.classList.remove("hidden");
      setTimeout(() => {
        resultMessage.classList.add("hidden");
        if (callback) callback();
      }, 1000);
    }
  
    function updateScore(points) {
      score += points;
      scoreElement.textContent = score.toString().padStart(2, "0");
      updateHighScore();
    }
  
    function updateHighScore() {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
  
    playButton.addEventListener("click", () => {
      if (!playButton.disabled) {
        playRandomSong();
      }
    });
  });