import {
  RESET_PC, SET_PC_SETTINGS, SET_PC_SHIP_MINUS_COUNT,
  SET_PC_SHOT, SET_PC_SHOT_DEAD, SET_PC_SHOT_MISS, SET_SHIP
} from "./actionPcTypes";
import { isUsedId } from "../../constants/constants";
import { setBlock, setFollowing } from "./actionCreators";
import {findNeedShip, generateModifyShipArray} from "../../utils/support";

// set initial settings for pc field
export const setPcSettings = (pcOptions) => {
  return {
    type: SET_PC_SETTINGS,
    payload: pcOptions
  }
}

//reset pc field
export const resetPc = () => {
  return {
    type: RESET_PC
  }
}

//make shot
export const setPcShot = (ships, cell) => {
  return {
    type: SET_PC_SHOT,
    payload: {
      ships,
      cell
    }
  }
}

//set pc ship dead status
export const setPcShipDead = (ships, cell) => {
  return {
    type: SET_PC_SHOT_DEAD,
    payload: {
      ships,
      cell
    }
  }
}

export const setPcShipMinusCount = () => {
  return {
    type: SET_PC_SHIP_MINUS_COUNT,
  }
}

// set pc cell miss status
export const setPcShipMiss = (cell) => {
  return {
    type: SET_PC_SHOT_MISS,
    payload: cell
  }
}

//set for cell from pc field ship svg
export const setShip = (ships) => {
  return {
    type: SET_SHIP,
    payload: ships
  }
}

//set ship status for field` cells
export const setShipOptions = (ships, shipsEx) => {

  return (dispatch) => {
    if(ships.length > 0) {
      if(shipsEx.length === 0) {
        let shipCells = []
        const newShips = [...ships]
        newShips.forEach( (ship) => {
          ship.location.forEach( coordinate => {
            shipCells.push(coordinate)
          })
        })
        dispatch( setShip(shipCells) ) //set ship status through redux store
      }
    }
  }
}

//set shot position for pc field
export const setComputerShot = (ships) => {

  //gen unique id
  const id = getRandomId()
  if(isUsedId.includes(id) && isUsedId.length < 100 ) {
    return setComputerShot(ships)
  }

  return (dispatch) => {
    isUsedId.push(id)
    // const ship = ships.find( ship => ship.location.includes(id)) // find need elem from array
    // const shipIndex = ships.findIndex( ship => ship.location.includes(id)) // find need index for elem from array
    const { ship, shipIndex } = findNeedShip(ships, id)
    // if ship is true, else state in isMiss
    if(ship) {
      const partOfShip = ship.location.indexOf(id)
      if(partOfShip >= 0) {
        // const hit = [...ship.hit]
        // hit[partOfShip] = true
        // const newShip = { ...ship, hit}
        // const newShips = [...ships]
        // newShips[shipIndex] = newShip
        const {newShips, newShip, hit} = generateModifyShipArray(ship, shipIndex, partOfShip, ships) //create data for new ship
        dispatch( setPcShot(newShips, {[id]: true}) ) // dispatch shot - modify state in store for needed cell
        if(!hit.includes('')) {
          newShip.dead = true // set dead status to true
          newShips[shipIndex] = newShip //dispatch dead status for ship - modify state for cell
          dispatch( setPcShipDead(newShips, {[id]: true}) ) // dispatch new status to modify status component`s state
          dispatch( setPcShipMinusCount() )
        }

        return {res: true, data: newShips}
      }
    } else {
      dispatch( setPcShipMiss({[id]: true}) ) // if pc is miss - change state on isMiss
      dispatch( setFollowing('User') ) // switch user
      dispatch( setBlock() ) // allow user click

      return false
    }
  }
}


//gen random id from pc field
const getRandomId = () => Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10)