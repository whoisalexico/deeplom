import React, {useState} from 'react';
import styles from '../../styles/FlipCard.module.scss'
import Navbar from "../../components/layout/navbar";
import Game from "../../components/flipcards/Game";
import Head from "next/head";

const Flipcard = () => {
    const [cardsAmount, setCardsAmount] = useState(null);


    return (
        <>
            <Head>
                <title>Memo Game</title>
                <meta name="description" content="Memo Game"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.flipCard}>
                {cardsAmount === null ? (
                    <div className={styles.difficulty}>
                        <p>Choose your difficulty</p>
                        <div className={styles.buttons}>
                            <button onClick={() => setCardsAmount(12)}>Easy</button>
                            <button onClick={() => setCardsAmount(24)}>Medium</button>
                            <button onClick={() => setCardsAmount(36)}>Hard</button>
                        </div>
                    </div>
                ) : (
                    <Game options={cardsAmount} setOptions={setCardsAmount}/>
                )}
            </main>
        </>
    );
};

export default Flipcard;