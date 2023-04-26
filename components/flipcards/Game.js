import React, {useEffect, useState} from 'react';
import Card from "./Card";
import styles from "./Game.module.scss"

const Game = ({options, setOptions}) => {
    const [cardGame, setCardGame] = useState([]);
    const [flippedCardPairs, setFlippedCardPairs] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
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
        '#FFE9F3',
        '#B27092',
        '#EF271B',
        '#00C49A',
        '#29BF12',
        '#08BDBD',
        '#4F1271',
        '#8093F1',
        '#F7AEF8'
    ]

    useEffect(() => {
        const newGame = [];
        for (let i = 0; i < options / 2; i++) {
            const firstOption = {
                id: 2 * i,
                colorId: i,
                color: colors[i],
                flipped: false
            }
            const secondOption = {
                id: 2 * i + 1,
                colorId: i,
                color: colors[i],
                flipped: false
            };
            newGame.push(firstOption);
            newGame.push(secondOption);
        }
        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setCardGame(shuffledGame);
    }, []);


    useEffect(() => {
        const finished = !cardGame.some((card) => !card.flipped);
        if (finished && cardGame.length > 0) {
            setTimeout(() => {
                const newGame = confirm("You Win!" + " New Game?");
                if (newGame) {
                    const gameLength = cardGame.length;
                    setOptions(null);
                    setTimeout(() => {
                        setOptions(gameLength);
                    }, 5);
                } else {
                    setOptions(null);
                }
            }, 500);

        }
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
            <div id={styles.cards}>
                {cardGame.map((card, index) => (
                    <div className={styles.card} key={index}>
                        <Card id={index} color={card.color} cardGame={cardGame} flippedCardPairs={flippedCardPairs}
                              setFlippedCardPairs={setFlippedCardPairs} flippedIndexes={flippedIndexes}
                              setFlippedIndexes={setFlippedIndexes}/>
                    </div>
                ))}
            </div>
        )
    }
};

export default Game;