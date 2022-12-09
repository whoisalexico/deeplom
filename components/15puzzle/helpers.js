import {TILE_COUNT, GRID_SIZE} from "./constants";

export const isSolvable = (tiles) => {
    let tile = 1;
    for (let i = 1; i <= TILE_COUNT - 1; i++) {
        for (let j = i + 1; j <= TILE_COUNT; j++) {
            tile *= (tiles[i - 1] - tiles[j - 1]) / (i - j)
        }
    }
    return Math.round(tile) === 1;
}

export const isSolved = (tiles) => {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i)
            return false;
    }
    return true;
}

export const shuffle = (tiles) => {
    const shuffledTiles = [
        ...tiles.filter((tile) => tile !== tiles.length - 1).sort(() => Math.random() - 0.5),
        tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles) ? shuffledTiles : shuffle(shuffledTiles);
}

export const getMatrixPosition = (index) => {
    return {
        row: Math.floor(index / GRID_SIZE),
        col: index % GRID_SIZE,
    };
}

export const isSwappable = (sIndex, fIndex) => {
    const {row: sRow, col: sCol} = getMatrixPosition(sIndex);
    const {row: fRow, col: fCol} = getMatrixPosition(fIndex);
    return Math.abs(sRow - fRow) + Math.abs(sCol - fCol)/* === 1*/;
}

export const swap = (tiles, start, finish) => {
    const tilesResult = [...tiles];
    [tilesResult[start], tilesResult[finish]] = [tilesResult[finish], tilesResult[start]];
    return tilesResult;
}