// JS
const playBtn = document.getElementById("play-btn");
const userInput = document.getElementById("user-input");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resultDisplay = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const over = document.getElementById("over");
const overPage = document.getElementById("over-page");
const endGame = document.getElementById("end-game");

const options = ["rock", "paper", "scissors"];

let userScore = 0;
let computerScore = 0;

function getRandomComputerChoice() {
    let random = Math.floor(Math.random() * options.length);
    return options[random];
}

function checkWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function playGame(userChoice) {
    const computerChoice = getRandomComputerChoice();
    const result = checkWinner(userChoice, computerChoice);

    if (result === "You win!") {
        userScore++;
    } else if (result === "Computer wins!") {
        computerScore++;
    }

    resultDisplay.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;
    scoreDisplay.textContent = `Score: You: ${userScore} | Computer: ${computerScore}`;
}
playBtn.addEventListener("click", () => {
    userInput.style.display = "flex";
  
});

rock.addEventListener("click", () => playGame("rock"));
paper.addEventListener("click", () => playGame("paper"));
scissors.addEventListener("click", () => playGame("scissors"));
endGame.addEventListener("click", () => {
    overPage.style.display = "flex";
    let winner = ""
    if(userScore > computerScore) {
         winner = "Win!"
    }
    else if (computerScore > userScore) {
        winner = "Lose!, Better Luck next Time"
    }
    else if (computerScore === userScore) {
        winner= `Tied with computer, You should play and secure your win`
    }
    over.textContent = `Game over!. You ${winner}`
});


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});