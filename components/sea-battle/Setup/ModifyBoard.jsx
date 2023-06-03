import React from "react";
import {useTranslation} from "next-i18next";

function ModifyBoard({ randomiseBoard, resetBoard }) {
    const {t} = useTranslation("common")

    return (
        <div className="board-modify">
            <div onClick={() => randomiseBoard()} className="modify-text">{t("randomise")}</div>
            <div onClick={() => resetBoard()} className="modify-text">{t("resetboard")}</div>
        </div>
    )
}

export default ModifyBoard;