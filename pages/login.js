import React, {useState} from 'react';
import firebase from "firebase/app";
import {useAuth} from "../context/AuthContext";
import {router} from "next/client";
import Link from "next/link";

const Login = () => {
    const {user, login} = useAuth();
    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(data.email, data.password);
            await router.push('/')
        } catch (err) {
            console.log(err);
        }
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" required onChange={(e) => setData({...data, email: e.target.value})}
                           value={data.email}/>
                </label>
                <label>
                    Password:
                    <input type="password" required onChange={(e) => setData({...data, password: e.target.value})}
                           value={data.password}/>
                </label>
                <button type="submit">Log In</button>
            </form>

            <p>Don't have account? Create now!</p>
            <Link href={'/signup'}>Sign Up</Link>
        </>
    );
};

export default Login;