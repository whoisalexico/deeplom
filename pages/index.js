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
                <title>Deeplom</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.heroWrapper}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <h2 className={styles.subtitle}>Fantasy and Imagination</h2>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
                        animi consectetur distinctio doloremque fuga incidunt provident saepe similique! Accusamus at
                        deleniti eum expedita hic inventore obcaecati repellendus sequi vero voluptates. A harum, id
                        ipsum itaque labore obcaecati quod reprehenderit sunt!</p>
                </div>
            </main>

            <footer className={styles.footer}>
                {/*<a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>*/}
            </footer>
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