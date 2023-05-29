import React from 'react';
import styles from "./Navbar.module.scss";
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Navbar = () => {
    const {user, logout} = useAuth()
    const router = useRouter();
    const { t } = useTranslation();

    const handleLocaleChange = (event) => {
        const value = event.target.value;

        router.push(router.route, router.asPath, {
            locale: value,
        });
    };

    return (
        <nav>
            <ul className={styles.navList}>
                <li><Link href={"/"}>{t("home")}</Link></li>
                <li><Link href={"/games"}>{t("games")}</Link></li>
                <li><Link href={"/rules"}>{t("rules")}</Link></li>
                <li><Link href={'/score'}>{t("score")}</Link></li>
                {user ? (
                    <li onClick={() => {
                        logout()
                    }}><Link href={'/'}>{t("logout")}</Link></li>
                ) : (
                    <li><Link href={'/login'}>{t("login")}</Link></li>
                )}
            </ul>
            <select onChange={handleLocaleChange} value={router.locale}>
                <option value="en">us English</option>
                <option value="ru">ru Русский</option>
            </select>
        </nav>
    );
};

export default Navbar;