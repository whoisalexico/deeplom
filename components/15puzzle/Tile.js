import React from 'react';
import {TILE_COUNT} from "./constants";
import styles from './Tile.module.scss'


const Tile = ({tile, index, tileClick}) => {
    return (
        <li className={styles.tile} onClick={() => tileClick(index)} style={{
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
        }}>
            {`${tile + 1}`}
        </li>

    );
};

export default Tile;