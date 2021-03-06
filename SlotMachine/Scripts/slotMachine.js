﻿///REFERENCE PATHS:
/// <reference path="jquery.js" />
/// <reference path="lib/createJS.js" />
/// <reference path="lib/easelJS.js" />
/// <reference path="lib/preloadJS.js" />
/// <reference path="lib/soundJS.js" />
/// <reference path="lib/tweenJS.js" />

/**
File Name: slotMachine.js
Author: Kelly McAlpine #200269425
Project Name: The 'Programmbler' Slot-Machine
Last Updated: October 31, 2014
Purpose: All jQuery & Javascript functions that make this game work, are located in this file
Referenced examples from:  "Beginning HTML5 Games with CreateJS" by Brad Manderscheid
**/

/* Variables for all images and text: */
// Loader Bar variables
const LOADER_WIDTH = 400;
var stage, loaderBar, loadInterval;
var percentLoaded = 0;

// Variables for Slot Machine structure:
var queue;
var stage;

var slotGame;
var slotMachineBase;
var creditsWindow;
var betWindow;
var paidWindow;
var reel1;
var reel2;
var reel3;
var betLine;
var bet1Button;
var bet5Button;
var bet10Button;
var bet50Button;
var bet100Button;
var bet500Button;
var spinButton;
var spinButtonHover;
var resetButton;
var resetButtonHover;
var exitButton;

//Changeable information variables:
var creditWindowText;
var betWindowText;
var paidWindowText;

var winRatioText;
var playerTurnText;

// Value Amount variables:
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var icons = "";
var winRatio = 0;
var reddit = 0;
var html = 0;
var notepad = 0;
var css = 0;
var linux = 0;
var github = 0;
var ie = 0;
var blank = 0;

function init()
{
    canvas = document.getElementById("slotCanvas");
    stage = new createjs.Stage('canvas');
    stage.enableMouseOver();

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);

    //Load all images & sounds for game - All sounds were downloaded from https://www.freesound.org/ 
    queue.loadManifest
        ([
            {id:  "slotMachineBase", src: "images/slotmachine1.png" },
            {id:  "betLine", src: "images/betLine.png" },
            {id:  "creditsWindow", src:  "images/creditsWindow.png"},
            {id:  "betWindow", src:  "images/betWindow.png"},
            {id:  "paidWindow", src:  "images/paidWindow.png"},
            {id:  "paidWindow", src:  "images/paidWindow.png"},
            {id:  "bet1Button", src:  "images/bet1Button.png"},
            {id:  "bet5Button", src:  "images/bet5Button.png"},
            {id:  "bet10Button", src:  "images/bet10Button.png"},
            {id:  "bet50Button", src:  "images/bet50Button.png"},
            {id:  "bet100Button", src:  "images/bet100Button.png"},
            {id:  "bet500Button", src:  "images/bet500Button.png"},
            {id:  "spinButton", src:  "images/spinButton.png"},
            {id:  "resetButton", src:  "images/resetButton.png"},
            {id:  "exitButton", src:  "images/exitButton.png"},
            {id:  "spinButtonHover", src:  "images/spinButtonH.png"},
            {id:  "reddit", src:  "images/Reddit.png"},
            {id:  "html", src:  "images/HTML-5.png"},
            {id:  "notepad", src:  "images/Notepad++.png"},
            {id:  "css", src:  "images/css3logo.png"},
            {id:  "linux", src:  "images/OS-Linux.png"},
            {id:  "github", src:  "images/Github.png"},
            {id:  "ie", src:  "images/Internet-Explorer-10.png"},
            {id:  "blank", src:  "images/blank.png"},
            {id:  "resetButtonHover", src: "images/resetButtonH.png" },
            {id:  "cashOut", src:  "sounds/cashOut.mp3"},
            {id:  "noMatch", src: "sounds/noMatch.wav" },
            {id:  "spin", src:  "sounds/spin.wav"},
            {id:  "welcome", src: "sounds/welcome.wav" },
            {id:  "youLose", src: "sounds/youlose.wav" },
            {id:  "youWon", src: "sounds/youWon.wav" }
        ]);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}

