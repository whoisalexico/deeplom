import React from 'react';
import Link from "next/link";
import Head from "next/head";
import {resetGame} from "../components/chess/redux/gameSlice";
import {useAppDispatch} from "../components/chess/redux/hooks";
import Navbar from "../components/layout/navbar";
import styles from "../styles/games.module.scss";
const Games = () => {
    return (
        <>
            <Head>
                <title>Games</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <div className={styles.games}>
                <ul>
                    <li><Link href={"/games/chess"} onClick={() => useAppDispatch(resetGame())}>Chess</Link></li>
                    <li><Link href={"/games/flipcard"}>Flip cards</Link></li>
                    <li><Link href={"/games/puzzle15"}>15 Puzzle</Link></li>
                    <li><Link href={"/games/tic-tac-toe"}>Tic-Tac Toe</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Games;