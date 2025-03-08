import { useState, useEffect } from 'react';
import styles from "./ModalStyles.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Components
import { errorMessage, successMessage, warningMessage } from '../../../Components/Modules/Toast/ToastCustom';
import ToggleSwitch from '../../../Components/Modules/ToggleSwitch/ToggleSwitch';
import Button2 from '../../../Components/Modules/Button2/Button2';
import Input3 from '../../../Components/Modules/Input3/Input3';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

//Icons
import {
    faXmark,
    faCheck,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddAndEditHalls({ action = "add", infoItem, toggleModal }) {
    const [hallsInfo, setHallsInfo] = useState({
        hall_status: false,
        hall_name: "",
        hall_code: "",
        hall_description: ""
    })
    const [helperText, setHelperText] = useState({
        help_name: "",
        help_code: "",
        help_description: ""
    })
    // Validation function
    const validateField = (name, value) => {
        let errorMessage = "";

        if (name === "hall_code" && !/^\d*$/.test(value)) {
            errorMessage = "فقط اعداد وارد کنید! ";
        }

        setHelperText((prev) => ({
            ...prev,
            [name]: errorMessage
        }));

        return errorMessage === ""; // Return true if no errors
    };

    // Handle change and validation
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Validate input
        // const isValid = validateField(name, value);
        if (name === "hall_code" && !/^\d*$/.test(value)) {
            setHelperText((prev) => ({
                ...prev,
                help_code: "فقط عدد وارد کنید! "
            }));
            return
        }

        // if (isValid) {
        setHallsInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        warningMessage("handle submit")
    }

    useEffect(() => {
        if (action === "edit") {
            setHallsInfo({
                hall_status: infoItem.hall_status,
                hall_name: infoItem.hall_name,
                hall_code: infoItem.hall_code,
                hall_description: infoItem.hall_description
            })
        }
    }, [])
    console.log(hallsInfo)
    console.log(helperText)
    return (
        <Grid container
            sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: "column",
                gap: { xs: "1rem" }
            }}
            className={styles.modal_parent}>
            <Grid
                item
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}
            >
                <Typography className={styles.title_modal} variant='body1'>
                    {action === "add" ?
                        "تعریف سالن جدید" : action === "edit" ?
                            `ویرایش سالن ${infoItem ?
                                infoItem.code : "123"}`
                            : "افزودن آیتم"}
                </Typography>
                <Box className={styles.delete_icon_modal}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => toggleModal()}
                    />
                </Box>

            </Grid>
            <Divider orientation="horizontal" color='#9f9f9f' variant="fullWidth" flexItem />
            <Box
                component="form"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: { xs: "2rem", sm: "", md: "", lg: "", xl: "" },
                    width: "100%"

                }}
                noValidate
                autoComplete="off"
            >
                <Grid
                    item
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: "center",
                    }}>
                    <Typography variant='body2' className={styles.input_label}>{"وضعیت سالن"}</Typography>
                    <ToggleSwitch value={hallsInfo.hall_status} handleChange={handleChange} name='hall_status' />

                </Grid>
                <Grid
                    item
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        flexDirection: "column",
                        gap: { xs: "1rem" },
                    }}>
                    <Input3
                        id='hall_name_modal'
                        name='hall_name'
                        value={hallsInfo.hall_name}
                        handleChange={handleChange}
                        helperText={helperText.help_name}
                        lable='نام سالن:'
                        placeholder='نام سالن را وارد نمایید'
                        type='text'
                        key={1}
                    />
                    <Input3
                        id='hall_code_modal'
                        name='hall_code'
                        value={hallsInfo.hall_code}
                        handleChange={handleChange}
                        helperText={helperText.help_code}
                        lable='کد سالن:'
                        placeholder='کد سالن را وارد نمایید'
                        type='text'
                        key={2}
                    />
                    <Input3
                        id='hall_description_modal'
                        name='hall_description'
                        value={hallsInfo.hall_description}
                        handleChange={handleChange}
                        helperText={helperText.help_description}
                        lable='توضیحات:'
                        placeholder='توضیحات اضافی خود را وارد نمایید'
                        type='text'
                        key={3}
                        styleInput={"textfield_modal"}
                        isTextAarea={true}
                        textAareaRows={8}
                    />

                </Grid>
                <Button2
                    text={action === "add" ? "تایید اطلاعات" : "ویرایش اطلاعات"}
                    icon={action === "add" ? faCheck : faPenToSquare}
                    style={"search_btn_modal"}
                    onClick={handleSubmitForm}
                    type='submit'
                />
            </Box>
        </Grid>
    )
}

export default AddAndEditHalls
