"use strict";

//Buttons and Dice
const rollButton = document.querySelector(".roll-dice");
const diceEl = document.querySelector(".dice");
const holdButton = document.querySelector(".hold-button");
const newButton = document.querySelector(".new-game");

//Players
const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
let activePlayer = 1;

diceEl.classList.add("hidden");

//Scores
let currentScore = 0;
let totalScore = 0;
let scores = [0, 0];

//This function is used to switch players
function switchPlayer() {
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle("active--player");
  player2.classList.toggle("active--player");
}

rollButton.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove("hidden");
  diceEl.src = `dice images/dice-${dice}.png`;

  if (dice !== 1) {
    //Add to the current score and display it
    currentScore += dice;
    document.querySelector(`.player--${activePlayer}--score`).textContent =
      currentScore;
  } else {
    //Switch player
    document.querySelector(`.player--${activePlayer}--score`).textContent = 0;
    currentScore = 0;
    switchPlayer();
  }
});

holdButton.addEventListener("click", function () {
  //When pressed add the current score to total score and update in the array score.
  totalScore += currentScore;
  scores[activePlayer - 1] += totalScore;
  document.querySelector(`.player-${activePlayer}`).textContent =
    scores[activePlayer - 1];
  currentScore = 0;
  totalScore = 0;
  document.querySelector(`.player--${activePlayer}--score`).textContent = 0;

  //Check if any player's score reaches 100 and declare them winner
  scores.forEach((player) => {
    if (player >= 100) {
      document.querySelector(`.player--${activePlayer}-name`).textContent =
        "WINNER";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winner");
    }
  });
  //Switch Players
  switchPlayer();
});

//Restart the game with default settings
const defaultSettings = function () {
  player1.classList.add("active--player");
  player2.classList.remove("active--player");
  diceEl.classList.add("hidden");
  const defaultScores = document.querySelectorAll(".total--score");
  defaultScores.forEach((score) => {
    score.textContent = 0;
  });
  scores = [0, 0];
  totalScore = 0;
  currentScore = 0;
  document.querySelector(`.player--1-name`).textContent = "PLAYER 1";
  document.querySelector(`.player--2-name`).textContent = "PLAYER 2";
  let winner = document.querySelector(".winner");
  winner.classList.remove("winner");
};

newButton.addEventListener("click", function () {
  defaultSettings();
});
