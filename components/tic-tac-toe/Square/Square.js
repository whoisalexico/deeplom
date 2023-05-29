import React from "react";
import classNames from "classnames";
import s from "./Square.module.scss";

function Square({ id, value, handleClick, board, size }) {
    const isChanged = board.includes(id);

    const squareClasses = classNames(s.square, {
        [s.changed]: isChanged,
    });

    const squareStyle = {
        width: `${100 / size}%`,
        height: `${100 / size}%`,
        fontSize: size <= 5 ? "58px" : `${150 / size}px`,
    };

    return (
        <div
            id={id}
            onClick={() => handleClick(id)}
            className={squareClasses}
            style={squareStyle}
        >
            <p>{value}</p>
        </div>
    );
}

export default Square;