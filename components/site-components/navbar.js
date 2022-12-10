import React from 'react';
import styles from "./Navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <ul className={styles.navList}>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/games"}>Games</Link></li>
                <li>About</li>
                <li><Link href={"/rules"}>Rules</Link></li>
                <li>Contacts</li>
            </ul>
        </nav>
    );
};

export default Navbar;