import React, {useState} from 'react';
import Board from "./Board";
import s from './TicTacToe.module.scss'

const Game = () => {
    const [size, setSize] = useState(3);
    const [history, setHistory] = useState([{squares: Array(size * size).fill(null)}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const handleChangeSize = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setSize(newSize);
        setHistory([{squares: Array(newSize * newSize).fill(null)}]);
        setStepNumber(0);
        setXIsNext(true);
    };
    const calculateWinner = (squares, size) => {
        const winLength = size > 5 ? 5 : size;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (squares[i * size + j]) {
                    if (
                        checkLine(squares, size, i, j, 1, 0, winLength) ||
                        checkLine(squares, size, i, j, 0, 1, winLength) ||
                        checkLine(squares, size, i, j, 1, 1, winLength) ||
                        checkLine(squares, size, i, j, 1, -1, winLength)
                    ) {
                        return squares[i * size + j];
                    }
                }
            }
        }

        return null;
    };

    const checkLine = (squares, size, x, y, dx, dy, winLength) => {
        const start = squares[x * size + y];
        let count = 1;

        for (let i = 1; i < size; i++) {
            const newX = x + i * dx;
            const newY = y + i * dy;
            if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
                break;
            }

            if (squares[newX * size + newY] === start) {
                count++;
                if (count === winLength) {
                    return true;
                }
            } else {
                count = 1;
            }
        }

        return false;
    };

    const handleClick = (i) => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares, size) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";
        setHistory(currentHistory.concat([{squares}]));
        setStepNumber(currentHistory.length);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setHistory([{squares: Array(size * size).fill(null)}]);
        setStepNumber(0);
        setXIsNext(true);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, size);

    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <div className={s.ticTacToe}>
            <div className={s.sizeSelector}>
                <label htmlFor="size">Board size: </label>
                <input type="number" id="size" value={size} min="3" max="10" onChange={handleChangeSize}/>
            </div>
            <div className={s.gameBoard}>
                <Board size={size} squares={current.squares} onClick={handleClick}/>
            </div>
            <div className={s.gameInfo}>
                {winner ? (
                    <button onClick={resetGame}>Start new game</button>) : (<div>{status}</div>
                )}
            </div>
        </div>
    );
};

export default Game;