import React, {useEffect, useRef, useState} from "react";
import Navbar from "../../components/layout/navbar";
import Board from "../../components/chess/Board/Board";
import Head from "next/head";
import store from "../../components/chess/redux/store";
import {Provider} from "react-redux";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Chess = () => {
    const {t} = useTranslation("common")

    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>{t("chess")}</title>
                    <meta name="description" content={t("puzzle")}/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Board/>
            </Provider>
        </>
    )
};
export default Chess;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}