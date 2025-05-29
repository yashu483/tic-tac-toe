"use strict";

const Gameboard = (function () {
    let gameboard = [];

    const createGameboard = function () {
        for (let i = 1; i <= 9; i++) {
            gameboard.push(createCells());
            gameboard[i - 1].id = i;
        };
    };

    const restartGameboard = function () {
        gameboard = [];
        for (let i = 1; i <= 9; i++) {
            gameboard.push(createCells());
            gameboard[i - 1].id = i;
        };
    };

    const addToken = function (cell, playerValue) {
        gameboard.forEach((item) => {
            console.log(item.id)
            if (item.id == cell) {
                console.log(true)
                if (item.getValue() == 0) {
                    return item.setValue(playerValue);
                } else return "This cell is already taken."
            }
            else return;
        })
    }

    const getGameboard = () => gameboard;

    const checkWinningCondition = function () {
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
        let currentWinningPlayer = 0;
        playersHandler.getAllPlayers().forEach((playerObj) => {
            if (playerObj.playersOwnedCells.every((item) => {
                allWinningConditions.every((conditions) => {
                    if (conditions.includes(item)) {
                        return true;
                    } else return false;
                })
            })) {
                currentWinningPlayer = playerObj
            }
        })

    }

    return { createGameboard, restartGameboard, getGameboard, addToken };
})();


const createCells = function () {
    let value = 0;
    const setValue = (playerValue) => value = playerValue;
    const getValue =function () {return value}

    return {
        setValue,
        getValue
    };
};

const playersHandler = (function () {
    const allPlayers = [];
    const addPlayer = function (name) {
        switch (allPlayers.length) {
            case 0: allPlayers.push({
                name: name,
                id: 1,
                playersOwnedCells: []
            });
                break;
            case 1: allPlayers.push({
                name,
                id: 2,
                playersOwnedCells: []
            });
                break;
            default: return;
        }
    }
    const getPlayerOwnedCells = function (playerNumber) {
        return allPlayers[playerNumber];
    }
    const getAllPlayers = () => allPlayers;

    return {
        addPlayer,
        getAllPlayers,
        getPlayerOwnedCells
    };
})();


const GameHandler = (function () {
    const startGame = function () {
        Gameboard.createGameboard();
        console.log("Game has started. Be ready!")
    };

    let activePlayer = playersHandler.getAllPlayers()[0];

    const switchPlayerTurn = function () {
        activePlayer = activePlayer === playersHandler.getAllPlayers()[0] ? playersHandler.getAllPlayers[1] : playersHandler.getAllPlayers[0];
    };

    const playThisTurn = function (cell) {
        if (cell < 10 && cell > 0) {
            Gameboard.addToken(cell, activePlayer);
        } else console.log("there no such cell exists in the game!");

        switchPlayerTurn();
        console.log(`Now ${activePlayer}'s turn`);
    }

    return {
        startGame,
        playThisTurn
    }
})()