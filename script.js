"use strict";
// Available Elements
// ---------------------------------------------------------------------------------
const bigScore1 = document.querySelector(".mainScore--0");
const bigScore2 = document.querySelector(".mainScore--1");
const currentScoreEl1 = document.querySelector(".currentScore--0");
const currentScoreEl2 = document.querySelector(".currentScore--1");
const activeSegment1 = document.querySelector(".playerActive--0");
const activeSegment2 = document.querySelector(".playerActive--1");
const diceImage = document.querySelector("img");
const throwDice = document.querySelector(".btn-rollDice");
const playagain = document.querySelector(".btn-playAgain");
const playerSwitch = document.querySelector(".btn-switchPlayer");

let score, currentScore, playerActive, playing;

// Initials
// ---------------------------------------------------------------------------------
const init = function () {
  score = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;

  bigScore1.textContent = 0;
  bigScore2.textContent = 0;
  currentScoreEl1.textContent = 0;
  currentScoreEl2.textContent = 0;

  diceImage.classList.add("hidden");
  activeSegment1.classList.add("playerActive");
  activeSegment2.classList.remove("playerActive");
  activeSegment1.classList.remove("playerWinner");
  activeSegment2.classList.remove("playerWinner");
};
init();

// Swap Active User
// ---------------------------------------------------------------------------------

const switchThePlayer = function () {
  document.querySelector(`.currentScore--${playerActive}`).textContent = 0;
  currentScore = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  activeSegment1.classList.toggle("playerActive");
  activeSegment2.classList.toggle("playerActive");
};

// Roll the dice
// ---------------------------------------------------------------------------------
throwDice.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImage.classList.remove("hidden");
    diceImage.src = `image/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.currentScore--${playerActive}`).textContent =
        currentScore;
    } else {
      switchThePlayer();
    }
  }
});

// Swap Active User and Add Scores and Declare Winner
// ---------------------------------------------------------------------------------
playerSwitch.addEventListener("click", function () {
  if (playing) {
    score[playerActive] += currentScore;
    document.querySelector(`.mainScore--${playerActive}`).textContent =
      score[playerActive];
    if (score[playerActive] >= 100) {
      playing = false;
      diceImage.classList.add("hidden");
      document
        .querySelector(`.playerActive--${playerActive}`)
        .classList.add("playerWinner");
      document.querySelector(`.mainScore--${playerActive}`).textContent =
        "Winner 🎉";
    } else {
      switchThePlayer();
    }
  }
});
// Restart Game
// ---------------------------------------------------------------------------------
playagain.addEventListener("click", function () {
  init();
});
