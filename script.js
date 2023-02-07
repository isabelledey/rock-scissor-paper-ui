let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let computerWins = 0;
let playerChoice;
let computerHand;

const container = document.querySelector(".container");
const winContainer = document.querySelector(".win-container");
const computerRound = document.querySelector(".computer-round");
const userRound = document.querySelector(".user-round");
const options = document.querySelector(".options");
const you = document.querySelector(".you");
const rival = document.querySelector(".computer");
const displayResult = document.createElement("div");
const resultText = document.createElement("h3");
const computerCurrentScore = document.querySelector(".computer-current-score");
const userCurrentScore = document.querySelector(".user-current-score");
const userWin = document.querySelector(".user-win");
const computerWin = document.querySelector(".computer-win");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const modalText = document.querySelector(".modal-text");
displayResult.appendChild(resultText);
displayResult.classList.add("result-text");
document.body.insertBefore(displayResult, winContainer.nextSibling);

function computerPlay() {
  const choices = ["Rock", "Paper", "Scissor"];
  computerHand =
    choices[Math.floor(Math.random() * choices.length)].toLowerCase();
  computerRound.src = `./public/${computerHand}.png`;
  rival.textContent = `${computerHand}`;
  return computerHand;
}

const handleEventListener = function (e) {
  if (
    playerScore === 5 ||
    computerScore === 5 ||
    !modal.classList.contains("hidden")
  ) {
    return;
  }
  if (e.target.classList.contains("rock") || e.key == "r") {
    userRound.src = "./public/rock.png";
    playerChoice = "rock";
    you.textContent = "rock";
  } else if (e.target.classList.contains("scissors") || e.key == "s") {
    userRound.src = "./public/scissor.png";
    playerChoice = "scissor";
    you.textContent = "scissor";
  } else if (e.target.classList.contains("paper") || e.key == "p") {
    userRound.src = "./public/paper.png";
    playerChoice = "paper";
    you.textContent = "paper";
  } else {
    return;
  }
  computerPlay();
  showResultText();
  checkPoints();
  userCurrentScore.textContent = `Score: ${playerScore}`;
  computerCurrentScore.textContent = `Score: ${computerScore}`;
  return playerChoice;
};

options.addEventListener("click", handleEventListener);
window.addEventListener("keydown", handleEventListener);

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    playerScore;
    computerScore;
    return `It's a Tie, You both picked ${playerSelection}`;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissor") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissor" && computerSelection === "paper")
  ) {
    playerScore++;
    return `Nice! You Win! ${playerSelection} beats ${computerSelection}`;
  } else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissor") ||
    (playerSelection === "scissor" && computerSelection === "rock")
  ) {
    computerScore++;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

const showResultText = function () {
  resultText.textContent = playRound(playerChoice, computerHand);
};

function showModal(winner) {
  if (winner == "User") {
    modalText.textContent = `Congratulations! You won this game! 🥳

     Total wins:

     You - ${playerWins}  |  Computer - ${computerWins}`;
  } else {
    modalText.textContent = `Ayy, such a loser 🤡

    Total wins:

    You - ${playerWins}  |  Computer - ${computerWins}`;
  }
  restart();
  computerWin.textContent = `Total wins: ${computerWins}`;
  userWin.textContent = `Total wins: ${playerWins}`;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function checkPoints() {
  if (playerScore === 5) {
    playerWins++;
    setTimeout(() => showModal("User"), 500);
  } else if (computerScore === 5) {
    computerWins++;
    setTimeout(() => showModal("Computer"), 500);
  }
}

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

function restart() {
  playerScore = 0;
  computerScore = 0;
  userCurrentScore.textContent = `Score: ${playerScore}`;
  computerCurrentScore.textContent = `Score: ${computerScore}`;
  computerRound.src = ``;
  userRound.src = ``;
  you.textContent = "Your Choice";
  rival.textContent = "Computer's Choice";
  resultText.textContent = "";
}
