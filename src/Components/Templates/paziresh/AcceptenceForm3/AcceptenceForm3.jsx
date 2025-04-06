import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from "./AcceptenceForm3.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Other Components
import { ToastContainerCustom } from '../../../Modules/Toast/ToastCustom';
import { errorMessage, successMessage, warningMessage, infoMessage } from '../../../Modules/Toast/ToastCustom';
import LoadingForm from '../../../Modules/Loading/LoadingForm';
import Modal from '../../../Modules/Modal/Modal';
import Button2 from '../../../Modules/Button2/Button2';

//Mui Components
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';




//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faFile,
    faMicrophoneSlash,
    faFileLines, faXmark,
    faImage,
    faPen,
    faTrash,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';


function AcceptenceForm3({
    nextTab,
    prevTab,
    setContent,
    customer
}) {

    const [loading, setLoading] = useState(false)
    const [expertFileModal, setExpertFileModal] = useState(false)

    //set functions
    const handleToggleModal = () => {
        setExpertFileModal((modal) => !modal)
    }

    //Handle click on buttons function

    useEffect(() => {
        setContent("اظهارات مشتری:")
    }, [])

    return (
        <Grid size={12} sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'flex-start',
            alignItems: { xs: "flex-start", md: "center" },
            gap: ".5rem"
        }}>
            <Modal showModal={expertFileModal} setShowModal={handleToggleModal}>
            </Modal>
            <Typography

                display={{ xs: "block", md: "none" }}
                marginTop={{ xs: ".4rem", sm: ".5rem", md: ".6rem" }}
                fontSize={{ xs: ".9rem", sm: "1rem", md: "1.2rem" }}
                variant="body2" className={styles.title_page}>
                اظهارات مشتری:
            </Typography>
            <Grid
                className={styles.form3_container}
                size={{ xs: 12 }}
                padding={{ xs: ".8rem .8rem", sm: ".9rem .9rem", md: "1rem", lg: "1.1rem", xl: "1.2rem", xxl: "1.3rem" }}
                width={{ xs: "100%", md: "98%", lg: "96%", xl: "94%", xxl: "92%" }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: { xs: "0.7rem", sm: "0.9rem", md: "1.2 rem" },
                        width: "100%"

                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", md: "flex-start" },
                            alignItems: "flex-start",
                            width: "100%",
                            flexDirection: { xs: "column", md: "row" }
                        }}>

                    </Grid>

                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            flexDirection: { xs: "row" }
                        }}>
                        <Grid size={{ xs:}}></Grid>
                    </Grid>

                </Box>
            </Grid>
            {loading && <LoadingForm />}

        </Grid>
    )
}

export default AcceptenceForm3
