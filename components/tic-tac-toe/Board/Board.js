import React, {useState} from "react";
import Square from "../Square/Square";
import s from './Board.module.scss'

function Board({setScores, size}) {
    const [nodes, setNodes] = useState({});
    const [board, setBoard] = useState(Array(size * size).fill(""));
    const [winLine, setWinLine] = useState([]);

    const gameReset = () => {
        setWinLine([]);
        setBoard(Array(size * size).fill(""));
    };

    const getAvailableMoves = (board) => {
        const moves = [];
        board.forEach((cell, index) => {
            if (!cell) moves.push(index);
        });
        return moves;
    };

    const handleClick = (id) => {
        if (
            isTerminal(board).winner === "X" ||
            isTerminal(board).winner === "O" ||
            isFull(board)
        ) {
            gameReset();
            return;
        }

        if (board[id] !== "") return;

        let editedBoard = [...board];
        editedBoard[id] = "X";

        setBoard(editedBoard);

        if (isTerminal(editedBoard).winner === "X") {
            setWinLine(isTerminal(editedBoard).winLine);
            setScores((prevState) => ({...prevState, x: prevState.x + 1}));
            return;
        }

        let randomNumber = getBestMove(editedBoard, 0, false);
        if (editedBoard[randomNumber] === "") {
            editedBoard[randomNumber] = "O";
        }

        setBoard(editedBoard);

        if (isTerminal(editedBoard).winner === "O") {
            setWinLine(isTerminal(editedBoard).winLine);
            setScores((prevState) => ({...prevState, o: prevState.o + 1}));
            return;
        }

        if (isTerminal(editedBoard).winner === "draw") {
            setScores((prevState) => ({...prevState, tie: prevState.tie + 1}));
        }
    };

    const isEmpty = (board) => {
        return board.every((cell) => !cell);
    };

    const isFull = (board) => {
        return board.every((cell) => cell);
    };

    const isTerminal = (board) => {
        if (isEmpty(board)) return false;

        const winningLength = size >= 5 ? 5 : size;

        // Проверка строк
        for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - winningLength; j++) {
                const startIndex = i * size + j;
                const endIndex = startIndex + winningLength;
                const row = board.slice(startIndex, endIndex);
                if (row.every((cell) => cell === row[0] && cell)) {
                    return {
                        winner: row[0],
                        winLine: Array.from(Array(winningLength), (_, k) => startIndex + k),
                    };
                }
            }
        }

        // Проверка столбцов
        for (let i = 0; i <= size - winningLength; i++) {
            for (let j = 0; j < size; j++) {
                const startIndex = i * size + j;
                const endIndex = startIndex + winningLength * size;
                const column = [];
                for (let k = startIndex; k < endIndex; k += size) {
                    column.push(board[k]);
                }
                if (column.every((cell) => cell === column[0] && cell)) {
                    return {
                        winner: column[0],
                        winLine: Array.from(Array(winningLength), (_, k) => startIndex + k * size),
                    };
                }
            }
        }// Проверка диагоналей
        for (let i = 0; i <= size - winningLength; i++) {
            for (let j = 0; j <= size - winningLength; j++) {
                // Проверка главной диагонали
                let startIndex = i * size + j;
                let endIndex = startIndex + (winningLength - 1) * (size + 1);
                const diagonal1 = [];
                for (let k = startIndex; k <= endIndex; k += size + 1) {
                    diagonal1.push(board[k]);
                }
                if (diagonal1.every((cell) => cell === diagonal1[0] && cell)) {
                    return {
                        winner: diagonal1[0],
                        winLine: Array.from(Array(winningLength), (_, k) => startIndex + k * (size + 1)),
                    };
                }

                // Проверка побочной диагонали
                startIndex = (i + 1) * size - j - 1;
                endIndex = startIndex + (winningLength - 1) * (size - 1);
                const diagonal2 = [];
                for (let k = startIndex; k <= endIndex; k += size - 1) {
                    diagonal2.push(board[k]);
                }
                if (diagonal2.every((cell) => cell === diagonal2[0] && cell)) {
                    return {
                        winner: diagonal2[0],
                        winLine: Array.from(Array(winningLength), (_, k) => startIndex + k * (size - 1)),
                    };
                }
            }
        }

        if (isFull(board)) {
            return {winner: "draw"};
        }

        return false;
    };
    const getBestMove = (newBoard, depth, isMax, callback = () => {
    }) => {
        if (depth === 0) setNodes({});
        if (isTerminal(newBoard) || depth === -1) {
            if (isTerminal(newBoard).winner === "X") {
                return 100 - depth;
            } else if (isTerminal(newBoard).winner === "O") {
                return -100 + depth;
            }
            return 0;
        }

        if (isMax) {
            let best = -100;

            getAvailableMoves(newBoard).forEach((index) => {
                let child = [...newBoard];
                child[index] = "X";

                let score = getBestMove(child, depth + 1, false, callback);
                best = Math.max(best, score);
            });

            return best;
        }

        if (!isMax) {
            let best = 100;

            getAvailableMoves(newBoard).forEach((index) => {
                let child = [...newBoard];
                child[index] = "O";

                let score = getBestMove(child, depth + 1, true, callback);
                best = Math.min(best, score);

                if (depth === 0) {
                    const moves = nodes[score] ? `${nodes[score]},${index}` : index;
                    nodes[score] = moves;
                }
            });
            if (depth === 0) {
                let returnValue;

                if (typeof nodes[best] === "string") {
                    const arr = nodes[best].split(",");
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = nodes[best];
                }
                callback(returnValue);
                return returnValue;
            }
            return best;
        }
    };
    return (
        <div className={s.board} style={{"--size": size}}>
            {board.map((val, i) => {
                return (
                    <Square
                        key={i}
                        id={i}
                        value={val}
                        handleClick={handleClick}
                        board={winLine}
                    />
                );
            })}
        </div>
    );
}

export default Board;