import React from 'react';
import Game from "../../components/sea-battle/Game";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";

const SeaBattle = () => {
    const {t} = useTranslation("common")

    return (
        <>
            <Head>
                <title>{t("seabattle")}</title>
                <meta name="description" content={t("seabattle")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <Game/>
            </div>
        </>
    );
};

export default SeaBattle;

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}