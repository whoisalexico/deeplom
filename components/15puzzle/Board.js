import React, {useState} from 'react';
import {isSolved, isSwappable, shuffle, swap} from "./helpers";
import Tile from "./Tile";
import {BOARD_SIZE, GRID_SIZE} from "./constants";
import styles from './Board.module.scss';
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";
import {useTranslation} from "next-i18next";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const Board = () => {
    const [tiles, setTiles] = useState([...Array(16).keys()]);
    const [isStarted, setIsStarted] = useState(false);
    const {user} = useAuth();
    const game = 'Tags';
    const pts = Math.floor(Math.random() * (1500 - 1000) + 1000);
    const {t} = useTranslation("common")


    const setPoints = async (pts, game) => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("id", "==", user.uid))
            const snap = await getDocs(q);
            let nickname;
            snap.forEach((doc) => {
                const data = doc.data();
                nickname = data.nickname;
            })
            const docRef = await addDoc(collection(db, "TagsLeaderboard"), {
                nickname: nickname,
                game: game,
                score: pts,
            })
        } catch (e) {

        }

    }

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }

    const swapTiles = (index) => {
        if (isSwappable(index, tiles.indexOf(tiles.length - 1))) {
            const swappedTiles = swap(tiles, index, tiles.indexOf(tiles.length - 1));
            setTiles(swappedTiles);
        }
    }

    const tileClick = (index) => {
        swapTiles(index);
    }

    const shuffleClick = () => {
        shuffleTiles();
    }

    const start = () => {
        shuffleTiles();
        setIsStarted(true);
    }
    const isWon = isSolved(tiles);

    return (
        <>

            {!isStarted ? (
                    <div className={styles.modal}>
                        <p>{t("puzzle")}</p>
                        <button className={styles.button} onClick={() => start()}>{t("startnewgame")}</button>
                    </div>
            ) : (
                isWon && isStarted ? (
                    <div className={styles.modal}>
                        <p>{t("uwon")}</p>
                        <Link href={"/games"} onClick={() => setPoints(pts, game)}>{t("backtogames")}</Link>
                        <Link href="tags" onClick={() => shuffleClick()}>{t("playagain")}</Link>
                    </div>
                ) : (
                    <div className={styles.gameWrapper}>
                        <div className={styles.puzzleWrapper}>
                            <ul className={styles.board}>
                                {tiles.map((tile, index) => (
                                    <Tile key={tile} tile={tile} index={index} tileClick={tileClick}/>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => shuffleClick()}>{t("reset")}</button>
                    </div>
                )
            )}
        </>
    );
};

export default Board;