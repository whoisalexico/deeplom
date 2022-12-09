import React from 'react';
import Navbar from "../../components/site-components/navbar";
import Board from "../../components/15puzzle/Board";
import styles from "../../styles/Puzzle15.module.scss"
const Puzzle15 = () => {
    return (
        <>
            <Navbar/>
            <div className={styles.puzzleWrapper}>
                <Board/>
            </div>
        </>
    );
};

export default Puzzle15;