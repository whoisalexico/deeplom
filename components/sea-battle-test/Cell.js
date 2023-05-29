import React from 'react';
import styles from './styles/Cell.module.scss'

const Cell = ({ id, status, handleCellClick, isComputer }) => {
    const getClassName = () => {
        switch (status) {
            case 'empty':
                return styles.empty;
            case 'ship':
                return isComputer ? styles.empty : styles.ship;
            case 'hit':
                return styles.hit;
            case 'miss':
                return styles.miss;
            default:
                return '';
        }
    };

    return (
        <div
            className={`${styles.cell} ${getClassName()}`}
            onClick={() => handleCellClick(id)}
        >
            {status === 'ship' && !isComputer && '🚢'}
            {status === 'hit' && '💥'}
            {status === 'miss' && '❌'}
        </div>
    );
};

export default Cell;