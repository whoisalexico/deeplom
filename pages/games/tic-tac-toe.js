import React from 'react';
import Head from "next/head";

import Board from "../../components/tic-tac-toe/Board";
import Navbar from "../../components/layout/navbar";
import Game from "../../components/tic-tac-toe/Game";
const TicTacToe = () => {
    return (
        <div>
            <Head>
                <title>Tic Tac Toe</title>
            </Head>
            <Navbar/>
            <Game/>
        </div>
    );
};

export default TicTacToe;