import React from 'react';
import Cell from './Cell';
import styles from './styles/Board.module.scss'

const Board = ({ boardSize, cells, handleCellClick, isComputer }) => {
    const boardCells = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
        boardCells.push(
            <Cell
                key={i}
                id={i}
                status={cells[Math.floor(i / boardSize)][i % boardSize]}
                handleCellClick={() => handleCellClick(i)}
                isComputer={isComputer}
            />
        );
    }

    return <div className={styles.board}>{boardCells}</div>;
};

export default Board;
