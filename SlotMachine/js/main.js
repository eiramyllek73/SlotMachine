/// <reference path="jquery.js" />
var playerMoney = 1000;
var jackpot = 500;
var turn = 0;
var playerBet = 0;
var previousBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
function showPlayerStats() {
    var winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
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
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 26):
                betLine[spin] = "blank";
                break;
            case checkRange(outCome[spin], 27, 36):
                betLine[spin] = "Grapes";
                break;
            case checkRange(outCome[spin], 37, 45):
                betLine[spin] = "Banana";
                break;
            case checkRange(outCome[spin], 46, 53):
                betLine[spin] = "Orange";
                break;
            case checkRange(outCome[spin], 54, 58):
                betLine[spin] = "Cherry";
                break;
            case checkRange(outCome[spin], 59, 61):
                betLine[spin] = "Bar";
                break;
            case checkRange(outCome[spin], 62, 63):
                betLine[spin] = "Bell";
                break;
            case checkRange(outCome[spin], 64, 65):
                betLine[spin] = "Seven";
                break;
        }
    }
    return betLine;
}
function pullTheHandle() {
    /* Calculate win or loss */
}
$("#spinButton").click(function () {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    $("div#result>p").text(fruits);
    playerBet = $("div#betEntry>input").val();
    playerMoney -= playerBet;
    pullTheHandle();
    turn++;
    showPlayerStats();
});