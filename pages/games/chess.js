import React, {useEffect, useRef, useState} from "react";
import Navbar from "../../components/site-components/navbar";
import Board from "../../components/chess/Board/Board";

const Chess = () => {
    return (
        <>
            <Navbar/>
            <Board/>
        </>
    )
};
export default Chess;