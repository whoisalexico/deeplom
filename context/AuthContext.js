import {createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { getFirestore, collection, addDoc } from "firebase/firestore";


const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser({
                    uid: user.uid,
                    email: user.email,
                    nickname: user.displayName,
                });
            }
            else{
                setUser(null)
            }
            setLoading(false);
        });
        return ()=> unsubscribe();
    },[]);
    const signup = async (email, password, nickname)=>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const db = getFirestore();
            const usersCollection = collection(db, "users");
            await addDoc(usersCollection, {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                nickname: nickname,
            });
            console.log(user);
        }catch (e){
            console.log(e)
        }
    }

    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () =>{
        setUser(null);
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{user, login, signup, logout}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}