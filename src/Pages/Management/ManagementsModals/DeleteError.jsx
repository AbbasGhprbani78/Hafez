import styles from "./ModalStyles.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { errorMessage, successMessage } from '../../../Components/Modules/Toast/ToastCustom';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

//Icons
import {
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function DeleteError({ toggleModal, type = "hall", infoItem, handleToggleUpdate }) {
    const deleteItem = async () => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.delete(`${apiUrl}/app/${type === "hall" ? "salon-update/" : type === "repairman" ? "add-repairman/" : type === "equipment" ? "equipment/" : ""}${infoItem.id}`, {
                headers,
            });

            if (response.status === 200) {
                handleToggleUpdate()
                successMessage("حذف با موفقیت انجام شد")
            }
        } catch (error) {
            console.log(error);
            toggleModal()
            errorMessage(" خطا در عملیات حذف سالن")

        }
    };
    console.log(infoItem)
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
                <Typography className={styles.title_modal} variant='body1'>{`حذف ${type === "hall" ? "سالن" : type === "repairman" ? "برنامه‌ریزی تعمیرکار" : type === "equipment" ? "تجهیزات" : "آیتم"}`}</Typography>
                <Box className={styles.delete_icon_modal} onClick={() => toggleModal()}>
                    <FontAwesomeIcon
                        icon={faXmark}

                    />
                </Box>

            </Grid>
            <Divider orientation="horizontal" color='#9f9f9f' variant="fullWidth" flexItem />
            <Grid
                item
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}
            >
                <Typography className={styles.description_modal} variant='body1'>
                    {
                        `آیا از حذف 
                        ${type === "hall"
                            ? "سالن"
                            : type === "repairman"
                                ? "برنامه‌ریزی تعمیرکار"
                                : type === "equipment"
                                    ? "تجهیزات"
                                    : "آیتم"}
                                    با نام 
                                    ${infoItem
                            ? `"${type === "repairman"
                                ? `${infoItem.first_name} ${infoItem.last_name}`
                                : infoItem.name}" `
                            : "123"} 
                            اطمینان دارید؟`}
                </Typography>
            </Grid>
            <Grid
                item
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: "center",
                    gap: { xs: "1rem", sm: "1.2rem", md: "1.4rem", lg: "1.6rem" }
                }}
            >
                <Button onClick={() => deleteItem()} className={styles.confirm_btn} variant='contained'>حذف</Button>
                <Button onClick={() => toggleModal()} className={styles.cancell_btn} variant='contained'>انصراف</Button>
            </Grid>
        </Grid>
    )
}

export default DeleteError
