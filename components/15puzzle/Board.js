import React, {useState} from 'react';
import {isSolved, isSwappable, shuffle, swap} from "./helpers";
import Tile from "./Tile";
import {BOARD_SIZE, GRID_SIZE} from "./constants";
import styles from './Board.module.scss';
import Link from "next/link";

const Board = () => {
    const [tiles, setTiles] = useState([...Array(16).keys()]);
    const [isStarted, setIsStarted] = useState(false);

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
                <div className={styles.newGameWrapper}>
                    <button onClick={() => start()}>Start New Game</button>
                </div>
            ) : (
                isWon && isStarted ? (
                    <div className={styles.win}>
                        <p>You win. Congratulations!</p>
                        <div className={styles.buttons}>
                            <Link href={"/games"}>
                                <button className={styles.navigationButton}>Back to menu</button>
                            </Link>
                            <button className={styles.navigationButton} onClick={() => shuffleClick()}>Play Again</button>
                        </div>
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
                        <button onClick={() => shuffleClick()}>Reset</button>
                    </div>
                )
            )}
        </>
    );
};

export default Board;