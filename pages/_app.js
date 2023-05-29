import '../styles/globals.scss'
import {AuthContextProvider} from "../context/AuthContext";
import {appWithTranslation} from "next-i18next";
import Navbar from "../components/layout/navbar";

function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <Navbar/>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default appWithTranslation(MyApp)
