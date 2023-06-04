import React, {useState} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Head from "next/head";
import s from "../styles/Rules.module.scss"
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Rules = () => {
    const {t} = useTranslation("common")
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Head>
                <title>{t("rules")}</title>
                <meta name="description" content={t("rules")}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={s.rulesWrapper}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography><p className={s.gameTitle}>{t("chess")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p className={s.gameDescription}>{t("chessfield")} <br/>{t("chessdesc")} <br/> {t("chessgoal")}<br/> {t("chessking")}<br/> {t("chessqueen")}<br/>{t("chessbishop")}<br/>{t("chessrook")}<br/>{t("chessknight")}<br/>{t("chesspawn")}</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography><p className={s.gameTitle}>{t("flipcard")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p className={s.gameDescription}>{t("fpr")}</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography><p className={s.gameTitle}>{t("puzzle")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p className={s.gameDescription}>{t("tr")}</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <Typography><p className={s.gameTitle}>{t("tictactoe")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p className={s.gameDescription}>{t("tttr")}</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                        <Typography><p className={s.gameTitle}>{t("seabattle")}</p></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p className={s.gameDescription}>{t("sbr")} <br/> {t("sbg")} <br/> {t("sbrsp")} <br/> {t("sbrm")} </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
        </>
    );
};

export default Rules;

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
}