import React from 'react';
import Game from "../../components/sea-battle/Game";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const SeaBattle = () => {
    return (
        <div>
            <Game/>
        </div>
    );
};

export default SeaBattle;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}