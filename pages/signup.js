import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/router";
import Navbar from "../components/layout/navbar";
import s from "../styles/Auth.module.scss";
import {Button, TextField} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Head from "next/head";


const Signup = () => {
    const router = useRouter();
    const {user, signup} = useAuth();
    const {t} = useTranslation("common")

    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
        nickname: '',
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(data.email, data.password, data.nickname);
            await router.push('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>{t("regpage")}</title>
                <meta name="description" content={t("regpage")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={s.auth}>
                <form className={s.authForm} onSubmit={handleSignup}>
                    <TextField className={s.input} required id="standard-required" variant='standard' label={t("email")} type="email" defaultValue=""
                               value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    <TextField className={s.input} required id="standard-required" variant='standard' label={t("password")} type="password" defaultValue=""
                               value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    <TextField className={s.input} required id="standard-required" variant='standard' label={t("nickname")} type="text" defaultValue=""
                               value={data.nickname} onChange={(e) => setData({...data, nickname: e.target.value})}/>
                    <Button className={s.button} type="submit" variant="outlined">{t("signup")}</Button>
                </form>
            </div>
        </>
    );
};

export default Signup;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}