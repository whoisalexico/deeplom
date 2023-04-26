import React from 'react';
import styles from "./Navbar.module.scss";
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useAuth()
    return (
        <nav>
            <ul className={styles.navList}>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/games"}>Games</Link></li>
                <li><Link href={"/rules"}>Rules</Link></li>
                <li><Link href={'/score'}>Score</Link></li>
                {user ? (
                    <li onClick={() => {
                        logout()
                    }}><Link href={'/'}>Logout</Link></li>
                ) : (
                    <li><Link href={'/login'}>Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;