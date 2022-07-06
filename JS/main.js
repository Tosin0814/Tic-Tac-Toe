const introPage = document.querySelector('#intro-page');
const playerNum = document.querySelector('.player-num');
const singlePlayer = document.querySelector('#single-player');
const multiPlayer = document.querySelector('#multi-player');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const playerName3 = document.querySelector('.player3');
const playerScores = document.querySelectorAll('.player-score');
const submitPlayerNameSingle = document.querySelector('#submit-player-name-single');
const submitPlayerNameMulti = document.querySelector('#submit-player-name-multi');
const mainContent = document.querySelector('.main-content');
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const boardSpots = document.querySelectorAll('.spot');
const winMessage = document.querySelector('.win');
const resetButton = document.querySelector('.reset');

// Player vs Player (1) or Player vs Computer (-1)
let gameType = 0;

let introButton = null;
let currentSpot = null;
let playerTurn = 1;



// Class to create player objects
class Player {
    constructor(name, score, choices){
        this.name = name;
        this.score = score;
        this.choices = choices;
    }
}

// Player Objects
const playerOne = new Player('', 0, []);
const playerTwo = new Player('', 0, []);
const computer = new Player('Big Mac', 0, []);

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



// Add styling and modify HTML when it is player one's turn
const playerOneTurn = () => {
    if (gameType === 1) {
        displayPlayerName1.style.backgroundColor = 'lightgreen'
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = `${playerOne.name}'s Turn`
        displayPlayerName2.innerHTML = playerTwo.name
    } else if (gameType === -1) {
        displayPlayerName1.style.backgroundColor = 'lightgreen'
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = `${playerOne.name}'s Turn`
        displayPlayerName2.innerHTML = computer.name
    }
    
}

// Add styling and modify HTML when it is player two's turn
const playerTwoTurn = () => {
    if (gameType === 1) {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = 'lightgreen'
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = `${playerTwo.name}'s Turn`
    } else if (gameType === -1) {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = 'lightgreen'
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = `${computer.name}'s Turn`
    }
    
}

// Restore default HTML and style if a player has won
const resetNameAndColor = () => {
    if (gameType === 1) {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = playerTwo.name
    } else if (gameType === -1) {
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = ''
        displayPlayerName1.innerHTML = playerOne.name
        displayPlayerName2.innerHTML = computer.name
    }
    
}


// Hide select game type, render enter player names page and set value of gameType
const inputPlayerNames = (evt)=> {
    if(evt.target.id === 'one-player'){
        singlePlayer.classList.remove('hide-content');
        singlePlayer.classList.add('flex-ctr');
        playerNum.classList.add('hide-content');
        gameType = -1
    }else if(evt.target.id === 'two-player'){
        multiPlayer.classList.remove('hide-content');
        multiPlayer.classList.add('flex-ctr');
        playerNum.classList.add('hide-content');
        gameType = 1
    }
}

// Render player names depending on game type
const renderPlayerNames = () => {
    if(gameType === -1){
        playerOneTurn()
        displayPlayerName2.innerHTML = computer.name;
    }else if(gameType === 1){
        playerOneTurn()
        displayPlayerName2.innerHTML = playerTwo.name;
    }
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
    if(gameType === -1){
        playerOne.name = playerName1.value;
    }else if(gameType === 1){
        playerOne.name = playerName2.value;
        playerTwo.name = playerName3.value;
    }
    renderPlayerNames();
}

// Check player win based on gameType
const checkWin = () => {
    if (gameType === 1) {
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
    } else if (gameType === -1) {
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
                if(computer.choices.includes(winCombo[0]) && 
                computer.choices.includes(winCombo[1]) && 
                computer.choices.includes(winCombo[2])){
                    winMessage.innerHTML = `${computer.name} WINS!`;
                    computer.score++
                    playerScores[1].innerHTML = computer.score;
                    boardSpots.forEach((boardSpot) => {
                        boardSpot.disabled = true
                    });
                    resetNameAndColor()
                }
            });
        }
    }
}

// Lets current player play and then switch turns
const Turn = ()=>{
    if (gameType === 1) {
        if(playerTurn === 1){
            playerOne.choices.push(currentSpot.innerHTML)
            // console.log('PlayerOneChoices', playerOne.choices)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'X';
            playerTwoTurn();
            playerTurn = -1
        }else if(playerTurn === -1){
            playerTwo.choices.push(currentSpot.innerHTML)
            // console.log('PlayerTwoChoices', playerTwo.choices)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'O';
            playerOneTurn()
            playerTurn = 1
        }
        checkWin()
    } else if (gameType === -1) {
        if(playerTurn === 1){
            playerOne.choices.push(currentSpot.innerHTML)
            // console.log('PlayerOneChoices', playerOne.choices)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'X';
            playerTwoTurn();
            playerTurn = -1
        }else if(playerTurn === -1){
            computer.choices.push(currentSpot.innerHTML)
            // console.log('PlayerTwoChoices', playerTwo.choices)
            currentSpot.classList.remove('hide-spot-text')
            currentSpot.innerHTML = 'O';
            playerOneTurn()
            playerTurn = 1
        }
        checkWin()
    } 
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
    if (gameType === 1) {
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
    } else if (gameType === -1) {
        let spotNum = 0
        boardSpots.forEach((boardSpot) => {
            boardSpot.innerHTML = spotNum;
            boardSpot.classList.add('hide-spot-text')
            boardSpot.disabled = false;
            spotNum++;
        });
        playerOne.choices = [];
        computer.choices = [];
        winMessage.innerHTML = '';
        playerTurn = 1;
        playerOneTurn()
    }
}




//Single or Multiplayer?
playerNum.addEventListener('click', inputPlayerNames);

submitPlayerNameSingle.addEventListener('click', renderMainPage);

submitPlayerNameMulti.addEventListener('click', renderMainPage);

boardSpots.forEach((boardSpot) => {
    boardSpot.disabled = false
    boardSpot.addEventListener('click', handleBoardClick);
});

resetButton.addEventListener('click', clearBoard)