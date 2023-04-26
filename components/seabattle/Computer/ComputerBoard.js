import React from "react";
import {useSelector} from "react-redux";
import ComputerCell from "./ComputerCell";
import styles from "../Board/Board.module.scss";

const ComputerBoard = ( {nickname} ) => {

    const following  = useSelector(state => {
        const { following } = state.game
        return following === 'Computer'
    })


    return (
        <div className={styles.sea_battle_body}>
            <p>
                <span> { following ? 'Ходит компьютер' : '' } </span>
            </p>
            <table className={styles.sea_battle_body_opponent}>
                <tbody>
                <ComputerCell/>
                </tbody>
            </table>
        </div>
    )
}

export default ComputerBoard