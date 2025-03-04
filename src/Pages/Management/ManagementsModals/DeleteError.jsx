import * as React from 'react';
import styles from "./ModalStyles.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { errorMessage, successMessage, warningMessage } from '../../../Components/Modules/Toast/ToastCustom';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';

//Icons
import {
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function DeleteError({ toggleModal, type = "hall", infoItem }) {
    const deleteItem = async () => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.delete(`${apiUrl}/app/${type === "hall" ? "" : type === "repairman" ? "" : type === "equipment" ? "" : ""}${infoItem.uuid}/`, {
                headers,
            });

            if (response.status === 200) {
                console.log(response.data);
                toggleModal()
                successMessage("حذف انجام شد")
            }
        } catch (error) {
            console.log(error);
            toggleModal()
            errorMessage("خطا در عملیات")

        }
    };
    return (
        <Grid
            container
            sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: "column",
                gap: { xs: "1rem" }
            }}
            className={styles.modal_parent}
        >
            <Grid
                item
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}
            >
                <Typography>test</Typography>
                <FontAwesomeIcon
                    icon={faXmark}
                    className="delete-icon-modal"
                    onClick={() => toggleModal()}
                />
            </Grid>
            <Grid
                item
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: "center",
                }}
            >
                <Button onClick={() => deleteItem()} className={styles.confirm_btn} variant='contained'>حذف</Button>
                <Button onClick={() => toggleModal()} className={styles.cancell_btn} variant='contained'>انصراف</Button>
            </Grid>



        </Grid>
    )
}

export default DeleteError
//  <div className="div-delete">
//                 <div className="close-delete-modal">
//                   <FontAwesomeIcon
//                     icon={faXmark}
//                     className="delete-icon-modal"
//                     onClick={() => {
//                       setShowModal(false);
//                     }}
//                   />
//                 </div>
//                 <p className="delete-text">آیا از حذف اطمینان دارید؟</p>
//                 <div className="delete-actions">
//                   <button
//                     className="btn-delete btn-yes-delete"
//                     onClick={() => deleteMainStatement(idDelete)}
//                   >
//                     بله
//                   </button>
//                   <button
//                     className="btn-delete btn-no-delete"
//                     onClick={() => {
//                       setShowModal(false);
//                     }}
//                   >
//                     خیر
//                   </button>
//                 </div>
//               </div>