function handleTick()
{
    stage.update();
}

function drawSlotMachine()
{
    //Slot-Machine background
    slotGame = new createjs.Container();
    createjs.Sound.play('welcome', createjs.Sound.INTERRUPT_NONE);

    slotMachineBase = new createjs.Bitmap(queue.getResult('slotMachineBase'));
    slotMachineBase.x = 0;
    slotMachineBase.y = 0;

    //Credits Window
    creditsWindow = new createjs.Bitmap(queue.getResult('creditsWindow'));
    creditsWindow.x = 117;
    creditsWindow.y = 522;

    //Bet Window
    betWindow = new createjs.Bitmap(queue.getResult('betWindow'));
    betWindow.x = 376;
    betWindow.y = 522;

    //Winnings Window
    paidWindow = new createjs.Bitmap(queue.getResult('paidWindow'));
    paidWindow.x = 641;
    paidWindow.y = 522;

    //Bet Line
    betLine = new createjs.Bitmap(queue.getResult('betWindow'));
    betLine.x = 74;
    betLine.y = 355;

    //Action Buttons
    spinButton = new createjs.Bitmap(queue.getResult('spinButton'));
    spinButton.x = 438;
    spinButton.y = 655;
    spinButtonHover = new createjs.Bitmap(queue.getResult('spinButtonH'));
    spinButtonHover.x = 438;
    spinButtonHover.y = 655;

    resetButton = new createjs.Bitmap(queue.getResult('resetButton'));
    resetButton.x = 615;
    resetButton.y = 655;
    resetButtonHover = new createjs.Bitmap(queue.getResult('resetButtonH'));
    resetButtonH.x = 615;
    resetButtonH.y = 655;

    exitButton = new createjs.Bitmap(queue.getResult('exitButton'));
    exitButton.x = 782;
    exitButton.y = 655;

    resetButton.addEventListener("click", resetGame);
    exitButton.addEventListener("click", endGame);

    //Default Reel Images ('icons')
    blank = new createjs.Bitmap(queue.getResult('blank'));
    blank.x = 155;
    blank.y = 298;

    blank2 = new createjs.Bitmap(queue.getResult('blank'));
    blank2.x = 413;
    blank2.y = 298;

    blank3 = new createjs.Bitmap(queue.getResult('blank'));
    blank3.x = 679;
    blank3.y = 298;

    stage.addChild(slotMachineBase, creditsWindow, betWindow, paidWindow, bet1Button, bet10Button, bet5Button, bet50Button, bet100Button, bet500Button, spinButton, resetButton, exitButton, spinButtonH, resetButtonH, exitButtonH, blank, blank2, blank3);

    stage.addChild(slotGame);

}

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all icon tallies */
function resetIconTally() {
    reddit = 0;
    html = 0;
    notepad = 0;
    css = 0;
    linux = 0;
    github = 0;
    ie = 0;
    blanks = 0;
}

/* RESETS: */
/* Utility function to reset the game*/
function resetGame()
{
    //reset player stats
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;

    //reset the Bet Buttons 
    bet1Button.visible = true;
    bet5Button.visible = true;
    bet10Button.visible = true;
    bet50Button.visible = true;
    bet100Button.visible = true;
    bet1500Button.visible = true;

    //reset the reels 
    slotGame.removeChild(reel1);
    slotGame.removeChild(reel2);
    slotGame.removeChild(reel3);

    //return to default images
    reel1 = new createjs.Bitmap(queue.getResult('blank'));
    reel1.x = 169;
    reel1.y = 300;
    slotGame.addChild(reel1);

    reel2 = new createjs.Bitmap(queue.getResult('blank'));
    reel2.x = 426;
    reel2.y = 312;
    slotGame.addChild(reel2);

    reel3 = new createjs.Bitmap(queue.getResult('blank'));
    reel3.x = 679;
    reel3.y = 298;
    slotGame.addChild(reel3);
    
    //update all info
    updateStats();

    stage.update();
}

