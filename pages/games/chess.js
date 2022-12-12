import React, {useEffect, useRef, useState} from "react";
import Navbar from "../../components/site-components/navbar";
import Board from "../../components/chess/Board/Board";
import Head from "next/head";

const Chess = () => {
    return (
        <>
            <Head>
                <title>Chess Game</title>
                <meta name="description" content="Chess Game"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <Board/>
        </>
    )
};
export default Chess;