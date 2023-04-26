import { initialFigures } from "../Board/positionInital";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    color: "",
    figures: initialFigures,
    gameWon: null,
    isGameStarted: false,
};
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setColor: (state, action) => {
            state.color = action.payload;
        },
        changeFigurePosition: (state, action) => {
            state.figures[action.payload.figure.id].x = action.payload.x;
            state.figures[action.payload.figure.id].y = action.payload.y;
        },
        removeFigure: (state, action) => {
            delete state.figures[action.payload.id];
        },
        setGameWon: (state, action) => {
            state.gameWon = action.payload;
        },
        resetGame: (state) => {
            state.gameWon = initialState.gameWon;
            state.figures = initialState.figures;
            state.isGameStarted = false;
        },
        setGameStarted: (state, action) => {
            state.isGameStarted = action.payload;
        }
    }
});
export const { setColor, changeFigurePosition, removeFigure, setGameWon, resetGame, setGameStarted } = gameSlice.actions;
export const selectFigures = (state) => state.chess.figures;
export const selectColor = (state) => state.chess.color;
export const selectGameWon = (state) => state.chess.gameWon;
export const selectIsGameStarted = (state) => state.chess.isGameStarted;
export default gameSlice.reducer;