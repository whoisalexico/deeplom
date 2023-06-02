import { useState } from "react";
import Board from "../Board/Board";
import Scores from "../Scores/Scores";
import s from "./Game.module.scss"
function Game() {

    const [scores, setScores] = useState({
        x: 0,
        o: 0,
        tie: 0,
    });

    return (
        <div className={s.game}>
            <Board setScores={setScores} size={3}/>
        </div>
    );
}

export default Game;