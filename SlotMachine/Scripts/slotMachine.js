///REFERENCE PATHS:
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
**/

/* Variables for all images and text: */

//1:  Variables for Slot Machine structure:

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

//2:  changeable information variables:
var creditWindowText;
var betWindowText;
var paidWindowText;

var winRatioText;
var playerTurnText;

//3:  Value Amount variables:

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


/* Preload function for game */
function init()
{
    canvas = document.getElementById("slotCanvas");
    stage = new createjs.Stage(canvas);

    //Allow hovering
    stage.enableMouseOver();
    queue = new createjs.LoadQueue(false);

    //Install sound plugin for formats included 
    queue.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["wav"];
    createjs.Sound.alternateExtensions = ["mp3"];
  
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

    queue.on("complete", handleTick);
}

/* Utility Function for animations - some borrowed from EASELJS API http://www.createjs.com/Docs/EaselJS/files/easeljs_utils_Ticker.js.html#l340*/
function handleTick(event)
{
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    stage.update();
    loadSlotMachine();
}

/* Utility Function to set up GUI */
function loadSlotMachine()
{
    createjs.
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

/* RESETS: */

/* Utility function to reset the Bet Buttons */
function resetBetButtons()
{
    bet1Button.visible = true;
    bet5Button.visible = true;
    bet10Button.visible = true;
    bet50Button.visible = true;
    bet100Button.visible = true;
    bet1500Button.visible = true;
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

/* Utility function to reset the reels */
function resetReels()
{
    slotGame.removeChild(reel1);
    slotGame.removeChild(reel2);
    slotGame.removeChild(reel3);
    

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
}


/* Utility function to reset the player stats */
function resetStats() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;

    //update all info
    updateStats();
}


/* THE FOLLOWING CODE WAS PROVIDED BY TOM!! https://github.com/tsiliopoulos/ */

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {

        //Kelly's added sound
        createjs.Sound.play('youWon');
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
     
    //update all info
    updateStats();
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetIconTally();
    checkJackPot();

    //update all info
    updateStats();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetIconTally();

    //update all info
    updateStats();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Reddit - GitHub - CSS */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Reddit";
                reddit++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "HTML";
                html++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Notepad";
                notepad++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "CSS";
                css++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Linux";
                linux++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "GitHub";
                github++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "IE10";
                ie++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (reddit == 3) {
            winnings = playerBet * 10;
        }
        else if (html == 3) {
            winnings = playerBet * 20;
        }
        else if (notepad == 3) {
            winnings = playerBet * 30;
        }
        else if (css == 3) {
            winnings = playerBet * 40;
        }
        else if (linux == 3) {
            winnings = playerBet * 50;
        }
        else if (github == 3) {
            winnings = playerBet * 75;
        }
        else if (ie == 3) {
            winnings = playerBet * 100;
        }
        else if (reddit == 2) {
            winnings = playerBet * 2;
        }
        else if (html == 2) {
            winnings = playerBet * 2;
        }
        else if (notepad == 2) {
            winnings = playerBet * 3;
        }
        else if (css == 2) {
            winnings = playerBet * 4;
        }
        else if (linux == 2) {
            winnings = playerBet * 5;
        }
        else if (github == 2) {
            winnings = playerBet * 10;
        }
        else if (ie == 2) {
            winnings = playerBet * 20;
        }
        else if (ie == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        icons = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(icons);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }

});
