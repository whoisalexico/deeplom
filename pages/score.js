import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Navbar from "../components/layout/navbar";
import {DataGrid} from "@mui/x-data-grid";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Score = () => {
    const [rows, setRows] = useState([]);
    const columns = [
        {field: 'id', headerName: 'ID', width: window.innerWidth / 4},
        {field: 'nickname', headerName: 'Nickname', width: window.innerWidth / 4},
        {field: 'game', headerName: 'Game Title', width: window.innerWidth / 4},
        {field: 'pts', headerName: 'Points', width: window.innerWidth / 4},
    ]


    const getScores = async () => {
        const db = getFirestore();
        const collectionRef = await getDocs(collection(db, "scores"));
        const res = [];
        let id = 1;
        collectionRef.forEach(doc => {
            const data = doc.data();
            res.push({
                id: id,
                nickname: data.nickname,
                game: data.game,
                pts: data.score,
            })
            id++;
        })
        return res;
    }
    const setRes = async () => {
        const res = await getScores();
        setRows([...res]);
        console.log(rows)
    }

    useEffect(() => {
        setTimeout(setRes, 2000)
    }, [])

    return (
        <>
            <Head>
                <title>Games</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {rows === [] ? (
                <div>Fetching data...</div>
            ) : (
                <DataGrid sx={{color: '#000'}} columns={columns} rows={rows} width/>
            )}


        </>
    );
};

export default Score;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}