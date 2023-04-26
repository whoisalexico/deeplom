import {
  CHANGE_HEADER, RESET_GAME, RESET_STATUS, RESET_STORE,
  SET_AUTH, SET_BLOCK, SET_FOLLOWING, SET_GAME, SET_GAME_RESULT, SET_LOST_STATUS,
  SET_OPPONENT, SET_SHOT, SET_SHOT_MINUS_COUNT,
  SET_STATUS, SET_USER
} from "./actionTypes";
import {findNeedShip, generateModifyShipArray} from "../../utils/support";


//==========================auth action
export const setUserName = (userName) => {
  return {
    type: SET_USER,
    payload: userName
  }
}

export const setOpponentName = (pcName) => {
  return {
    type: SET_OPPONENT,
    payload: pcName
  }
}

export const setAuth = ({ userName, pcName }) => {
  return {
    type: SET_AUTH,
    payload: {
      userName,
      pcName
    }
  }
}
// ==================================================


export const setStatus = (statusType) => {
  return {
    type: SET_STATUS,
    payload: statusType
  }
}

export const changeHeader = (title) => {
  return {
    type: CHANGE_HEADER,
    payload: title
  }
}

//============================================user chess actions
//make shot
export const setShot = (ships) => {
  return {
    type: SET_SHOT,
    payload: ships
  }
}

//minus ships count
export const setShotMinusCount = () => {
  return {
    type: SET_SHOT_MINUS_COUNT,
  }
}

// add flag is dead to ship
export const setShipDead = (ships) => {
  return {
    type: SET_SHOT,
    payload: ships
  }
}

// add initial values for ships location and hit
export const setGame = (gameOptions) => {
  return {
    type: SET_GAME,
    payload: gameOptions
  }
}
//after exit chess reset store
export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}
//after exit chess reset status component
export const resetStatus = () => {
  return {
    type: RESET_STATUS
  }
}
//change user / computer
export const setFollowing = (howIsFollowing) => {
  return {
    type: SET_FOLLOWING,
    payload: howIsFollowing
  }
}
// block/unblock click on user field
export const setBlock = () => ({
  type: SET_BLOCK
})

// reset all data in store
export const resetStore = () => ({
  type:RESET_STORE
})

//set lost status if user lost
export const setLostStatus = () => ({
  type: SET_LOST_STATUS
})

//view modal window
export const setGameResult = (value) => ({
  type: SET_GAME_RESULT,
  payload: value
})

// set hit for ships
export const setHit = ( ships , shipCount, id ) => {

  return (dispatch) => {
    const { ship, shipIndex } = findNeedShip(ships, id)
    // if ship is true
    if(ship) {
      const partOfShip = ship.location.indexOf(id) //get position for id from ship location
      if(partOfShip >= 0) {
        const {newShips, newShip, hit} = generateModifyShipArray(ship, shipIndex, partOfShip, ships) //create data for new ship

        dispatch( setShot(newShips) ) // dispatch shot - modify state in store for needed cell
        dispatch( setStatus('hit') ) // dispatch new status to modify status component`s state

        if(!hit.includes('')) {
          newShip.dead = true // set dead status to true
          newShips[shipIndex] = newShip // change status
          dispatch( setShipDead(newShips) ) //dispatch dead status for ship - modify state for cell
          dispatch( setStatus('dead')) // dispatch new status to modify status component`s state
          dispatch( setShotMinusCount() ) // minus ship count
        }
      }
      return true
    }
    return false
  }
}