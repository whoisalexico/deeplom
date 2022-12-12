import React from 'react';
import Head from 'next/head'
import Navbar from "../../components/site-components/navbar";
import Board from "../../components/15puzzle/Board";
import styles from "../../styles/Puzzle15.module.scss"
const Puzzle15 = () => {
    return (
        <>
            <Head>
                <title>15Puzzle Game</title>
                <meta name="description" content="15Puzzle Game"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <div className={styles.puzzleWrapper}>
                <Board/>
            </div>
        </>
    );
};

export default Puzzle15;