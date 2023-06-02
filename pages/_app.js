import '../styles/globals.scss'
import {AuthContextProvider} from "../context/AuthContext";
import {appWithTranslation} from "next-i18next";
import Navbar from "../components/layout/navbar";
import "../components/sea-battle/styles/Game.scss";
import "../components/sea-battle/styles/Board.scss";
import "../components/sea-battle/styles/Ship.scss";
import Footer from "../components/layout/footer";

function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <Navbar/>
            <Component {...pageProps} />
            <Footer/>
        </AuthContextProvider>
    )
}

export default appWithTranslation(MyApp)
