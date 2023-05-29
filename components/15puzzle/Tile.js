import React from 'react';
import {TILE_COUNT} from "./constants";
import styles from './Tile.module.scss'


const Tile = ({tile, index, tileClick}) => {
    console.log(tile, index);
    return (
        <li className={tile !== index ? styles.tile : styles.correctTile} onClick={() => tileClick(index)} style={{
            opacity: tile === TILE_COUNT - 1 ? 0 : 1, border: "2px solid black"
        }}>
            {`${tile + 1}`}
        </li>

    );
};

export default Tile;