/* THE FOLLOWING CODE WAS PROVIDED BY TOM!! https://github.com/tsiliopoulos/ */
/* Check to see if the player won the jackpot */
function checkJackPot()
{
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin)
    {

        //Kelly's added sound
        createjs.Sound.play('youWon');
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }

    //update all info
    updateStats();

    stage.update();
}

/* Utility function to show a win message and increase player money */
function showWinMessage() 
{
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetIconTally();
    checkJackPot();

    //update all info
    updateStats();

    stage.update();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() 
{
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetIconTally();

    //update all info
    updateStats();

    stage.update();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) 
{
    if (value >= lowerBounds && value <= upperBounds) 
    {
        return value;
    }
    else 
    {
        return !value;
    }
}
/* When this function is called it determines the betLine results.
e.g. Reddit - GitHub - CSS */
function Reels()
{
    var result;
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];
    for (var spin = 0; spin < 3; spin++)
    {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin])
        {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "reddit";
                reddit++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "html";
                html++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "notepad";
                notepad++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "css";
                css++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "linux";
                linux++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "gitHub";
                github++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "ie";
                ie++;
                break;
        }

    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (reddit == 3)
        {
            winnings = playerBet * 10;
        }
        else if (html == 3) {
            winnings = playerBet * 20;
        }
        else if (notepad == 3)
        {
            winnings = playerBet * 30;
        }
        else if (css == 3)
        {
            winnings = playerBet * 40;
        }
        else if (linux == 3)
        {
            winnings = playerBet * 50;
        }
        else if (github == 3)
        {
            winnings = playerBet * 75;
        }
        else if (ie == 3)
        {
            winnings = playerBet * 100;
        }
        else if (reddit == 2)
        {
            winnings = playerBet * 2;
        }
        else if (html == 2)
        {
            winnings = playerBet * 2;
        }
        else if (notepad == 2)
        {
            winnings = playerBet * 3;
        }
        else if (css == 2)
        {
            winnings = playerBet * 4;
        }
        else if (linux == 2)
        {
            winnings = playerBet * 5;
        }
        else if (github == 2)
        {
            winnings = playerBet * 10;
        }
        else if (ie == 2)
        {
            winnings = playerBet * 20;
        }
        else if (ie == 1)
        {
            winnings = playerBet * 5;
        }
        else
        {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }

}

/* Utility function to start the game */
function startGame()
{
    if(playerMoney == 0)
    {
        createjs.Sound.play('youLose', createjs.Sound.INTERRUPT_NONE);
        if(confirm("Apologies...You have now run out of funds. \nWould you like to re-mortgage your house and play again?"))
        {
            resetGame();
            showPlayerStats();
        }
    }

    else if (playerBet > playerMoney)
    {
        createjs.Sound.play('noMatch', createjs.Sound.INTERRUPT_NONE);
        alert("Apologies...You do not have the funds to cover that bet.");
    }
    
    else if (playerBet <= playerMoney)
    {
        spinResult = Reels();
        
        slotGame.removeChild(reel1);
        slotGame.removeChild(reel2);
        slotGame.removeChild(reel3);

        //display spin results
        reel1 = new createjs.Bitmap(spinResult[0]);
        reel1.x = 169;
        reel1.y = 300;
        slotGame.addChild(reel1);

        reel2 = new createjs.Bitmap(spinResult[1]);
        reel2.x = 426;
        reel2.y = 312;
        slotGame.addChild(reel2);

        reel3 = new createjs.Bitmap(spinResult[2]);
        reel3.x = 679;
        reel3.y = 298;
        slotGame.addChild(reel3);

        determineWinnings();
        turn++;
        updateStats();
        showPlayerStats();

        stage.update();
    }
    else
    {
        alert("Please enter a valid bet amount");
    }

}

