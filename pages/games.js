import React from 'react';
import Link from "next/link";
import {resetGame} from "../components/chess/redux/gameSlice";
import {useAppDispatch} from "../components/chess/redux/hooks";
import Navbar from "../components/site-components/navbar";
import styles from "../styles/games.module.scss";

const Games = () => {
    return (
        <>
            <Navbar/>
            <div className={styles.games}>
                <ul>
                    <li><Link href={"/games/chess"} onClick={() => useAppDispatch(resetGame())}>Chess</Link></li>
                    <li><Link href={"/games/flipcard"}>Flip cards</Link></li>
                    <li><Link href={"/games/puzzle15"}>15 Puzzle</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Games;