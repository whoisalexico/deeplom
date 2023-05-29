import React, { useState, useEffect } from 'react';
import Board from './Board';
import {generateShips, placeShipsRandomly} from './ships';
import styles from './styles/Game.module.scss'


const Game = () => {
    const boardSize = 10;
    const [playerBoard, setPlayerBoard] = useState([]);
    const [computerBoard, setComputerBoard] = useState([]);
    const [isPlayersTurn, setIsPlayersTurn] = useState(true);
    const [playerShips, setPlayerShips] = useState([]);
    const [computerShips, setComputerShips] = useState([]);

    useEffect(() => {
        const generatedPlayerShips = generateShips(boardSize);
        placeShipsRandomly(generatedPlayerShips.board, generatedPlayerShips.ships);
        const generatedComputerShips = generateShips(boardSize);
        placeShipsRandomly(generatedComputerShips.board, generatedComputerShips.ships);

        setPlayerBoard(generatedPlayerShips.board);
        setComputerBoard(generatedComputerShips.board);
        setPlayerShips(generatedPlayerShips.ships);
        setComputerShips(generatedComputerShips.ships);
    }, [boardSize]);

    const markAdjacentCells = (board, row, col) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (
                    newRow >= 0 &&
                    newRow < boardSize &&
                    newCol >= 0 &&
                    newCol < boardSize &&
                    board[newRow][newCol] !== 'ship'
                ) {
                    board[newRow][newCol] = 'miss';
                }
            }
        }
    };

    const handleCellClick = (cellId, isPlayerBoard) => {
        if (!isPlayersTurn && isPlayerBoard) return;

        const [row, col] = [Math.floor(cellId / boardSize), cellId % boardSize];
        const board = isPlayerBoard ? playerBoard : computerBoard;
        const newBoard = JSON.parse(JSON.stringify(board));
        const cellStatus = newBoard[row][col];

        if (cellStatus === 'empty') {
            newBoard[row][col] = 'miss';
            setIsPlayersTurn(!isPlayersTurn);
        } else if (cellStatus === 'ship') {
            newBoard[row][col] = 'hit';

            // Проверяем, есть ли корабль, соответствующий данной ячейке, и обновляем его количество попаданий
            const ships = isPlayerBoard ? playerShips : computerShips;
            const ship = ships.find((ship) => ship.id === cellId);
            if (ship) {
                ship.hits++;

                if (ship.hits === ship.size) {
                    markAdjacentCells(newBoard, row, col);
                }
            }

            setIsPlayersTurn(isPlayerBoard); // Если игрок попал в корабль, то он продолжает свой ход
        }

        if (isPlayerBoard) {
            setPlayerBoard(newBoard);
        } else {
            setComputerBoard(newBoard);
        }
    };

    return (
        <div className={styles.game}>
            <h1 className={styles.gameTitle}>Морской Бой</h1>
            <div className={styles.boardsContainer}>
                {playerBoard.length && computerBoard.length ? (
                    <>
                        <div className={styles.playerBoard}>
                            <h2 className={styles.boardTitle}>Игрок</h2>
                            <Board
                                boardSize={boardSize}
                                cells={playerBoard}
                                handleCellClick={(cellId) => handleCellClick(cellId, true)}
                                isComputer={false}
                            />
                        </div>
                        <div className={styles.computerBoard}>
                            <h2 className={styles.boardTitle}>Компьютер</h2>
                            <Board
                                boardSize={boardSize}
                                cells={computerBoard}
                                handleCellClick={(cellId) => handleCellClick(cellId, false)}
                                isComputer={true}
                            />
                        </div>
                    </>
                ) : (
                    <div className={styles.loadingMessage}>Загрузка...</div>
                )}
            </div>
        </div>
    );
};

export default Game;