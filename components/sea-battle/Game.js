import React, { useState } from "react";
import useWindowSize from "./hooks/useWindowSize";

import { generateBoard, getScale } from "./utils/Common";
import SetupBoard from "./SetupBoard";
import GameBoard from "./GameBoard";

function Game() {
    const size = useWindowSize();
    const scale = getScale(size);

    const [difficulty, setDifficulty] = useState(0);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState(generateBoard());

    return (
        <div className="page-container no-select">
            <div className="page-wrapper">
                {
                    board1.length === 10 ? <GameBoard {...{board1, board2, setBoard1, setBoard2, difficulty}}></GameBoard> : <SetupBoard {...{scale, setBoard1, difficulty, setDifficulty}}></SetupBoard>
                }
            </div>
        </div>
    );
}

export default Game;