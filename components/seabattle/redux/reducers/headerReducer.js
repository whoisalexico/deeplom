import {CHANGE_HEADER} from "../actions/actionTypes";

const initialState = {
  headerTitle: ''
}

const headerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_HEADER:
      return {...state, headerTitle: payload }
    default:
      return state
  }
}

export default headerReducer