import React, {useEffect, useState} from 'react';
import Card from "./Card";
import styles from "./Game.module.scss"
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {useTranslation} from "next-i18next";
import Fireworks from '@fireworks-js/react'

const Game = ({options, setOptions, bg}) => {
    const [cardGame, setCardGame] = useState([]);
    const [flippedCardPairs, setFlippedCardPairs] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [isFinished, setFinished] = useState(false)
    const [isNewGame, setIsNewGame] = useState(false)
    const {user} = useAuth();
    const game = 'Find Pair';
    const pts = Math.floor(Math.random() * (1200 - 800) + 800);
    const {t} = useTranslation("common");


    const setPoints = async (pts, game) => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("id", "==", user.uid))
            const snap = await getDocs(q);
            let nickname;
            snap.forEach((doc) => {
                const data = doc.data();
                nickname = data.nickname;
            })
            const docRef = await addDoc(collection(db, "FindPairLeaderboard"), {
                nickname: nickname,
                game: game,
                score: pts,
            })
        } catch (e) {

        }

    }
    const colors = [
        '#080708',
        '#3772FF',
        '#DF2935',
        '#FDCA40',
        '#E6E8E6',
        '#9B287B',
        '#D56F3E',
        '#3C787E',
        '#C7EF00',
        '#e0bacc',
        '#B27092',
        '#EF271B',
        '#00C49A',
        '#29BF12',
        '#08BDBD',
        '#4F1271',
        '#8093F1',
        '#F7AEF8'
    ]

    const images = [
        "url(/img/flipCardsGame/ananas.svg)",
        "url(/img/flipCardsGame/banana.svg)",
        "url(/img/flipCardsGame/grape.svg)",
        "url(/img/flipCardsGame/coconut.svg)",
        "url(/img/flipCardsGame/dragonfruit.svg)",
        "url(/img/flipCardsGame/fig.svg)",
        "url(/img/flipCardsGame/kiwi.svg)",
        "url(/img/flipCardsGame/lemon.svg)",
        "url(/img/flipCardsGame/mango.svg)",
        "url(/img/flipCardsGame/onenhalfga.svg)",
        "url(/img/flipCardsGame/papaya.svg)",
        "url(/img/flipCardsGame/passionfruit.svg)",
        "url(/img/flipCardsGame/peach.svg)",
        "url(/img/flipCardsGame/plum.svg)",
        "url(/img/flipCardsGame/pomegranate.svg)",
        "url(/img/flipCardsGame/redapple.svg)",
        "url(/img/flipCardsGame/strawberry.svg)",
        "url(/img/flipCardsGame/watermelon.svg)",
    ]

    const newGame = () => {
        setIsNewGame(!isNewGame)
        if (isNewGame) {
            const gameLength = cardGame.length;
            setOptions(null);
            setTimeout(() => {
                setOptions(gameLength);
            }, 5);
        } else {
            setOptions(null);
        }
    }

    useEffect(() => {
        const newGame = [];
        for (let i = 0; i < options / 2; i++) {
            const firstOption = {
                id: 2 * i,
                colorId: i,
                color: bg === "images" ? images[i] : colors[i],
                flipped: false
            }
            const secondOption = {
                id: 2 * i + 1,
                colorId: i,
                color: bg === "images" ? images[i] : colors[i],
                flipped: false
            };
            newGame.push(firstOption);
            newGame.push(secondOption);
        }
        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setCardGame(shuffledGame);
    }, []);

    useEffect(() => {
        setFinished(!cardGame.some((card) => !card.flipped));
    }, [cardGame]);


    if (flippedIndexes.length === 2) {
        const match = cardGame[flippedIndexes[0]].colorId === cardGame[flippedIndexes[1]].colorId;
        if (match) {
            const newGame = [...cardGame];
            newGame[flippedIndexes[0]].flipped = true;
            newGame[flippedIndexes[1]].flipped = true;
            setCardGame(newGame);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(false)
            setFlippedIndexes(newIndexes);
        } else {
            const newIndexes = [...flippedIndexes];
            newIndexes.push(true);
            setFlippedIndexes(newIndexes);
        }
    }

    if (cardGame.length === 0)
        return <div>loading.................</div>
    else {
        return (
            <>
                {isFinished && cardGame.length > 0 ? (
                    <>
                        <div className={styles.modal}>
                            <p className={styles.congratz}>{t("uwon")}</p>
                            <Link href="find-pair" onClick={() => {
                                newGame()
                            }}>{t("playagain")}</Link>
                            <Link onClick={() => {
                                setPoints(pts, game)
                            }} href="/games">{t("backtogames")}</Link>
                        </div>
                        <Fireworks
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
                        />
                    </>
                ) : (
                    <div id={styles.cards}>
                        {cardGame.map((card, index) => (
                            <div className={styles.card} key={index}>
                                <Card id={index} color={card.color} cardGame={cardGame}
                                      flippedCardPairs={flippedCardPairs}
                                      setFlippedCardPairs={setFlippedCardPairs} flippedIndexes={flippedIndexes}
                                      setFlippedIndexes={setFlippedIndexes} bg={bg} images={card.color}/>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )
    }
};

export default Game;