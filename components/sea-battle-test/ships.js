const generateEmptyBoard = (boardSize) => {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
        board.push(new Array(boardSize).fill('empty'));
    }
    return board;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isPositionValid = (board, shipSize, row, col, isHorizontal) => {
    const boardSize = board.length;

    for (let i = -1; i <= shipSize; i++) {
        const currentRow = row + (isHorizontal ? 0 : i);
        const currentCol = col + (isHorizontal ? i : 0);

        if (
            currentRow < 0 ||
            currentRow >= boardSize ||
            currentCol < 0 ||
            currentCol >= boardSize
        ) {
            continue;
        }

        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                const newRow = currentRow + j;
                const newCol = currentCol + k;

                if (
                    newRow >= 0 &&
                    newRow < boardSize &&
                    newCol >= 0 &&
                    newCol < boardSize &&
                    board[newRow][newCol] !== 'empty'
                ) {
                    return false;
                }
            }
        }
    }

    return true;
};

const placeShipRandomly = (board, shipSize) => {
    const boardSize = board.length;
    let row, col, isHorizontal;

    do {
        isHorizontal = Math.random() < 0.5;
        row = getRandomInt(0, boardSize - (isHorizontal ? 1 : shipSize));
        col = getRandomInt(0, boardSize - (isHorizontal ? shipSize : 1));
    } while (!isPositionValid(board, shipSize, row, col, isHorizontal));

    for (let i = 0; i < shipSize; i++) {
        board[row + (isHorizontal ? 0 : i)][col + (isHorizontal ? i : 0)] = 'ship';
    }
};

export const placeShipsRandomly = (board, ships) => {
    ships.forEach((ship) => {
        for (let i = 0; i < ship.count; i++) {
            placeShipRandomly(board, ship.size);
        }
    });
};

export const generateShips = (boardSize) => {
    const board = generateEmptyBoard(boardSize);
    const ships = [
        { size: 4, count: 1 },
        { size: 3, count: 2 },
        { size: 2, count: 3 },
        { size: 1, count: 4 },
    ];

    placeShipsRandomly(board, ships);

    return { board, ships };
};