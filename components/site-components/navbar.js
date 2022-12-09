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
                <li>Rules</li>
                <li>Contacts</li>
            </ul>
        </nav>
    );
};

export default Navbar;