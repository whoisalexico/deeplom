import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    changeFigurePosition, removeFigure,
    resetGame,
    selectColor,
    selectFigures,
    selectGameWon,
    setColor, setGameStarted,
    setGameWon
} from "../redux/gameSlice";
import React, {useEffect, useRef, useState} from "react";
import {BoardLettersByNumber, Colors, Figures} from "../types";
import Cell from "./Cell";
import Figure from "../Figures/Figure";
import store from "../redux/store";
import styles from "./Board.module.scss";
import Link from "next/link";
import {useAuth} from "../../../context/AuthContext";
import {collection, addDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {useTranslation} from "next-i18next";
import Fireworks from "@fireworks-js/react";

const Board = () => {
    const {t} = useTranslation("common")

    const {user} = useAuth();
    const game = 'Chess';
    const dispatch = useAppDispatch();
    const gameColor = useAppSelector(selectColor);
    const figures = useAppSelector(selectFigures);
    const color = useAppSelector(selectColor);
    const gameWon = useAppSelector(selectGameWon);
    const [status, setStatus] = useState(false)
    const pts = Math.floor(Math.random() * (1200-800) + 800);
    const playerColor = gameColor;
    console.log(playerColor)

    const setPoints = async (pts, game) => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("id", "==", user.uid))
            const snap = await getDocs(q);
            let nickname;
            snap.forEach((doc)=>{
                const data = doc.data();
                nickname = data.nickname;
            })
            const docRef = await addDoc(collection(db, "ChessLeaderboard"),{
                nickname: nickname,
                game: game,
                score: pts,
            })    
        }catch (e) {
            
        }
        
    }

    const radioChanged = (id) => {
        dispatch(setColor(id));
    };
    const startNewGame = () => {
        dispatch(resetGame())
    }
    let [isKingInCheck, setIsKingInCheck] = useState(false);
    let dangerousCells = useRef({white: {}, black: {}});
    const sides = {
        ally: gameColor,
        enemy: gameColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE,
    };
    const boardRef = useRef(null);
    const [choseFigurePos, setChoseFigurePos] = useState(null);
    const cellsFigure = {};
    const isAvailableCellForMove = (x, y) => {
        if (choseFigurePos && choseFigurePos.availableCells[`${x}-${y}`]) {
            return true;
        }
        return false;
    };
    const isCellHavingFigure = (x, y) => {
        return cellsFigure[`${x}-${y}`] ? true : false;
    };
    const moveOn = (figure, x, y) => {
        cellsFigure[`${figure.x}-${figure.y}`] = null;
        cellsFigure[`${x}-${y}`] = figure;
        dispatch(changeFigurePosition({figure, x, y}));
        setChoseFigurePos(null);
    };
    const cellClicked = (x, y) => {
        if (!choseFigurePos)
            return;
        if (!choseFigurePos.availableCells[`${x}-${y}`])
            return;
        moveOn(choseFigurePos.figure, x, y);
        nextAIMoveDelayed();
    };
    const initCells = () => {
        const cells = [];
        for (let y = 8; y >= 1; y--) {
            for (let x = 1; x <= 8; x++) {
                cellsFigure[`${x}-${y}`] = null;
                const boardLetter = BoardLettersByNumber[x];
                if ((y + x) % 2 !== 0) {
                    cells.push(React.createElement(Cell, {
                        color: Colors.BLACK,
                        x: boardLetter,
                        y: y,
                        key: `${boardLetter}-${y}`,
                        isAvailableForMove: isAvailableCellForMove(x, y),
                        isHavingFigure: isCellHavingFigure(x, y),
                        cellClicked: cellClicked,
                        isSelected: isSelectedCell(x, y)
                    }));
                } else {
                    cells.push(React.createElement(Cell, {
                        color: Colors.WHITE,
                        x: boardLetter,
                        y: y,
                        key: `${boardLetter}-${y}`,
                        isAvailableForMove: isAvailableCellForMove(x, y),
                        isHavingFigure: isCellHavingFigure(x, y),
                        cellClicked: cellClicked,
                        isSelected: isSelectedCell(x, y)
                    }));
                }
            }
        }
        return cells;
    };
    const isEatableFigure = (figure) => {
        if (!choseFigurePos)
            return false;
        return choseFigurePos.availableCells[`${figure.x}-${figure.y}`];
    };
    const isSelectedFigure = (figure) => {
        if (!choseFigurePos)
            return false;
        return choseFigurePos.figure.id === figure.id;
    };
    const isSelectedCell = (x, y) => {
        if (!choseFigurePos)
            return false;
        return choseFigurePos.figure.x === x && choseFigurePos.figure.y === y;
    };
    const initFigures = () => {
        const figuresJSX = [];
        for (let item in figures) {
            if (!figures[item].id || !figures[item].color)
                continue;
            cellsFigure[`${figures[item].x}-${figures[item].y}`] = figures[item];
            figuresJSX.push(React.createElement(Figure, {
                figureClicked: figureClicked,
                key: figures[item].id,
                figure: figures[item],
                isEatable: isEatableFigure(figures[item]),
                isSelected: isSelectedFigure(figures[item])
            }));
        }
        return figuresJSX;
    };
    const resizeBoard = () => {
        const paddingsWidth = 48 + 12;
        const paddingHeight = 52 + 12;
        if (boardRef.current) {
            const board = boardRef.current;
            board.style.height = '';
            board.style.width = '';
            const boardRect = board.getBoundingClientRect();
            const boardWidth = boardRect.width - paddingsWidth + paddingHeight;
            const boardHeight = boardRect.height - paddingHeight + paddingsWidth;
            if (boardHeight > boardWidth) {
                board.style.height = boardWidth + 'px';
            } else {
                board.style.width = boardHeight + 'px';
            }
        }
    };
    const figureClicked = (figure) => {
        if (choseFigurePos && choseFigurePos.availableCells[`${figure.x}-${figure.y}`] && choseFigurePos.figure.color !== figure.color) {
            moveOrEat(choseFigurePos.figure, figure.x, figure.y);
            nextAIMoveDelayed();
            return;
        }
        if (choseFigurePos && choseFigurePos.figure.name === figure.name && figure.x === choseFigurePos.figure.x && choseFigurePos.figure.y === figure.y && choseFigurePos.figure.color === figure.color) {
            setChoseFigurePos(null);
            return;
        }
        if (sides.ally !== figure.color)
            return;
        if (isKingInCheck && figure.name !== Figures.KING)
            return;
        setChoseFigurePos({
            figure,
            availableCells: getAvailableCells(figure)
        });
    };
    const endGame = (winner) => {
        dispatch(setGameWon(winner));
        dispatch(setGameStarted(false));
    };
    const eatFigure = (figure) => {
        cellsFigure[`${figure.x}-${figure.y}`] = null;
        if (figure.name === Figures.KING) {
            endGame(getOtherColor(figure.color));
        }
        dispatch(removeFigure(figure));
    };
    const moveOrEat = (figure, x, y) => {
        const figureOnCell = cellsFigure[`${x}-${y}`];
        if (figureOnCell && figureOnCell.color !== figure.color)
            eatFigure(figureOnCell);
        moveOn(figure, x, y);
    };
    const getAvailableCells = (figure, isForDangerousCells = false) => {
        let way = [];
        const toStopWay = (x, y) => {
            if (cellsFigure[`${x}-${y}`] === undefined)
                return true;
            if (cellsFigure[`${x}-${y}`])
                return true;
            return false;
        };
        const checkCellForMove = (x, y) => {
            if (toStopWay(x, y))
                return false;
            way.push({x, y});
            return true;
        };
        const verticalTop = (toY, fromY = figure.y) => {
            for (let i = fromY + 1; i <= toY; i++) {
                if (toStopWay(figure.x, i))
                    return;
                way.push({y: i, x: figure.x});
            }
        };
        const verticalBottom = (toY, fromY = figure.y) => {
            for (let i = fromY - 1; i >= toY; i--) {
                if (toStopWay(figure.x, i))
                    return;
                way.push({y: i, x: figure.x});
            }
        };
        const horizontalLeft = (toX, fromX = figure.x) => {
            for (let i = fromX - 1; i >= toX; i--) {
                if (toStopWay(i, figure.y))
                    return;
                way.push({x: i, y: figure.y});
            }
        };
        const horizontalRight = (toX, fromX = figure.x) => {
            for (let i = fromX + 1; i <= toX; i++) {
                if (toStopWay(i, figure.y))
                    return;
                way.push({x: i, y: figure.y});
            }
        };
        const checkDiagonal = () => {
            // top right
            for (let i = 1; i <= 8; i++) {
                if (!checkCellForMove(figure.x + i, figure.y + i))
                    break;
            }
            // bottom right
            for (let i = 1; i <= 8; i++) {
                if (!checkCellForMove(figure.x + i, figure.y - i))
                    break;
            }
            // bottom left
            for (let i = 1; i <= 8; i++) {
                if (!checkCellForMove(figure.x - i, figure.y - i))
                    break;
            }
            for (let i = 1; i <= 8; i++) {
                if (!checkCellForMove(figure.x - i, figure.y + i))
                    break;
            }
        };
        const checkEatableFiguresByDiagonal = () => {
            for (let i = 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(figure.x + i, figure.y + i))
                    break;
            }
            // bottom right
            for (let i = 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(figure.x + i, figure.y - i))
                    break;
            }
            // bottom left
            for (let i = 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(figure.x - i, figure.y - i))
                    break;
            }
            for (let i = 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(figure.x - i, figure.y + i))
                    break;
            }
        };
        const isEatableCell = (x, y) => {
            var _a;
            if (cellsFigure[`${x}-${y}`] && figure.color !== ((_a = cellsFigure[`${x}-${y}`]) === null || _a === void 0 ? void 0 : _a.color))
                return true;
            return false;
        };
        const checkEatableCell = (x, y) => {
            if (isEatableCell(x, y)) {
                way.push({x, y});
                return true;
            }
            return false;
        };
        const checkEatableOrAlliesCell = (x, y) => {
            var _a;
            if (cellsFigure[`${x}-${y}`] && ((_a = cellsFigure[`${x}-${y}`]) === null || _a === void 0 ? void 0 : _a.color) === figure.color)
                return true;
            if (isEatableCell(x, y)) {
                way.push({x, y});
                return true;
            }
            return false;
        };
        const checkEatableFiguresByPawn = () => {
            if (figure.color === Colors.BLACK) {
                checkEatableCell(figure.x - 1, figure.y - 1);
                checkEatableCell(figure.x + 1, figure.y - 1);
            } else {
                checkEatableCell(figure.x - 1, figure.y + 1);
                checkEatableCell(figure.x + 1, figure.y + 1);
            }
        };
        if (figure.name === Figures.PAWN) {
            if (figure.color === Colors.BLACK) {
                if (!isForDangerousCells) {
                    if (figure.y === 7)
                        verticalBottom(figure.y - 2);
                    else
                        verticalBottom(figure.y - 1);
                } else {
                    way.push({y: figure.y - 1, x: figure.x - 1});
                    way.push({y: figure.y - 1, x: figure.x + 1});
                }
            } else {
                if (!isForDangerousCells) {
                    if (figure.y === 2)
                        verticalTop(figure.y + 2);
                    else
                        verticalTop(figure.y + 1);
                } else {
                    way.push({y: figure.y + 1, x: figure.x - 1});
                    way.push({y: figure.y + 1, x: figure.x + 1});
                }
            }
            checkEatableFiguresByPawn();
        }
        const checkEatableFiguresByRook = () => {
            // check top
            for (let i = figure.y + 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(figure.x, i))
                    break;
            }
            // check bottom
            for (let i = figure.y - 1; i >= 0; i--) {
                if (checkEatableOrAlliesCell(figure.x, i))
                    break;
            }
            // check left
            for (let i = figure.x - 1; i >= 0; i--) {
                if (checkEatableOrAlliesCell(i, figure.y))
                    break;
            }
            // check right
            for (let i = figure.x + 1; i <= 8; i++) {
                if (checkEatableOrAlliesCell(i, figure.y))
                    break;
            }
        };
        if (figure.name === Figures.ROOK) {
            verticalBottom(0);
            verticalTop(8);
            horizontalLeft(0);
            horizontalRight(8);
            checkEatableFiguresByRook();
        }
        const checkMovesByKnight = () => {
            checkCellForMove(figure.x + 1, figure.y + 2);
            checkCellForMove(figure.x - 1, figure.y + 2);
            checkCellForMove(figure.x + 2, figure.y + 1);
            checkCellForMove(figure.x + 2, figure.y - 1);
            checkCellForMove(figure.x + 1, figure.y - 2);
            checkCellForMove(figure.x - 1, figure.y - 2);
            checkCellForMove(figure.x - 2, figure.y - 1);
            checkCellForMove(figure.x - 2, figure.y + 1);
        };
        const checkEatableFiguresByKnight = () => {
            checkEatableOrAlliesCell(figure.x + 1, figure.y + 2);
            checkEatableOrAlliesCell(figure.x - 1, figure.y + 2);
            checkEatableOrAlliesCell(figure.x + 2, figure.y + 1);
            checkEatableOrAlliesCell(figure.x + 2, figure.y - 1);
            checkEatableOrAlliesCell(figure.x + 1, figure.y - 2);
            checkEatableOrAlliesCell(figure.x - 1, figure.y - 2);
            checkEatableOrAlliesCell(figure.x - 2, figure.y - 1);
            checkEatableOrAlliesCell(figure.x - 2, figure.y + 1);
        };
        if (figure.name === Figures.KNIGHT) {
            checkMovesByKnight();
            checkEatableFiguresByKnight();
        }
        if (figure.name === Figures.BISHOP) {
            checkDiagonal();
            checkEatableFiguresByDiagonal();
        }
        if (figure.name === Figures.QUEEN) {
            checkDiagonal();
            checkEatableFiguresByDiagonal();
            verticalBottom(0);
            verticalTop(8);
            horizontalLeft(0);
            horizontalRight(8);
            checkEatableFiguresByRook();
        }
        const checkKingDiagonal = () => {
            checkCellForMove(figure.x + 1, figure.y + 1);
            checkCellForMove(figure.x + 1, figure.y - 1);
            checkCellForMove(figure.x - 1, figure.y - 1);
            checkCellForMove(figure.x - 1, figure.y + 1);
        };
        const checkEatableFiguresByKing = () => {
            checkEatableOrAlliesCell(figure.x + 1, figure.y + 1);
            checkEatableOrAlliesCell(figure.x + 1, figure.y - 1);
            checkEatableOrAlliesCell(figure.x - 1, figure.y - 1);
            checkEatableOrAlliesCell(figure.x - 1, figure.y + 1);
            checkEatableOrAlliesCell(figure.x + 1, figure.y);
            checkEatableOrAlliesCell(figure.x - 1, figure.y);
            checkEatableOrAlliesCell(figure.x, figure.y + 1);
            checkEatableOrAlliesCell(figure.x, figure.y - 1);
        };
        if (figure.name === Figures.KING) {
            verticalBottom(figure.y - 1);
            verticalTop(figure.y + 1);
            horizontalLeft(figure.x - 1);
            horizontalRight(figure.x + 1);
            checkKingDiagonal();
            checkEatableFiguresByKing();
            const cellsForRemoving = [];
            for (let i = 0; i < way.length; i++) {
                if (dangerousCells.current[getOtherColor(figure.color)][`${way[i].x}-${way[i].y}`]) {
                    cellsForRemoving.push({x: way[i].x, y: way[i].y});
                }
            }
            cellsForRemoving.forEach(elw => {
                way = way.filter(el => !(el.y === elw.y && el.x === elw.x));
            });
        }
        const obj = {};
        way.forEach(el => {
            obj[`${el.x}-${el.y}`] = true;
        });
        return obj;
    };
    const nextAIMove = () => {
        const figures = store.getState().chess.figures;
        const getRandomElementOfArray = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        };
        const figuresIds = Object.keys(figures);
        if (figuresIds.length < 1)
            return;
        const enemyFiguresIds = figuresIds.filter(id => figures[id].color === sides.enemy);
        let randomFigureId = getRandomElementOfArray(enemyFiguresIds);
        let availableCells = getAvailableCells(figures[randomFigureId]);
        let availableCellsArr = Object.keys(availableCells);
        const triedFiguresIds = [];
        while (availableCellsArr.length < 1) {
            if (triedFiguresIds.length >= enemyFiguresIds.length)
                return;
            randomFigureId = getRandomElementOfArray(enemyFiguresIds);
            availableCells = getAvailableCells(figures[randomFigureId]);
            availableCellsArr = Object.keys(availableCells);
            triedFiguresIds.push(randomFigureId);
        }
        const cellForMove = getRandomElementOfArray(availableCellsArr);
        const [x, y] = cellForMove.split('-');
        moveOrEat(figures[randomFigureId], Number(x), Number(y));
    };
    const nextAIMoveDelayed = (delay = 200) => {
        setTimeout(nextAIMove, delay);
    };
    const getFiguresBySide = (color) => {
        return Object.keys(figures).filter(figureId => figures[figureId].color === color).map(figureId => figures[figureId]);
    };
    const updateAllAvailableCells = () => {
        dangerousCells.current.white = {};
        dangerousCells.current.black = {};
        const whiteFigures = getFiguresBySide(Colors.WHITE);
        const blackFigures = getFiguresBySide(Colors.BLACK);
        whiteFigures.forEach(figure => {
            dangerousCells.current.white = Object.assign(Object.assign({}, dangerousCells.current.white), getAvailableCells(figure, true));
        });
        blackFigures.forEach(figure => {
            dangerousCells.current.black = Object.assign(Object.assign({}, dangerousCells.current.black), getAvailableCells(figure, true));
        });
    };
    const getOtherColor = (color) => {
        return color === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
    };
    const checkIsKingInCheck = (color) => {
        updateAllAvailableCells();
        const kings = {
            [Colors.WHITE]: figures['white-king-5-1'],
            [Colors.BLACK]: figures['black-king-5-8']
        };
        const king = kings[color];
        if (!king)
            return;
        if (dangerousCells.current[getOtherColor(color)][`${king.x}-${king.y}`])
            setIsKingInCheck(true);
        else
            setIsKingInCheck(false);
    };
    const getGameWonJSX = () => {
        if (!gameWon)
            return null;
        const color = gameWon;
        return (
            <>
                <div className={styles.gameWon}>
                    <h2 className={styles.gameWonTitle}>{color === playerColor ? (t('uwon')):(t('ulose'))}</h2>
                    <Link href="/games" className={styles.gameWonButton} onClick={()=>setPoints(pts, game)}>{t("backtogames")}</Link>
                    <Link href="chess" onClick={() => {startNewGame()}}>{t("playagain")}</Link>
                </div>
                {color === playerColor ? (<Fireworks
                    options={{
                        rocketsPoint: {
                            min: 0,
                            max: 100
                        }
                    }}
                    style={{
                        top: 82,
                        left: 0,
                        width: '100%',
                        height: 'calc(100vh - 164px)',
                        position: 'fixed',
                        background: 'transparent'
                    }}
                />): (<></>)}

            </>
        )
    };

    useEffect(() => {
        checkIsKingInCheck(sides.ally);
    }, [figures]);

    useEffect(() => {
        resizeBoard();
        window.addEventListener('resize', resizeBoard);
        dispatch(setGameStarted(true));
    }, []);

    useEffect(()=>{
        setTimeout(()=>{
        if(gameColor === 'black'){
            nextAIMove();
        }}, 500)
    }, [gameColor])
    return (
        <>
            <div className={styles.app}>
                {gameColor === "" ? (
                    <div className={styles.side}>
                        <div className={styles.choiceWrapper}>
                            <h2>{t('chessside')}</h2>
                            <div className={styles.buttons}>
                                <button onClick={() => {dispatch(setColor("white"))}}>{t('chessWhite')}</button>
                                <button onClick={() => {dispatch(setColor("black"))}}>{t('chessBlack')}</button>
                            </div>
                            <Link href="/games" className={styles.backToGames} onClick={()=>setPoints(pts, game)}>{t("backtogames")}</Link>
                        </div>
                    </div>
                ) : (
                    <div className={styles.boardWrapper} ref={boardRef}>
                        <ul className={styles.boardLeft}>
                            <li className={styles.boardLeftItem}>1</li>
                            <li className={styles.boardLeftItem}>2</li>
                            <li className={styles.boardLeftItem}>3</li>
                            <li className={styles.boardLeftItem}>4</li>
                            <li className={styles.boardLeftItem}>5</li>
                            <li className={styles.boardLeftItem}>6</li>
                            <li className={styles.boardLeftItem}>7</li>
                            <li className={styles.boardLeftItem}>8</li>
                        </ul>

                        <ul className={styles.boardBottom}>
                            <li className={styles.boardBottomItem}>A</li>
                            <li className={styles.boardBottomItem}>B</li>
                            <li className={styles.boardBottomItem}>C</li>
                            <li className={styles.boardBottomItem}>D</li>
                            <li className={styles.boardBottomItem}>E</li>
                            <li className={styles.boardBottomItem}>F</li>
                            <li className={styles.boardBottomItem}>G</li>
                            <li className={styles.boardBottomItem}>H</li>
                        </ul>

                        <ul className={styles.board}>
                            {initCells()}
                            {initFigures()}
                        </ul>

                        {getGameWonJSX()}
                    </div>
                )}
            </div>
        </>
    )
};
export default Board