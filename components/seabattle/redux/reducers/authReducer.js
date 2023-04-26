import {SET_AUTH, SET_OPPONENT, SET_USER} from "../actions/actionTypes";


const initState = {
  userName: '',
  pcName: ''
}

const authReducer = (state= initState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER:
      return { ...state, userName: payload }
    case SET_OPPONENT:
      return {
        ...state,
        pcName: payload
      }
    case SET_AUTH:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default authReducer
