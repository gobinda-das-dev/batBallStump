let savedScore = JSON.parse(localStorage.getItem('Score'));

let score = savedScore || {
    win: 0,
    lose: 0,
    tie: 0,
};
function updateScoreBord() {
    scoreBord = document.querySelector(".score_bord input[name=score_bord]");
    scoreBord.value = `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`;
}

// Function to handle the game logic and update the score
function playGame(userChoice) {
    let randomNumber = Math.random() * 3;
    let computerChoice;

    if (randomNumber > 0 && randomNumber <= 1) {
        computerChoice = '🏏';
    } else if (randomNumber > 1 && randomNumber <= 2) {
        computerChoice = '⚽';
    } else {
        computerChoice = '🧱';
    }


    if (computerChoice === userChoice) {
        score.tie++;
        document.querySelector('.display').style.display = 'block';
        document.querySelector('.tie').innerText = "It's a tie";
        document.querySelector('.won').innerText = "";
        document.querySelector('.lost').innerText = "";
    } else if (
        (userChoice === '🏏' && computerChoice === '🧱') ||
        (userChoice === '⚽' && computerChoice === '🏏') ||
        (userChoice === '🧱' && computerChoice === '⚽')
    ) {
        score.lose++;
        document.querySelector('.display').style.display = 'block';
        document.querySelector('.lost').innerText = 'You lost';
        document.querySelector('.won').innerText = '';
        document.querySelector('.tie').innerText = '';
    } else {
        score.win++;
        document.querySelector('.display').style.display = 'block';
        document.querySelector('.won').innerText = 'You win';
        document.querySelector('.lost').innerText = '';
        document.querySelector('.tie').innerText = '';
    }


    // Update the score_bord text
    updateScoreBord();

    localStorage.setItem('Score', JSON.stringify(score));
    document.querySelector('.computerChoice').innerHTML = computerChoice;
}

// Add event listeners to the buttons
document.getElementById('bat').addEventListener('click', function() {
    playGame('🏏');
    document.querySelector('.yourChoice').innerText = '🏏';
});

document.getElementById('ball').addEventListener('click', function() {
    playGame('⚽');
    document.querySelector('.yourChoice').innerText = '⚽';
});

document.getElementById('wicket').addEventListener('click', function() {
    playGame('🧱');
    document.querySelector('.yourChoice').innerText = '🧱';
});

document.getElementById('restart').addEventListener('click', function() {
    localStorage.clear();
    score = {
        win: 0,
        lose: 0,
        tie: 0,
    };
    scoreBord.value = `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`;
    document.querySelector('.display').style.display = 'none';
});


// Initialize the score_bord text
updateScoreBord();