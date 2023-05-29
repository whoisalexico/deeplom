import React, {useEffect, useRef, useState} from "react";
import Navbar from "../../components/layout/navbar";
import Board from "../../components/chess/Board/Board";
import Head from "next/head";
import store from "../../components/chess/redux/store";
import {Provider} from "react-redux";

const Chess = () => {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>Chess Game</title>
                    <meta name="description" content="Chess Game"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Board/>
            </Provider>
        </>
    )
};
export default Chess;