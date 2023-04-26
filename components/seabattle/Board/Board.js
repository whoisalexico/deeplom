import React from "react";
import {Provider, useSelector} from "react-redux";
import Cell from "../Cell/Cell";
import styles from "./Board.module.scss";
import {store} from "../redux/store";

const Board = () => {

    const following = useSelector(state => {
        const {following} = state.game
        return following === 'User'
    })

    return (
        <div className={styles.sea_battle_body}>
            <p>
                <span> {following ? 'Ваш ход' : ''} </span>
            </p>
            <table className={styles.sea_battle_body_opponent}>
                <tbody>
                <Cell/>
                </tbody>
            </table>
        </div>
    )
}


export default Board

