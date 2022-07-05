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
let spotIndex = [];
let introButton = null;
let currentSpot = null;
let playerTurn = 1




class Player {
    constructor(name, score, lastChoice, choices){
        this.name = name;
        this.score = score;
        this.lastChoice = lastChoice;
        this.choices = choices;
    }
}

const playerOne = new Player('', 0, null, []);

const playerTwo = new Player('', 0, null, []);

const computer = new Player('Big Mac', 3, null, []);

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




const startNameColor = () => {
    displayPlayerName1.style.backgroundColor = 'lightgreen'
    displayPlayerName2.style.backgroundColor = ''
}

const clearNameColor = () => {
    displayPlayerName1.style.backgroundColor = ''
    displayPlayerName2.style.backgroundColor = ''
}

const inputPlayerNames = (evt)=> {
    if(evt.target.id === 'one-player'){
        singlePlayer.classList.remove('hide-content');
        singlePlayer.classList.add('flex-ctr');
        playerNum.classList.add('hide-content');
    }else if(evt.target.id === 'two-player'){
        multiPlayer.classList.remove('hide-content');
        multiPlayer.classList.add('flex-ctr');
        playerNum.classList.add('hide-content');
    }
}
const renderPlayerNames = () => {
    if(introButton.id === 'submit-player-name-single'){
        displayPlayerName1.innerHTML = playerOne.name;
        displayPlayerName2.innerHTML = computer.name;
    }else if(introButton.id === 'submit-player-name-multi'){
        displayPlayerName1.innerHTML = playerOne.name;
        displayPlayerName2.innerHTML = playerTwo.name;
    }
}
const renderBoard = () =>{
    introPage.classList.add('hide-content');
    introPage.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content');
    startNameColor()
}

const renderMainPage = (evt) => {
    introButton = evt.target
    renderBoard();
    if(introButton.id === 'submit-player-name-single'){
        playerOne.name = playerName1.value;
    }else if(introButton.id === 'submit-player-name-multi'){
        playerOne.name = playerName2.value;
        playerTwo.name = playerName3.value;
    }
    renderPlayerNames();

    //RENDER SCORES NOT USEFUL HERE
    // renderScores(evt)
}

const checkWin = () => {
    // console.log('win checked')
    if(playerTurn === -1){
        winCombos.forEach(winCombo => {
            if(playerOne.choices.includes(winCombo[0]) && 
            playerOne.choices.includes(winCombo[1]) && 
            playerOne.choices.includes(winCombo[2])){
                winMessage.innerHTML = `${playerOne.name} WINS!!!`;
                playerOne.score++
                playerScores[0].innerHTML = playerOne.score;
                boardSpots.forEach((boardSpot) => {
                    boardSpot.disabled = true
                });
                clearNameColor()
            }
        });
    }else if(playerTurn === 1){
        winCombos.forEach(winCombo => {
            if(playerTwo.choices.includes(winCombo[0]) && 
            playerTwo.choices.includes(winCombo[1]) && 
            playerTwo.choices.includes(winCombo[2])){
                winMessage.innerHTML = `${playerTwo.name} WINS!!!`;
                playerTwo.score++
                playerScores[1].innerHTML = playerTwo.score;
                boardSpots.forEach((boardSpot) => {
                    boardSpot.disabled = true
                });
                clearNameColor()
            }
        });
    }

}

const Turn = ()=>{
    if(playerTurn === 1){
        playerOne.choices.push(currentSpot.innerHTML)
        // console.log('PlayerOneChoices', playerOne.choices)
        currentSpot.classList.remove('hide-spot-text')
        currentSpot.innerHTML = 'X';
        displayPlayerName1.style.backgroundColor = ''
        displayPlayerName2.style.backgroundColor = 'lightgreen'
        playerTurn = -1
    }else if(playerTurn === -1){
        playerTwo.choices.push(currentSpot.innerHTML)
        // console.log('PlayerTwoChoices', playerTwo.choices)
        currentSpot.classList.remove('hide-spot-text')
        currentSpot.innerHTML = 'O';
        startNameColor()
        playerTurn = 1
    }
    checkWin()
}

//WORK ON BOARD CLICK LISTENER
const handleBoardClick = (evt) => {
    currentSpot = evt.target;
    if(currentSpot.disabled === false){
        Turn();
        currentSpot.disabled = true;    
    } else if(currentSpot.disabled === true){
        console.log('disabled')
    }
}

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
    startNameColor()
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