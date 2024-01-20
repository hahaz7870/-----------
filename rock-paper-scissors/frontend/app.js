const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const scoreTable = document.querySelector('.score');
const gameResult = document.getElementById('result');
const restart = document.getElementById('restart');

let maxRounds = 3;

const playerWin = 0;
const computerWin = 1;
const tie = 2;

let computerScore = 0;
let playerScore = 0;
let isGameOver = false;
let finalScorePlayer = 0;
let finalScoreComputer = 0;

function restartGame() {
    computerScore = playerScore = 0;
    isGameOver = false;
}

restart.addEventListener('click', function () {
    restartGame();
    scoreTable.textContent = `Computer Score: ${computerScore} - Player Score: ${playerScore}`;
    gameResult.textContent = 'Game result:';
})

const gameItems = document.querySelectorAll('.gameItem');
for (let i = 0; i < gameItems.length; i++) {
    const item = gameItems[i];
    item.addEventListener('click', function () {
        if (isGameOver) {
            return;
        }
        const playerChoose = item.alt;
        const computerChoose = computerPlay();
        playRound(playerChoose, computerChoose);
    });
}

function playRound(player, computer) {
    if (player === computer) {
        gameResult.textContent = 'Game result: TIE';
        return tie;
    }
    const isPlayerWin = (player === rock && computer !== paper) ||
                      (player === scissors && computer !== rock) ||
                      (player === paper && computer !== scissors);

    if (isPlayerWin) {
        gameResult.textContent = 'Game result: Player WON';
        playerScore++;
    } else {
        gameResult.textContent = 'Game result: Computer WON';
        computerScore++;
    }
    scoreTable.textContent = `Computer Score: ${computerScore} - Player Score: ${playerScore}`;

    if (playerScore >= maxRounds || computerScore >= maxRounds) {
        isGameOver = true;
        scoreTable.textContent = `Game over: ${scoreTable.textContent}`;
        if (playerScore > computerScore) {
            gameResult.textContent = 'Game result: Player WON';
        } else {
            gameResult.textContent = 'Game result: Computer WON';
        }
    }
}

function sendStat(user) {
    fetch('/stat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            win: playerScore,
            lose: computerScore
        })
    })
}

function computerPlay() {
    const gameElements = [rock, paper, scissors];
    const i = Math.floor(Math.random() * gameElements.length);
    return gameElements[i];
}

const maxScoreBtn = document.getElementById('apply-max');
const maxScore = document.getElementById('max-games')
maxScoreBtn.addEventListener('click', () => {
    restartGame();
    maxRounds = maxScore.value;
})
