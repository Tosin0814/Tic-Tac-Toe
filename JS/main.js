const introPage = document.querySelector('#intro-page');
const playerNum = document.querySelector('.player-num');
const singlePlayer = document.querySelector('#single-player');
const multiPlayer = document.querySelector('#multi-player');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const playerName3 = document.querySelector('.player3');
const playerScores = document.querySelectorAll('.player-score')
const submitPlayerName = document.querySelector('#submit-player-name');
const submitPlayerNames = document.querySelector('#submit-player-names');
const mainContent = document.querySelector('.main-content');
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const boardSpots = document.querySelectorAll('.spot');



class Player {
    constructor(name, score, lastChoice, choices){
        this.name = name;
        this.score = score;
        this.lastChoice = lastChoice;
        this.choices = choices;
    }
}

const playerOne = new Player('', 1, null, []);

const playerTwo = new Player('', 2, null, []);

const computer = new Player('Big Mac', 3, null, []);

const winCombos = [
    [0,1,2], 
    [0,3,6], 
    [0,4,8], 
    [6,7,8], 
    [6,4,2], 
    [2,5,8], 
    [3,4,5], 
    [1,4,7]
]


const enterPlayerNames = (evt)=> {
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
const renderPlayerNames = (evt) => {
    if(evt.target.id === 'submit-player-name'){
        displayPlayerName1.innerHTML = playerOne.name;
        displayPlayerName2.innerHTML = computer.name;
    }else if(evt.target.id === 'submit-player-names'){
        displayPlayerName1.innerHTML = playerOne.name;
        displayPlayerName2.innerHTML = playerTwo.name;
    }
}
const renderBoard = () =>{
    introPage.classList.add('hide-content');
    introPage.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content');
}

//NOT USEFUL YET. IMPLEMENT WHEN GAME ACTUALLY STARTS, TO COUNT GAMES WON BY PLAYER (IF CONDITON WILL CHANGE)
// const renderScores = (evt) => {
//     if(evt.target.id === 'submit-player-name'){
//         playerScores[0].innerHTML = playerOne.score;
//         playerScores[1].innerHTML = computer.score;
//     }else if(evt.target.id === 'submit-player-names'){
//         playerScores[0].innerHTML = playerOne.score;
//         playerScores[1].innerHTML = playerTwo.score;
//     }
// }

const renderMainPage = (evt) => {

    renderBoard();
    if(evt.target.id === 'submit-player-name'){
        playerOne.name = playerName1.value;
    }else if(evt.target.id === 'submit-player-names'){
        playerOne.name = playerName2.value;
        playerTwo.name = playerName3.value;
    }
    renderPlayerNames(evt);

    //RENDER SCORES NOT USEFUL HERE
    // renderScores(evt)

    // console.log(playerOne);
    // console.log(playerTwo);
    // console.log(computer);
}


//Single or Multiplayer?
playerNum.addEventListener('click', enterPlayerNames)


submitPlayerName.addEventListener('click', renderMainPage)

submitPlayerNames.addEventListener('click', renderMainPage)
