const introPage = document.querySelector('#intro-page');
const playerNum = document.querySelector('.player-num');
const singlePlayer = document.querySelector('#single-player');
const multiPlayer = document.querySelector('#multi-player');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const playerName3 = document.querySelector('.player3');
const submitPlayerName = document.querySelector('#submit-player-name');
const submitPlayerNames = document.querySelector('#submit-player-names');
const mainContent = document.querySelector('.main-content');
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const boardSpots = document.querySelectorAll('.spot');



const playerOne = {
    name: "Stranger 1",
    lastChoice: null,
    score: 0,
    choices:[],
}

const playerTwo = {
    name: "Stranger 2",
    lastChoice: null,
    score: 0,
    choices:[],
}

const computer = {
    name: 'Big Mac',
    lastChoice: null,
    score: 0,
    choices:[],
}


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

const renderMainPage = (evt) => {

    renderBoard();
    if(evt.target.id === 'submit-player-name'){
        playerOne.name = playerName1.value;
    }else if(evt.target.id === 'submit-player-names'){
        playerOne.name = playerName2.value;
        playerTwo.name = playerName3.value;
    }
    renderPlayerNames(evt);
    // console.log(playerOne);
    // console.log(playerTwo);
    // console.log(computer);
}


//Single or Multiplayer?
playerNum.addEventListener('click', enterPlayerNames)


submitPlayerName.addEventListener('click', renderMainPage)

submitPlayerNames.addEventListener('click', renderMainPage)

