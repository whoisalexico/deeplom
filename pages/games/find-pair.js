import React, {useState} from 'react';
import styles from '../../styles/FlipCard.module.scss'
import Navbar from "../../components/layout/navbar";
import Game from "../../components/flipcards/Game";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const FindPair = () => {
    const [cardsAmount, setCardsAmount] = useState(null);
    const {t} = useTranslation("common")


    return (
        <>
            <Head>
                <title>{t("flipcard")}</title>
                <meta name="description" content={t("flipcard")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.flipCard}>
                {cardsAmount === null ? (
                    <div className={styles.difficulty}>
                        <p>{t("chooseyourdifficulty")}</p>
                        <div className={styles.buttons}>
                            <button onClick={() => setCardsAmount(12)}>{t("easy")}</button>
                            <button onClick={() => setCardsAmount(24)}>{t("medium")}</button>
                            <button onClick={() => setCardsAmount(36)}>{t("hard")}</button>
                        </div>
                    </div>
                ) : (
                    <Game options={cardsAmount} setOptions={setCardsAmount}/>
                )}
            </main>
        </>
    );
};

export default FindPair;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}