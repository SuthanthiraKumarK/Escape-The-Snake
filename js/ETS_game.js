// 'use strict';

// DOM elements
const emoji = document.querySelector('.emojiData');
const progressBar = document.querySelector('.progress-bar');
const dice = document.querySelector('.diceData');
const initialParent = document.querySelector('.parent1');
const child = document.querySelector('.child');
const resultImage = document.querySelector('.gameResultImage');

// DOM Buttons
const pauseButton = document.querySelector('.pauseButton');
const continueButton = document.querySelector('.continueButton');
const restartButton = document.querySelector('.restartButton');
const diceButton = document.querySelector('.diceButton');
const newGameButton = document.querySelector('.newGametButton');

// DOM Windows
const mainWindow = document.querySelector('.mainWindow');
const PauseWindow = document.querySelector('.pauseWindow');
const finishWindow = document.querySelector('.finishWindow');

// init
let a=100;
let parentNumber=1;
progressBar.style.width = `${a}`;



// Functions
const init = function(){
    a=100;
    parentNumber=1;
    emojiDisplay(100);
    progressBar.style.width = '100%';
    progressBar.style.background='rgb(74, 189, 255)';
    diceDisplay(1);
    initialParent.appendChild(child);
};

const playerMovement = function (){
    const parent = document.querySelector(`.parent${parentNumber}`);
    parent.appendChild(child);
}

const emojiDisplay = function (n){
    emoji.setAttribute('src',`./images/Emoji Data/a${n}.png`);
};

const progressWidth = function(n){
    a-=n;
    progressBar.style.width = `${a}%`;
};

const progressColor = function(n){
   progressBar.style.background= `rgb(${n}, 111, 111)`;

}

const diceDisplay = function (x){
    dice.setAttribute('src', `./images/Dice Data/dice-${x}.png`);
};

const diceVisible = function (){
    diceButton.classList.toggle('invisible');
};

const PauseContinue = function(){
    PauseWindow.classList.toggle('hidden');
    PauseWindow.classList.toggle('flex');
    mainWindow.classList.toggle('blur');
}

const pauseGame = function() {
    diceVisible();
    PauseContinue();
};

const continueGame = function() {
    diceVisible();
    PauseContinue();
};

const restartGame = function(){
    init();
    continueGame();
};

const postGameSettings = function(){
    finishWindow.classList.toggle('hidden');
    finishWindow.classList.toggle('flex');
    mainWindow.classList.toggle('blur');
}

const enableFinishWindow = function (){
    postGameSettings();
}

const newGame = function () {
    a=100;
    postGameSettings();
    init();
    diceVisible();
};

const timeout = function(func,time,para){
    setTimeout(func,time,para);
};

const gameFunction = function (){

    // dice settings
    const diceNumber = Math.trunc(Math.random()*6)+1;
    diceDisplay(diceNumber);
    
    // Current Parent
    if((parentNumber===95 && diceNumber===6) || (parentNumber===96 && diceNumber>=5) || (parentNumber===97 && diceNumber>=4) ||
    (parentNumber===98 && diceNumber>=3) || (parentNumber===99 && diceNumber>=2)) {
        parentNumber=parentNumber} else{
            parentNumber+=diceNumber;
        };
    
    // Progress Width 
    if(parentNumber=== 3 || parentNumber===8 || parentNumber===15 || parentNumber===19 || parentNumber===24 || parentNumber===27 || parentNumber===31 || parentNumber===40 || parentNumber===35 || parentNumber===42 || parentNumber===49)
    {
        progressWidth(20);
    };
    
    if(parentNumber===55 || parentNumber===64 || parentNumber===72 || parentNumber===80 || parentNumber===87 || parentNumber===91 || parentNumber===95 || parentNumber===99){
        progressWidth(10);
    };
    
    // Dynamic Emoji & Progress-Bar color
    if(a<31 && a>=21){
        emojiDisplay(30);
        progressColor(275);
    }
    
    if(a<21 && a>=11){
        emojiDisplay(20);
        progressColor(265);
    }
    
    if(a<11){
        emojiDisplay(10);
        progressColor(245);
    };

    if(parentNumber===100){
        timeout(enableFinishWindow,1000);
        timeout(diceVisible,1000);
    };

    if(a===0){
        timeout(enableFinishWindow,1000);
        resultImage.setAttribute('src','./images/Game Summary Images/lose_image.png');
        timeout(diceVisible,1000);
    };
    
    // moving child (emoji)
    timeout(playerMovement,100);

};


// Add Events
diceButton.addEventListener('click',gameFunction);
pauseButton.addEventListener('click',pauseGame);
continueButton.addEventListener('click',continueGame);
restartButton.addEventListener('click',restartGame);
newGameButton.addEventListener('click',newGame);

