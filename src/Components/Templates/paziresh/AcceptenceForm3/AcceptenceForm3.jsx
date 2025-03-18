import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from "./AcceptenceForm3.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Other Components
import MuiStepper from '../../../Modules/MuiStepper/MuiStepper';
import SideBar from '../../../Modules/SideBar/SideBar';
import Header from '../../../Modules/Header/Header';
import { ToastContainerCustom } from '../../../Modules/Toast/ToastCustom';
import { errorMessage, successMessage, warningMessage, infoMessage } from '../../../Modules/Toast/ToastCustom';
import LoadingForm from '../../../Modules/Loading/LoadingForm';
import Modal from '../../../Modules/Modal/Modal';

//Mui Components
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';


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

    const [expertFileModal, setExpertFileModal] = React.useState(false)

    //set functions
    const handleToggleModal = () => {
        setExpertFileModal((modal) => !modal)
    }

    return (
        <Grid className="content-conatiner">
            <Modal showModal={expertFileModal} setShowModal={handleToggleModal}>
            </Modal>
            <SideBar />
            <ToastContainerCustom />
            <Grid
                item
                size={{ xs: 12 }}
                container
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%"
                }}
                minWidth={100}
                gap={{ xs: "0.5rem", sm: "0.7rem", md: "1rem", lg: "1.5rem", xl: "2rem" }}
                className={`space-content ${styles.wrap_repairs}`} >
                <Header title={"اظهارات مشتری:"} disabledButton={true} />
                {/* <Grid
                    item
                    container
                    size={12}
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        justifyContent: { sm: "center", md: "flex-start" },
                        alignItems: "center",
                        width: "100%",
                        gap: { sm: "1rem", md: "1.2rem", lg: "1.4rem" }
                    }}>

                    {tabHeaders.map((item, index) => (
                        <Button
                            onClick={() => handleChange(item.value)}
                            aria-label={item.tabNameEn}
                            key={index}
                            variant='contained'
                            className={` ${tab === item.value ? styles.active_btn : styles.manual_btn}`}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Grid> */}


            </Grid>

        </Grid>
    )
}

export default AcceptenceForm3
