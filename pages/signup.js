import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {router} from "next/client";

const Signup = () => {
    const {user, signup} = useAuth();
    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(data.email, data.password);
            await router.push('/')
        } catch (err) {
            console.log(err);
        }
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder='Email' required
                       onChange={(e) => setData({...data, email: e.target.value})} value={data.email}/>
                <input type="password" placeholder='Password' required
                       onChange={(e) => setData({...data, password: e.target.value})} value={data.password}/>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;