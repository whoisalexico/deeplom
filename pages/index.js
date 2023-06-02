import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Navbar from "../components/layout/navbar";

export default function Home() {
    const {t} = useTranslation("common");


    return (
        <div className={styles.container}>
            <Head>
                <title>{t("title")}</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.heroWrapper}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <h2 className={styles.subtitle}>{t('subtitle')}</h2>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}