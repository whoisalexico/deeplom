import React, { useState } from 'react';
import styles from '../../styles/TicTacToe.module.scss'
const Board = () => {
    const [boardSize, setBoardSize] = useState(3);
    const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [opponent, setOpponent] = useState('human');
    const [loading, setLoading] = useState(false);

    const handleCellClick = (index) => {
        if (board[index] !== null || winner !== null || loading) {
            return;
        }
        setBoard((board) => {
            board[index] = player;
            return board;
        });
        setPlayer(player === 'X' ? 'O' : 'X');
        if (opponent === 'computer' && player === 'X') {
            getComputerMove(board);
        }
    };

    const calculateWinner = (board, boardSize) => {
        for (let i = 0; i < boardSize; i++) {
            const startIndex = i * boardSize;
            const row = board.slice(startIndex, startIndex + boardSize);
            if (row.every((cell) => cell === row[0])) {
                return row[0];
            }
        }

        for (let i = 0; i < boardSize; i++) {
            const column = [];
            for (let j = 0; j < boardSize; j++) {
                column.push(board[j * boardSize + i]);
            }
            if (column.every((cell) => cell === column[0])) {
                return column[0];
            }
        }

        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < boardSize; i++) {
            diagonal1.push(board[i * boardSize + i]);
            diagonal2.push(board[i * boardSize + (boardSize - 1 - i)]);
        }
        if (diagonal1.every((cell) => cell === diagonal1[0])) {
            return diagonal1[0];
        }
        if (diagonal2.every((cell) => cell === diagonal2[0])) {
            return diagonal2[0];
        }

        const emptyCells = board.filter((cell) => cell === null);
        if (emptyCells.length === 0) {
            return 'draw';
        }

        return null;
    };

    const getComputerMove = (board) => {
        const depth = board.filter((cell) => cell === null).length;
        setTimeout(() => {
            const result = minimax(board, 'O', depth);
            setBoard(board => {
                board[result.index] = 'O';
                return board;
            });
            setPlayer('X');
        }, 100);
    };

    const minimax = (board, player, depth) => {
        const winner = calculateWinner(board, boardSize);
        if (winner !== null) {
            if (winner === 'X') {
                return { score: -10 };
            } else if (winner === 'O') {
                return { score: 10 };
            } else {
                return { score: 0 };
            }
        }if (depth === 0) {
            return { score: 0 };
        }

        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                emptyCells.push(i);
            }
        }

        const moves = [];
        for (let i = 0; i < emptyCells.length; i++) {
            const move = {};
            move.index = emptyCells[i];
            board[emptyCells[i]] = player;

            if (player === 'O') {
                const result = minimax(board, 'X', depth - 1);
                move.score = result.score;
            } else {
                const result = minimax(board, 'O', depth - 1);
                move.score = result.score;
            }

            board[emptyCells[i]] = null;
            moves.push(move);
        }

        let bestMove;
        if (player === 'O') {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    };

    const handleBoardSizeChange = (event) => {
        const size = parseInt(event.target.value);
        setBoardSize(size);
        setBoard(Array(size * size).fill(null));
        setWinner(null);
        setPlayer('X');
    };

    const handleOpponentChange = (event) => {
        const opponent = event.target.value;
        setOpponent(opponent);
        setWinner(null);
        setPlayer('X');
        setBoard(Array(boardSize * boardSize).fill(null));
    };

    const renderCell = (index) => {
        return (
            <div key={index} className={styles.cell} onClick={() => handleCellClick(index)}>
                {board[index]}
            </div>
        );
    };

    return (
        <div className="game">
            <div className="options">
                <label>
                    Размер поля:
                    <select value={boardSize} onChange={handleBoardSizeChange}>
                        <option value="3">3x3</option>
                        <option value="4">4x4</option>
                        <option value="5">5x5</option>
                    </select>
                </label>
                <label>
                    Оппонент:
                    <select value={opponent} onChange={handleOpponentChange}>
                        <option value="human">Человек</option>
                        <option value="computer">Компьютер</option>
                    </select>
                </label>
            </div>
            <div className={styles.board}>
                {board.map((cell, index) => renderCell(index))}
            </div>
            {winner !== null && (
                <div className="winner">
                    {winner === 'draw' ? 'Ничья!' : `Победил ${winner}!`}
                </div>
            )}
        </div>
    );
};

export default Board;