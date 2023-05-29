import React from 'react';
import Head from 'next/head'
import Navbar from "../../components/layout/navbar";
import Board from "../../components/15puzzle/Board";
import styles from "../../styles/Puzzle15.module.scss"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const Tags = () => {
    return (
        <>
            <Head>
                <title>Tags Game</title>
                <meta name="description" content="15Puzzle Game"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.puzzleWrapper}>
                <Board/>
            </div>
        </>
    );
};

export default Tags;


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}