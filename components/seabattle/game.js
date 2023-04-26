import React, {useEffect} from 'react';
import ComputerBoard from "./Computer/ComputerBoard";
import Board from "./Board/Board";
import {useDispatch, useSelector} from "react-redux";
import {gameOptions} from "./utils/game";
import {setGame} from "./redux/actions/actionCreators";
import {setPcSettings} from "./redux/actions/actionCreatorsPC";
import {store} from "./redux/store";
//"react-redux": "^8.0.5",


const Game = () => {

    const dispatch = useDispatch() //вызываем хук для получения dispatch из store
    const { userName, pcName } = useSelector( state => state.auth) // вытягиваем данные из store
    const { ships }  = useSelector(state => state.game)
    //const { isModal } = useSelector( state => state.game.modal)

// генерирует расположение кораблей
    const genShip = () => {
        const ships = gameOptions.generateShips('user') // для пользователя
        const computerShips = gameOptions.generateShips('computer') // для компьютера
        //отправляем сгенерированные данные к store
        ships && dispatch( setGame({ships: ships, shipCount: ships.length}))
        computerShips && dispatch( setPcSettings({ships: computerShips, shipCount: computerShips.length}))
        return {
            ships,
            computerShips
        }
    }


    useEffect(() => { // при рендере компонента, будет происходит генерация кораблей, если их нет в store
        if (ships.length === 0) {
            genShip()
        }
    }, [])

    if(!ships.length) {
        return <div>sus</div>
    }

    return (
        <div>
            <ComputerBoard/>
            <Board/>
        </div>
    );
};

export default Game;