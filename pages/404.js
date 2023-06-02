import Image from "next/image";
import Navbar from "../components/layout/navbar";
import Head from "next/head";
import styles from "../styles/404.module.scss"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Custom404() {
    const {t} = useTranslation("common");


    return (
        <>
            <Head>
                <title>{t("p404")}</title>
                <meta name="description" content="Page not found"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section>
                <div className={styles.wrapper404}>
                    <h1 className={styles.title404}>{t("e404")}</h1>
                </div>
            </section>
        </>
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