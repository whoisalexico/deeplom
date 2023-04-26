import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGameResult, setLostStatus} from "../redux/actions/actionCreators";
import {setShipOptions} from "../redux/actions/actionCreatorsPC";
import withField from "../HOCS/withField";
import cn from "classnames";
import styles from "../Cell/Cell.module.scss";


const ComputerCell = ( { cellId }) => {

    const dispatch = useDispatch()
    const { ships, shipCount, isShip: shipEx } = useSelector(state => state.computer)

    const isMiss = useSelector( state => {
        const miss = state.computer.isMiss
        return cellId in miss
    })

    const isHit = useSelector( state => {
        const { ships } = state.computer
        const ship = ships.find( ship => ship.location.includes(cellId))
        if (ship) {
            const partOfShip = ship.location.indexOf(cellId)
            return ship.hit[partOfShip]
        }
    })

    const isDead = useSelector( state => {
        const { ships } = state.computer
        const ship = ships.find( ship => ship.location.includes(cellId))
        return ship && ship.dead
    })

    const isShip = useSelector( state => {
        const {isShip, isDead, isHit} = state.computer
        if(cellId in isHit) {
            return false
        } else if (cellId in isDead) {
            return false
        }

        return isShip.includes(cellId)
    })


    useEffect(() => {
        if(ships.length > 0) {
            dispatch( setShipOptions(ships, shipEx) )
        }
    }, [])

    useEffect( () => {
        if(shipCount === 0) {
            dispatch( setLostStatus() )
            dispatch(setGameResult('You lost!'))
        }
    }, [shipCount])


    return (
        <td
            className={ cn(
                {[styles.cell_miss]: isMiss },
                { [styles.cell_hit]: isHit },
                { [styles.cell_dead]: isDead },
                { [styles.cell_ship]: isShip },
            )}
            data-id={cellId}
        />
    )
}

export default withField( React.memo(ComputerCell) )
