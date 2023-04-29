import React from "react";
import Square from "./Square";
import s from './TicTacToe.module.scss'

const Board = ({ size, squares, onClick }) => {
    const renderSquare = (i) => (
        <Square value={squares[i]} onClick={() => onClick(i)} />
    );

    const rows = Array.from({ length: size }, (_, rowIndex) => (
        <div key={rowIndex} className={s.boardRow}>
            {Array.from({ length: size }, (_, colIndex) => renderSquare(rowIndex * size + colIndex))}
        </div>
    ));

    return <div>{rows}</div>;
};

export default Board;