import React from "react";
import styles from "./Board.module.scss";
import { BoardNumberByLetter, Colors } from "../types";
import classNames from "classnames/bind";
const Cell = (props) => {
    return (React.createElement("li", { onClick: () => props.cellClicked(BoardNumberByLetter[props.x], props.y), id: `cell-${props.x}-${props.y}`, className: classNames(styles.cell, {
                [styles.cellWhite]: props.color === Colors.WHITE,
                [styles.cellBlack]: props.color === Colors.BLACK,
                [styles.availableCell]: props.isAvailableForMove && !props.isHavingFigure,
                [styles.cellSelected]: props.isSelected,
            }) },
        React.createElement("div", { className: classNames(styles.cellCircle, {
                [styles.cellCircleShow]: props.isAvailableForMove && !props.isHavingFigure
            }) })));
};
export default Cell;