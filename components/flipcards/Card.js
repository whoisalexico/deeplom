import React, {useEffect, useState} from 'react';
import {useSpring, animated} from "react-spring";
import styles from "./Card.module.scss"


const Card = ({id, color, cardGame, flippedCardPairs, setFlippedCardPairs, flippedIndexes, setFlippedIndexes, bg, images}) => {
    const [flipped, setFlipped] = useState(false);
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    });

    useEffect(() => {
        if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
            setTimeout(() => {
                setFlipped((state) => !state)
                setFlippedCardPairs(flippedCardPairs + 1);
                setFlippedIndexes([]);
            }, 1000)
        } else if (flippedIndexes[2] === false && id === 0) {
            setFlippedCardPairs(flippedCardPairs + 1);
            setFlippedIndexes([]);
        }
    }, [flippedIndexes]);

    const onClickCard = () => {
        if (!cardGame[id].flipped && flippedCardPairs % 3 === 0) {
            setFlipped((state) => !state);
            setFlippedCardPairs(flippedCardPairs + 1);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(id);
            setFlippedIndexes(newIndexes);
        } else if (flippedCardPairs % 3 === 1 && !cardGame[id].flipped && flippedIndexes.indexOf(id) < 0) {
            setFlipped((state) => !state);
            setFlippedCardPairs(flippedCardPairs + 1);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(id);
            setFlippedIndexes(newIndexes);
        }
    }

    return (
        <div onClick={onClickCard}>
            <animated.div className={styles.card} style={{opacity: opacity.to((o)=> 1 - o), transform,}}/>
            <animated.div className={styles.card} style={{opacity, transform: transform.to((t)=>`${t} rotateX(180deg)`), backgroundColor: bg==="colors"? color: '#fff', backgroundImage: bg==="images"? images : 'none', backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPositionX: "center"}}/>
        </div>
    );
};

export default Card;