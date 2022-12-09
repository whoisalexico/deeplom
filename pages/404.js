import Image from "next/image";
import Navbar from "../components/site-components/navbar";
import styles from "../styles/404.module.scss"

export default function Custom404() {
    return (
        <>
            <Navbar/>
            <section>
                <div className={styles.wrapper404}>
                    <h1 className={styles.title404}>Error 404 — Page not found</h1>
                    <div className={styles.imageWrapper}>
                        <Image src={"/img/404/404.svg"} width={1840} height={688} className={styles.image404}/>
                    </div>
                </div>
            </section>
        </>
    )
}