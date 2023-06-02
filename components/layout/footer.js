import {useState} from 'react';
import styles from "./Footer.module.scss";
import Image from "next/image";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {Box, ButtonGroup, Switch, Button} from "@mui/material";

const Footer = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(true);

    const handleLocaleChange = (lang) => {
        /*const value = event.target.value;
        setChecked(event.target.checked);
*/
        router.push(router.route, router.asPath, {
            locale: lang,
        });
    };

    return (
        <footer className={styles.footer}>
            <Image src={"/logo.svg"} width={359} height={73} alt={"logo"}/>
            <p>{t("graduationproject")}</p>
            <ButtonGroup variant="contained" aria-label="outlined button group">
                <Button sx={{backgroundColor: "#000", borderColor: "#fff !important"}} onClick={()=>handleLocaleChange("en")}>{t("en")}</Button>
                <Button sx={{backgroundColor: "#000", borderColor: "#fff !important"}} onClick={()=>handleLocaleChange("ru")}>{t("ru")}</Button>
            </ButtonGroup>
        </footer>
    );
};

export default Footer;