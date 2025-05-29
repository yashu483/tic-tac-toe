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

    const createGameboard = function () {
        gameboard = [];
        for (let i = 0; i < 9; i++) {
            let cell = createCell();
            cell.id = i + 1;
            gameboard.push(cell);
        }
    };

    const getGameboard = () => { return gameboard }

    return {
        createGameboard,
        getGameboard
    }
})();

// create a function for creating players and handling all player data

const Players = (function () {
    let players = [];

    const addNewPlayer = function (name) {
        let playerId = 0;

        if(players.length ==2){
            return "Number of needed players exceeds. Only 2 player needed."
        }
       else  if (players.length === 0) {
            playerId = 1;
        }
        else playerId = 2;

        let playerOwnedCells = [];

        const addToken = function (token) {
            playerOwnedCells.push(token);
        };
        const getPlayerId = function(){return playerId};
        const knowPlayerOwnedTokens = function () { return playerOwnedCells };

        return{
            addToken, 
            getPlayerId,
            knowPlayerOwnedTokens,
            name
        }
    };

    const getAllPlayers = function (){return players};

    return{addNewPlayer,
        getAllPlayers
    }

})();


