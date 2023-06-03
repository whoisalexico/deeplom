import React, { useState } from "react";
import {useTranslation} from "next-i18next";

function Difficulty({ difficulty, setDifficulty }) {
    const {t} = useTranslation("common")

    const [levels, setLevels] = useState([
        {
            id: 0,
            title: t("easy")
        },
        {
            id: 1,
            title: t("medium")
        },
        {
            id: 2,
            title: t("hard")
        }
    ]);
    return (
        <div className="difficulty-container">
            <h4>{t("dob")}</h4>
            <div className="difficulty-wrap">
            {
                levels.map(level => {
                    return (
                        <label key={level.id} className="difficulty-label">
                            <input className="difficulty-radio" onChange={() => setDifficulty(level.id)} checked={difficulty === level.id} type="radio"/>
                            <span className="difficulty-text">{level.title}</span>
                        </label>
                    )
                })
            }
            </div>
        </div>
    );
}

export default Difficulty;