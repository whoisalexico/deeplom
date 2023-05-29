import React from 'react';
import s from './TicTacToe.module.scss'
const Square = ({ value, onClick }) => {
    return (
        <button className={s.square} onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;