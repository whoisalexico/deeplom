import React, {useState} from "react";
import {GameContext} from "./context";
import {getMoves, random} from "./utils/Common";
import GameEnd from "./Game/GameEnd";
import Table from "./Game/Table";

function GameBoard({board1, board2, setBoard1, setBoard2, difficulty}) {
    const [turn, setTurn] = useState(false);
    const [moves, setMoves] = useState(getMoves(board1, difficulty));
    const [winner, setWinner] = useState(null);

    function getMove() {
        if (!moves.length) return null;

        const index = random(0, moves.length - 1);
        const move = moves[index];
        moves.splice(index, 1);
        return move;
    }

    function removeMove([cellX, cellY]) {
        const index = moves.findIndex(([x, y]) => x === cellX && y === cellY);
        if (index >= 0) moves.splice(index, 1);
    }

    return (
        <div className="page-holder">
            <GameContext.Provider value={{
                turn,
                setTurn,
                getMove,
                removeMove,
                winner,
                setWinner
            }}>
                <Table classNames="no-events" type={0} board={board1}/>
                <Table type={1} board={board2} {...{turn, setTurn}}/>
                <GameEnd {...{setBoard1, setBoard2}}/>
            </GameContext.Provider>
        </div>
    );
}

export default GameBoard;