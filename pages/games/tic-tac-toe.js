import React from 'react';
import Head from "next/head";

import Navbar from "../../components/layout/navbar";
import Game from "../../components/tic-tac-toe/Game/Game";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const TicTacToe = () => {
    return (
        <div>
            <Head>
                <title>Tic Tac Toe</title>
            </Head>
            <Game/>
        </div>
    );
};

export default TicTacToe;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}