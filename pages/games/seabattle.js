import React, {useEffect} from 'react';
import Head from "next/head";
import Navbar from "../../components/layout/navbar";
import {store} from "../../components/seabattle/redux/store";
import {Provider} from "react-redux";
import Game from "../../components/seabattle/game";

const Seabattle = () => {

    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>Chess Game</title>
                    <meta name="description" content="Chess Game"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Navbar/>
                <Game/>
            </Provider>
        </>
    );
};

export default Seabattle;