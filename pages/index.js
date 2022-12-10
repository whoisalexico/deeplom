import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import Navbar from "../components/site-components/navbar";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Deeplom</title>
                <meta name="description" content="Kids Games"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main className={styles.main}>
             {/*   <Image src={"/img/home/gold.svg"} width={822} height={660} className={styles.gold}/>*/}
                <div className={styles.heroWrapper}>
                    <h1 className={styles.title}>Kids Games</h1>
                    <h2 className={styles.subtitle}>Fantasy and Imagination</h2>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
                        animi consectetur distinctio doloremque fuga incidunt provident saepe similique! Accusamus at
                        deleniti eum expedita hic inventore obcaecati repellendus sequi vero voluptates. A harum, id
                        ipsum itaque labore obcaecati quod reprehenderit sunt!</p>
                </div>
                <div className={styles.heroIllustration}>
{/*
                    <Image src={"/img/home/illustration.svg"} width={745} height={615}/>
*/}
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
