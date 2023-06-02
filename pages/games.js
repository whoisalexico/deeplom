import React, {useContext} from 'react';
import Link from "next/link";
import Head from "next/head";
import {resetGame} from "../components/chess/redux/gameSlice";
import {useAppDispatch} from "../components/chess/redux/hooks";
import styles from "../styles/games.module.scss";
import {useAuth} from "../context/AuthContext";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const Games = () => {
    const data = useContext(useAuth);
    const {user} = useAuth()
    const {t} = useTranslation("common")
    return (
        <>
            <Head>
                <title>Games</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.games}>
                <ul>
                    <li><Link href={"/games/chess"} onClick={() => useAppDispatch(resetGame())}>{t("chess")}</Link></li>
                    <li><Link href={"/games/find-pair"}>{t("flipcard")}</Link></li>
                    <li><Link href={"/games/tags"}>{t("puzzle")}</Link></li>
                    <li><Link href={"/games/tic-tac-toe"}>{t("tictactoe")}</Link></li>
                    <li><Link href={"/games/sea-battle"}>{t("seabattle")}</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Games;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}