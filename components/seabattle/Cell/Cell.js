import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  setBlock,
  setFollowing,
  setGameResult,
  setHit,
  setStatus
} from "../redux/actions/actionCreators";
import { setComputerShot } from "../redux/actions/actionCreatorsPC";
import cn from "classnames";
import withField from "../HOCS/withField";
import styles from "./Cell.module.scss";

const Cell = ( { cellId }) => {

  const dispatch = useDispatch()
  const [isMiss, setMiss] = useState(false)
  const { ships, shipCount, isBlock, isLost } = useSelector(state => state.game)

  const isHit = useSelector( state => {
    const { ships } = state.game
    const ship = ships.find( ship => ship.location.includes(cellId))
    if (ship) {
      const partOfShip = ship.location.indexOf(cellId)
      return ship.hit[partOfShip]
    }
  })

  const { ships: computerShips, shipCount: computerShipCount } = useSelector(state => state.computer)

  const isDead = useSelector( state => {
      const { ships } = state.game
      const ship = ships.find( ship => ship.location.includes(cellId))
      return ship && ship.dead
  })


  useEffect( () => {
    if(shipCount === 0) {
      dispatch(setGameResult('You win!')) // выведем модальное окно что игрок победил
    }
    // eslint-disable-next-line
  }, [shipCount])


  const handleCellClick = (event) => {
    event.stopPropagation()
    if(isLost || isBlock || !shipCount || isMiss) return
    // если игрок проиграл то тут клик недоступен
    // если ходит комьютер то тут клик недоступен
    // если подстрерил все корабли противника - то больше не ходишь
    // запрет на клик по ячейкам
    setMiss(!isMiss)
    const cellId = event.target.dataset.id
    dispatch( setStatus('shot') ) // изменить кол-во выстрелов
    const res = dispatch( setHit(ships, shipCount, cellId) )
    // отправляем данные в store для смены состояния, в случае если попали в кораблик
    // //  когда попали в кораблик, снова остается ход у игрока
    // // если не попали - то условие ниже
    if(!res) {
      dispatch(setFollowing('Computer')) // поменяем состояние в сторе на того - чей ход
      dispatch( setBlock() ) //заблокируем клики по ячейке
      setShotPc(computerShips, computerShipCount) // запустим ход компьютера
    }
  }


  const setShotPc = (computerShips, computerShipCount) => {
    // с небольшой задержкой ход компьютера, чтобы увидеть, что ход пк
   setTimeout( () => {
     const { res, data } = dispatch( setComputerShot(computerShips) )
     if(res && computerShipCount !== 0) {
       return setShotPc(data)
     }
   }, 300)
  }


  return (
    <td
      className={ cn(
          styles.cell,
          { [styles.cell_miss]: isMiss },
          { [styles.cell_hit]: isHit },
          { [styles.cell_dead]: isDead }
        )}
      data-id={cellId}
      onClick={ handleCellClick }
    />
  )
}

export default withField( React.memo(Cell) )