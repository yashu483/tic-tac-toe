"use strict";


// gameboard module which handles creating a proper gameboard

const Gameboard = (function () {
    let gameboard = [];

    const createCell = function () {
        let playerValue = 0;

        const setPlayerValueToCell = function (value) {
            playerValue = value;
        };

        const getPlayerValueOfCell = function () {
            return playerValue;
        }

        return {
            getPlayerValueOfCell,
            setPlayerValueToCell
        }
    };

    const createGameBoard = function () {
        gameboard = [];
        for (let i = 0; i < 9; i++) {
            let cell = createCell();
            cell.id = i + 1;
            gameboard.push(cell);
        }
    };
    const printBoard = function () {
        let tempBoard = gameboard;

        let firstRow = tempBoard.filter((item, index) => {
            let result = false;
            if (index < 3) { return result = true }
            return result;
        });

        let middleRow = tempBoard.filter((item, index) => {
            let result = false;
            if (index > 2 && index < 6) {
                result = true;
            }
            return result;
        });
        let thirdRow = tempBoard.filter((item, index) => {
            let result = false;
            if (index > 5 && index < 9) {
                result = true;
            }
            return result;
        });
        let printableArray = new Array(firstRow, middleRow, thirdRow);
        // console.log(printableArray)


        printableArray.forEach((row) => {
            console.log(row.map((cells) => {
                return cells.getPlayerValueOfCell()
            }).join(" "));
        });

        // console.log(printableArray[0][0].getPlayerValueOfCell())
        // const boardWithPlayerValues = printableArray.map((row) => {
        //     row.map((cell) => cell.getPlayerValueOfCell());
        // })
        //          const printBoard = () => {
        //     const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        //     console.log(boardWithCellValues);
        //   };
        // console.log(boardWithPlayerValues)
        // console.table(boardWithPlayerValues)
    }
    const getGameBoard = () => { return gameboard }

    return {
        createGameBoard,
        getGameBoard,
        printBoard
    }
})();

// create a function for creating players and handling all player data

const Players = (function () {
    let players = [];

    const addNewPlayer = function (name) {
        let playerId = 0;

        if (players.length == 2) {
            return "Number of needed players exceed. Only 2 player needed."
        }
        else if (players.length === 0) {
            playerId = 1;
        }
        else {
            playerId = 2;
            console.log(`Now you can start the game. It's player 1 turn. Use GameController.playGame(cell) method to put your choice`)
        }

        let playerOwnedCells = [];

        const addToken = function (token) {
            playerOwnedCells.push(token);
        };
        const getPlayerId = function () { return playerId };
        const knowPlayerOwnedTokens = function () { return playerOwnedCells };

        return players.push({
            addToken,
            getPlayerId,
            knowPlayerOwnedTokens,
            name
        });
    };

    const removeAllPlayers = function () {
        if (!GameController.getGameState()) {
            if (confirm(`Removing players before game ends will restart the game. Do you want to continue?`)) {
                players = [];
                GameController.restartGame();
                console.log(`All players removed. Use same Players.addNewPlayer(name) method to add your players.`)
            } else return;
        } else {
            players = [];
            GameController.restartGame();
            console.log(`All players removed. Use same Players.addNewPlayer(name) method to add your players.`)
        }
    }
    const getAllPlayers = function () { return players };

    return {
        addNewPlayer,
        getAllPlayers,
        removeAllPlayers
    }

})();


// create a Playgame module 

const GameController = (function () {
    const allWinningConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    const checkIfAnyPlayerWon = function (player1, player2) {
        function checkIfThisPlayerWon(player) {
            let answer = allWinningConditions.some((arr) => {
                let thisResult = arr.every((item) => {
                    if (player.includes(item)) return true;
                });

                return thisResult;
            });
            return answer;
        };

        let result = 0;
        if (checkIfThisPlayerWon(player1.knowPlayerOwnedTokens())) {
            result = 1;
        }
        else if (checkIfThisPlayerWon(player2.knowPlayerOwnedTokens())) {
            result = 2
        }
        else result = 0;
        return result;

    };

    let currentPlayer = 1;
    const getCurrentPlayer = function () { return currentPlayer };
    const switchPlayerTurn = function () {
        return currentPlayer = currentPlayer === 1 ? 2 : 1;
    };


    let gameState = false; // gameState being false indicate game haven't won by anyone yet, true indicate a player have won it.
    let currentWinner = 0;
    const playGame = function (cell) {
        let currentCell = Gameboard.getGameBoard()[cell - 1];

        if (Players.getAllPlayers().length < 2) { return console.log("Please add 2 player names using 'Player.addNewPlayer(name) method' ") }
        else if (currentCell.getPlayerValueOfCell() !== 0) { return console.log(`Cell is already taken by Player ${currentCell.getPlayerValueOfCell()}. Choose another.`) }
        else if (gameState) { console.log(`Game has ended.Player ${currentWinner} has won the game. Use GameController.restartGame() to restart.`) }
        else {
            currentCell.setPlayerValueToCell(currentPlayer);
            Players.getAllPlayers()[currentPlayer - 1].addToken(cell);
            currentWinner = checkIfAnyPlayerWon(Players.getAllPlayers()[0], Players.getAllPlayers()[1]);
            switchPlayerTurn();
            Gameboard.printBoard();

            switch (currentWinner) {
                case 2:
                case 1: gameState = true;
                    console.log(`Player ${currentWinner} has won the game. Use GameController.restartGame() to restart.`);
                    break;
                case 0: gameState = false;
                    console.log(`Now Player ${currentPlayer}'s turn`)
            }
        }


    };

    const restartGame = function () {
        currentPlayer = 1;
        Gameboard.createGameBoard();
        gameState = false;
        console.log(`Game restarted. Now player 1's turn. You can use Players.removeAllPlayers() for removing the players and adding new ones.`)
    };

    const getGameState = function () { return gameState };

    return {
        getGameState,
        playGame,
        restartGame,
        getCurrentPlayer,
        switchPlayerTurn,
    }
})();

console.log(`Start game with GameBoard.createBoard(). 
    Then add 2 players by  Player.addNewPlayer(name) 
     and then play the game with choosing your cell by number from 1 to 9 using GameController.playGame(cell)`);

// function fun(arr, b) {
//     let result = arr.some((a) => {
//         let everyResult = a.every((item) => {
//             if (b.includes(item)) return true;
//         });
//         return everyResult;
//     })
//     return result;
// }