import React, { useEffect, useState } from 'react';
import s from './SeaBattle.module.scss'

const ShipTypes = [
    ['Линкор', 4, 1],
    ['Крейсер', 3, 2],
    ['Эсминец', 2, 3],
    ['Катер', 1, 4],
];


const Game = () => {
    const [playerField, setPlayerField] = useState([]);
    const [computerField, setComputerField] = useState([]);
    const [playerShips, setPlayerShips] = useState([]);
    const [computerShips, setComputerShips] = useState([]);
    const [copmuterHitCoordsArray, setComputerCoordsArray] = useState([]);

    const getMatrix = () => {
        let x = 10,
            y = 10;
        let matrix = [];
        for (let i = 0; i < x; i++) {
            matrix[i] = [];
            for (let j = 0; j < 10; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }

    const getRandom = (n) => {
        return Math.floor(Math.random() * (n + 1));
    }


    const generateRandomField = (ships, userShips)=>{
        let ok = 0;
        const field = getMatrix();
        let x,y;
        let direction;
        let shipCounter = 0;
        for (let i = 0; i < 4; i++) {
            let shipLength = ships[i][1];
            let shipCount = ships[i][2];

            for (let j = 0; j < shipCount; j++) {
                ok = 0;
                shipCounter++;
                userShips[shipCounter] = []; // [x, y, bool kill marker]
                while (ok === 0) {
                    direction = getRandom(1) ? 'vertical' : 'horizontal';
                    x = getRandom(9);
                    y = getRandom(9);
                    if (direction === 'vertical') {
                        if (checkShipPlace(field, x, y, direction, shipLength)) {
                            for (var k = 0; k < shipLength; k++) {
                                field[x + k][y] = 1;
                                userShips[shipCounter].push([x + k, y, 0]); // массив кораблей с координатами
                            }
                            ok = 1;
                        }
                    }
                    if (direction === 'horizontal') {
                        if (checkShipPlace(field, x, y, direction, shipLength)) {
                            for (var l = 0; l < shipLength; l++) {
                                field[x][y + l] = 1;
                                userShips[shipCounter].push([x, y + l, 0]); // массив кораблей с координатами
                            }
                            ok = 1;
                        }
                    }
                } // end while
            }
        } // end loop
        return field;
    }

    return (
        <div>
            <h1>Морской бой</h1>
            <div className={s.game_container}>
                <h2>Ваше поле</h2>
                <div className={s.player_field}>
                    {playerField.map((row, rowIndex) => (
                        <div key={rowIndex} className={s.row}>
                            {row.map((cell, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className={`${s.cell} ${cell === 1 ? s.ship : cell === 2 ? s.miss : cell === 3 ? s.hit : ''}`}
                                    onClick={() => handleCellClick(rowIndex, cellIndex)}
                                > </div>
                            ))}
                        </div>
                    ))}
                </div>
                <h2>Поле компьютера</h2>
                <div className={s.computer_field}>
                    {computerField.map((row, rowIndex) => (
                        <div key={rowIndex} className={s.row}>
                            {row.map((cell, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className={`${s.cell} ${cell === 2 ? s.miss : cell === 3 ? s.hit : ''}`}
                                > </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;