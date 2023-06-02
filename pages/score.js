import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Navbar from "../components/layout/navbar";
import {DataGrid} from "@mui/x-data-grid";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Box, Tabs, Tab} from "@mui/material";
import s from "../styles/Score.module.scss"
import Typography from "@mui/material/Typography";
import {useTranslation} from "next-i18next";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: "24px 0"}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Score = () => {
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState(0);
    const [dbName, setDbName] = useState("ChessLeaderboard")
    const {t} = useTranslation("common")

    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'nickname', headerName: t("nickname"), width: 300},
        {field: 'game', headerName: t("gameTitle"), width: 300},
        {field: 'pts', headerName: t("pts"), width: 290},
    ]


    const getData = async () => {
        const db = getFirestore();
        const collectionRef = await getDocs(collection(db, dbName));
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
        const res = await getData();
        setRows([...res]);
        console.log(rows)
    }

    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 0:
                setDbName("ChessLeaderboard");
                break;
            case 1:
                setDbName("FindPairLeaderboard");
                break;
            case 2:
                setDbName("TagsLeaderboard");
                break;
            case 3:
                setDbName("TicTacToeLeaderboard");
                break;
            case 4:
                setDbName("SeaBattleLeaderboard");
                break;
        }
        console.log(dbName)
        setValue(newValue);

    };

    useEffect(() => {
        setRes()
    }, [getData()])
    useEffect(() => {
        setRes()
    }, [dbName])

    return (
        <>
            <Head>
                <title>{t("score")}</title>
                <meta name="description" content={t("score")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={s.tableContainer}>
                <Box sx={{width: 1000, height: "calc(100vh - 164px)"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t("chess")} {...a11yProps(0)} />
                        <Tab label={t("flipcard")} {...a11yProps(1)}/>
                        <Tab label={t("puzzle")} {...a11yProps(2)}/>
                        <Tab label={t("tictactoe")} {...a11yProps(3)}/>
                        <Tab label={t("seabattle")} {...a11yProps(4)}/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <DataGrid sx={{color: '#000', backgroundColor: "#fff"}} columns={columns} rows={rows} disableRowSelectionOnClick={true} initialState={{pagination: {paginationModel: {pageSize: 10,},},}}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DataGrid sx={{color: '#000', backgroundColor: "#fff"}} columns={columns} rows={rows} disableRowSelectionOnClick={true} initialState={{pagination: {paginationModel: {pageSize: 10,},},}}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DataGrid sx={{color: '#000', backgroundColor: "#fff"}} columns={columns} rows={rows} disableRowSelectionOnClick={true} initialState={{pagination: {paginationModel: {pageSize: 10,},},}}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <DataGrid sx={{color: '#000', backgroundColor: "#fff"}} columns={columns} rows={rows} disableRowSelectionOnClick={true} initialState={{pagination: {paginationModel: {pageSize: 10,},},}}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <DataGrid sx={{color: '#000', backgroundColor: "#fff"}} columns={columns} rows={rows} disableRowSelectionOnClick={true} initialState={{pagination: {paginationModel: {pageSize: 10,},},}}/>
                    </TabPanel>
                </Box>
            </div>
        </>
    );
};

export default Score;

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}