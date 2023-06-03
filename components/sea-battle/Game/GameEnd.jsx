import React, { useContext } from "react";
import { GameContext } from "../context";
import { generateBoard } from "../utils/Common";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useAuth} from "../../../context/AuthContext";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import Fireworks from "@fireworks-js/react";

function GameEnd({ setBoard1, setBoard2 }) {

    const { winner } = useContext(GameContext);
    const {user} = useAuth();
    const game = 'Sea Battle';
    const pts = Math.floor(Math.random() * (1500 - 1000) + 1000);
    const {t} = useTranslation("common");


    const setPoints = async (pts, game) => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("id", "==", user.uid))
            const snap = await getDocs(q);
            let nickname;
            snap.forEach((doc) => {
                const data = doc.data();
                nickname = data.nickname;
            })
            const docRef = await addDoc(collection(db, "SeaBattleLeaderboard"), {
                nickname: nickname,
                game: game,
                score: pts,
            })
        } catch (e) {

        }

    }

    function resetGame() {
        setBoard1([]);
        setBoard2(generateBoard());
    }
    return (
        <>

            {
                winner !== null && (
                    <>
                        <div className="game-end-container">
                            <p>{winner === 0 ? t("ulose") : t("uwon")}</p>
                            <Link onClick={()=>resetGame()} href="sea-battle">{t("playagain")}</Link>
                            <Link onClick={()=>setPoints(pts, game)} href="/games">{t("backtogames")}</Link>
                        </div>
                        {winner === 1 ? (
                            <Fireworks
                                options={{
                                    rocketsPoint: {
                                        min: 0,
                                        max: 100
                                    }
                                }}
                                style={{
                                    top: 82,
                                    left: 0,
                                    width: '100%',
                                    height: 'calc(100vh - 164px)',
                                    position: 'fixed',
                                    background: 'transparent'
                                }}
                            />
                        ) : (<></>)}
                    </>
                )
            }
        </>
    );
}

export default GameEnd;