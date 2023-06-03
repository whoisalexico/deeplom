import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/router";
import Link from "next/link";
import {TextField, Button} from "@mui/material";
import s from '../styles/Auth.module.scss'
import Navbar from "../components/layout/navbar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Head from "next/head";


const Login = () => {
    const {t} = useTranslation("common")

    const {user, login} = useAuth();
    console.log(user)
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(data.email, data.password);
            await router.push('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>{t("authpage")}</title>
                <meta name="description" content={t("authpage")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={s.auth}>
                <form className={s.authForm} onSubmit={handleLogin}>
                    <TextField className={s.input} required id="standard-required" variant='standard' label={t("email")}
                               type="email" defaultValue=""
                               value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    <TextField className={s.input} required id="standard-required" variant='standard' label={t("password")}
                               type="password" defaultValue=""
                               value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    <Button className={s.button} type="submit" variant="outlined">{t("auth")}</Button>
                    <div className={s.signup}>
                        <p>{t("dha")}</p>
                        <Link href={'/signup'}>{t("signup")}</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}