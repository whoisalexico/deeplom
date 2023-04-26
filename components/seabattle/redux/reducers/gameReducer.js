import {
  RESET_GAME, SET_BLOCK,
  SET_FOLLOWING,
  SET_GAME, SET_GAME_RESULT, SET_LOST_STATUS,
  SET_SHOT,
  SET_SHOT_MINUS_COUNT
} from "../actions/actionTypes";
import {game} from "../../constants/constants";

const initialState = game
const gameReducer = (state= initialState, {type, payload}) => {
   switch (type) {
    case SET_GAME:
      return {...state, ...payload}
      case SET_BLOCK:
       return { ...state, isBlock: !state.isBlock,}
    case SET_SHOT:
      return { ...state, ships: payload }
    case SET_SHOT_MINUS_COUNT:
      const count = state.shipCount - 1
      return {...state, shipCount: count}
     case RESET_GAME:
       return {...initialState}
     case SET_FOLLOWING:
       return {...state, following: payload}
     case SET_LOST_STATUS:
       return {...state, isLost: true}
     case SET_GAME_RESULT:
       return {...state, modal: { isModal: true, value: payload } }
    default:
      return state
  }
}

export default gameReducer