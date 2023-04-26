import { configureStore } from '@reduxjs/toolkit'
import gameReducer from "./gameSlice";

const store = configureStore({
    reducer: {
        chess: gameReducer
    },
})

export default store;