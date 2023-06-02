import React from 'react';
import styles from "./Navbar.module.scss";
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Navbar = () => {
    const {user, logout} = useAuth()
    const { t } = useTranslation();


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
        </nav>
    );
};

export default Navbar;