/* Utility function to swap out text with new text based on outcome of last spin/turn */
function updateStats()
{
    slotGame.removeChild(creditWindowText);
    creditWindowText = new create.js.Text(playerMoney, "12px Calibri, yellow");
    creditWindowText.x = 117;
    creditWindowText.y = 522;
    slotGame.addChild(creditWindowText);

    slotGame.removeChild(betWindowText);
    betWindowText = new createjs.text(playerBet, "12px Calibri, yellow");
    betWindowText.x = 326;
    betWindowText.y = 522;
    slotGame.addChild(betWindowText);

    slotGame.removeChild(paidWindowText);
    paidWindowText = new createjs.text(winnings, "12px Calibri, yellow");
    paidWindowText.x = 641;
    paidWindowText.y = 522;
    slotGame.addChild(paidWindowText);

    stage.addChild(slotGame);

}

/* Loader Bar functions from "Beginning HTML5 Games with CreateJS" pp26-28 */
function buildLoaderBar()
{
    loaderBar = new createjs.Shape();
    loaderBar.x = loaderBar.y = 100;
    loaderBar.graphics.setStrokeStyle(2);
    loaderBar.graphics.beginStroke("#000");
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH, 40);
    stage.addChild(loaderBar);
}

function updateLoaderBar()
{
    loaderBar.graphics.clear();
    loaderBar.graphics.beginFill('#00ff00');
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH * percentLoaded, 40);
    loaderBar.graphics.endFill();
    loaderBar.graphics.setStrokeStyle(2);
    loaderBar.graphics.beginStroke("#000");
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH, 40);
    loaderBar.graphics.endStroke();
}

function startLoad()
{
    loadInterval = setInterval(updateLoad, 50);
}

function updateLoad()
{
    percentLoaded += .005;
    updateLoaderBar();
    if (percentLoaded >= 1)
    {
        clearInterval(loadInterval);
        stage.removeChild(loaderBar);
    }
}

/* Utility function to position buttons and set values for each */
function betButtons()
{
    bet1Button = new createjs.Bitmap(queue.getResult('bet1Button'));
    bet1Button.x = 125;
    bet1Button.y = 640;
    slotGame.addChild(bet1Button);
    bet1Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet1Button.visible = true;
            playerBet = 1;
            updateStats();
        };
    });

    bet5Button = new createjs.Bitmap(queue.getResult('bet5Button'));
    bet5Button.x = 193;
    bet5Button.y = 640;
    slotGame.addChild(bet5Button);
    bet5Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet5Button.visible = true;
            playerBet = 1;
            updateStats();
        };

    });

    bet10Button = new createjs.Bitmap(queue.getResult('bet10Button'));
    bet10Button.x = 268;
    bet10Button.y = 640;
    slotGame.addChild(bet10Button);
    bet10Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet10Button.visible = true;
            playerBet = 1;
            updateStats();
        };

    });

    bet50Button = new createjs.Bitmap(queue.getResult('bet50Button'));
    bet50Button.x = 125;
    bet50Button.y = 701;
    slotGame.addChild(bet50Button);
    bet50Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet50Button.visible = true;
            playerBet = 1;
            updateStats();
        };

    });

    bet100Button = new createjs.Bitmap(queue.getResult('bet100Button'));
    bet100Button.x = 193;
    bet100Button.y = 701;
    slotGame.addChild(bet100Button);
    bet100Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet100Button.visible = true;
            playerBet = 1;
            updateStats();
        };

    });

    bet500Button = new createjs.Bitmap(queue.getResult('bet500Button'));
    bet500Button.x = 268;
    bet500Button.y = 701;
    slotGame.addChild(bet500Button);
    bet500Button.addEventListener("click", function (event)
    {
        if (!playerBet)
        {
            playerBet = true;
            bet500Button.visible = true;
            playerBet = 1;
            updateStats();
        };

    });
}

