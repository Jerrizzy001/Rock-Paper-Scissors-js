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
const gameDetails = document.getElementById("game-details");
const rules = document.querySelector(".rules-container");
const closeBtn = document.getElementById("close-btn");
const usernameForm = document.getElementById("form-for-input")
const username = document.getElementById("username")
const greetUser = document.getElementById("user-greet")
const options = ["rock", "paper", "scissors"];
let submitUser = document.getElementById("submit-username")
const resetGameBtn = document.querySelector(".reset-game-btn");
let user = ""

gameDetails.addEventListener("click", () => {
    rules.style.display = "flex";
})

closeBtn.addEventListener("click", () => {
    rules.style.display = "none"
})

playBtn.addEventListener("click", () => {
    usernameForm.style.display = "flex";
});

//function to make sure that a user must input their name before they are allowed to play the game
username.addEventListener("input", () => {
    if(username.value.trim().length >= 1) {
        submitUser.disabled = false;
    }
    else {
        submitUser.disabled = true;
    }
})

//Function to get the user's name so it can be added to the game 
username.addEventListener("change", () => {
    user = username.value.trim();
})

submitUser.addEventListener("click", () => {
    if(username.value.trim()) {
        user = username.value.trim();
        usernameForm.style.display = "none";
        userInput.style.display = "flex";
        greetUser.innerText = `Welcome ${user}!`
        resetScores();
    }
})

let userScore = 0;
let computerScore = 0;
let isPlaying = false;

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
        return `${user} wins!`;
    } else {
        return "Rizzy wins!";
    }
}

function disableButtons() {
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
    isPlaying = true;
}

function enableButtons() {
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    isPlaying = false;
}

function playGame(userChoice) {
    if (isPlaying) return;
    
    disableButtons();
    
    // Show countdown
    let countdown = 3;
    resultDisplay.innerHTML = `<span class="countdown">${countdown}</span>`;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            resultDisplay.innerHTML = `<span class="countdown">${countdown}</span>`;
        } else {
            clearInterval(countdownInterval);
            
            const computerChoice = getRandomComputerChoice();
            const result = checkWinner(userChoice, computerChoice);

            if (result.includes(user)) {
                userScore++;
            } else if (result === "Rizzy wins!") {
                computerScore++;
            }

            resultDisplay.textContent = `${user} chose ${userChoice}. Rizzy chose ${computerChoice}. ${result}`;
            scoreDisplay.textContent = `Score: ${user}: ${userScore} | Rizzy: ${computerScore}`;

            let winner = "";
            if (userScore === 3) {
                winner = `${user} Wins The Game!`
                setTimeout(() => {
                    overPage.style.display = "flex";
                    over.textContent = winner;
                }, 1000);
            } else if(computerScore === 3) {
                winner = `Rizzy Wins The Game!`
                setTimeout(() => {
                    overPage.style.display = "flex";
                    over.textContent = winner;
                }, 1000);
            } else {
                enableButtons();
            }
        }
    }, 1000);
}

function resetScores() {
    computerScore = 0;
    userScore = 0;
    resultDisplay.textContent = "Make your choice above!";
    scoreDisplay.textContent = "Score: ";
    enableButtons();
}

function resetGame() {
    resetScores();
    overPage.style.display = "none"; 
}

rock.addEventListener("click", () => playGame("rock"));
paper.addEventListener("click", () => playGame("paper"));
scissors.addEventListener("click", () => playGame("scissors"));

endGame.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
        }
    });
    
    button.addEventListener('touchend', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(1)';
        }
    });
});
