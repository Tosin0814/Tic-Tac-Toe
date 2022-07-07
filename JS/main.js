const introPage = document.querySelector('.intro-page');
const start = document.querySelector('.start');
const playerNames = document.querySelector('.player-names');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const submitPlayerNames = document.querySelector('.submit-player-name');
const playerScores = document.querySelectorAll('.player-score');
const mainContent = document.querySelector('.main-content');
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const boardSpots = document.querySelectorAll('.spot');
const winMessage = document.querySelector('.win');
const resetButton = document.querySelector('.reset');

let introButton = null;
let currentSpot = null;
let playerTurn = 1;


// Class to create player objects
class Players {
    constructor(name, score, choices){
        this.name = name;
        this.score = score;
        this.choices = choices;
    }
}

// Player Objects
const playerOne = new Players('', 0, []);
const playerTwo = new Players('', 0, []);

// Winning combinations for game
const winCombos = [
    ['0','1','2'], 
    ['0','3','6'], 
    ['0','4','8'], 
    ['6','7','8'], 
    ['6','4','2'], 
    ['2','5','8'], 
    ['3','4','5'], 
    ['1','4','7']
]



// Render enter player names page and hide start button
const inputPlayerNames = ()=> {
    playerNames.classList.remove('hide-content');
    playerNames.classList.add('flex-ctr');
    start.classList.add('hide-content');
}

// Add styling and modify HTML when it is player one's turn
const playerOneTurn = () => {
        displayPlayerName1.style.backgroundColor = 'lightgreen'
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = `${playerOne.name}'s Turn`
        displayPlayerName2.innerHTML = playerTwo.name
    
}

// Add styling and modify HTML when it is player two's turn
const playerTwoTurn = () => {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = 'lightgreen'
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = `${playerTwo.name}'s Turn`
}

// Restore default HTML and style if a player has won
const resetNameAndColor = () => {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = playerTwo.name
}

// Hide intro page and render game board
const renderBoard = () =>{
    introPage.classList.add('hide-content');
    introPage.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content');
    playerOneTurn()
}

// Render initial state of main page
const renderMainPage = (evt) => {
    introButton = evt.target
    renderBoard();
    playerOne.name = playerName1.value;
    playerTwo.name = playerName2.value;
    playerOneTurn()
}

// Check player win based on gameType
const checkWin = () => {
        if(playerTurn === -1){
            winCombos.forEach(winCombo => {
                if(playerOne.choices.includes(winCombo[0]) && 
                playerOne.choices.includes(winCombo[1]) && 
                playerOne.choices.includes(winCombo[2])){
                    winMessage.innerHTML = `${playerOne.name} WINS!`;
                    playerOne.score++
                    playerScores[0].innerHTML = playerOne.score;
                    boardSpots.forEach((boardSpot) => {
                        boardSpot.disabled = true
                    });
                    resetNameAndColor()
                }
            });
        }else if(playerTurn === 1){
            winCombos.forEach(winCombo => {
                if(playerTwo.choices.includes(winCombo[0]) && 
                playerTwo.choices.includes(winCombo[1]) && 
                playerTwo.choices.includes(winCombo[2])){
                    winMessage.innerHTML = `${playerTwo.name} WINS!`;
                    playerTwo.score++
                    playerScores[1].innerHTML = playerTwo.score;
                    boardSpots.forEach((boardSpot) => {
                        boardSpot.disabled = true
                    });
                    resetNameAndColor()
                }
            });
        }
}

// Lets current player play and then switch turns
const Turn = ()=>{
        if(playerTurn === 1){
            playerOne.choices.push(currentSpot.innerHTML)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'X';
            playerTwoTurn();
            playerTurn = -1
        }else if(playerTurn === -1){
            playerTwo.choices.push(currentSpot.innerHTML)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'O';
            playerOneTurn()
            playerTurn = 1
        }
        checkWin()
}

// Disable board spot if it has already been played on
const handleBoardClick = (evt) => {
    currentSpot = evt.target;
    if(currentSpot.disabled === false){
        Turn();
        currentSpot.disabled = true;
    } else if(currentSpot.disabled === true){
        console.log('disabled')
    }
}

// Reset board to restart game or play new round
const clearBoard = () => {
        let spotNum = 0
        boardSpots.forEach((boardSpot) => {
            boardSpot.innerHTML = spotNum;
            boardSpot.classList.add('hide-spot-text')
            boardSpot.disabled = false;
            spotNum++;
        });
        playerOne.choices = [];
        playerTwo.choices = [];
        winMessage.innerHTML = '';
        playerTurn = 1;
        playerOneTurn()
}




//Single or playerNames?
start.addEventListener('click', inputPlayerNames);

submitPlayerNames.addEventListener('click', renderMainPage);

boardSpots.forEach((boardSpot) => {
    boardSpot.disabled = false
    boardSpot.addEventListener('click', handleBoardClick);
});

resetButton.addEventListener('click', clearBoard)