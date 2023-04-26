import {combineReducers} from "redux";
import authReducer from "./authReducer";
import statusReducer from "./statusReducer";
import headerReducer from "./headerReducer";
import gameReducer from "./gameReducer";
import pcReducer from "./pcReducer";
import {RESET_STORE} from "../actions/actionTypes";

const appReducer = combineReducers({
  auth: authReducer,
  status: statusReducer,
  header: headerReducer,
  game: gameReducer,
  computer: pcReducer
})

const rootReducer = (state, action) => {
  if(action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer