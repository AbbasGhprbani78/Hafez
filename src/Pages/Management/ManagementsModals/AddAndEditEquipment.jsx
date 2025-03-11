import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from "./ModalStyles.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Components
import { errorMessage, successMessage, warningMessage } from '../../../Components/Modules/Toast/ToastCustom';
import ToggleSwitch from '../../../Components/Modules/ToggleSwitch/ToggleSwitch';
import Button2 from '../../../Components/Modules/Button2/Button2';
import Input3 from '../../../Components/Modules/Input3/Input3';
import { FullReactDropDown } from '../../../Components/Modules/Input3/Input3';

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

function AddAndEditEquipment({ action = "add", infoItem, toggleModal, hallsInfo = [] }) {
    const [equipmentInfo, setEquipmentInfo] = useState({
        equip_status: false,
        equip_name: "",
        equip_code: "",
        equip_hall: 0,
        equip_description: ""
    })
    const [helperText, setHelperText] = useState({
        help_name: "",
        help_code: "",
        help_halls: " ",
        help_description: ""
    })

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        warningMessage("handle submit equipment")
    }

    // Handle change and validation
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Validate input
        // const isValid = validateField(name, value);
        // if (name === "hall_code" && !/^\d*$/.test(value)) {
        //     setHelperText((prev) => ({
        //         ...prev,
        //         help_code: "فقط عدد وارد کنید! "
        //     }));
        //     return
        // }

        // if (isValid) {
        setEquipmentInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // }
    };

    useEffect(() => {
        if (action === "edit") {
            setEquipmentInfo({
                equip_status: infoItem.equip_status,
                equip_name: infoItem.equip_name,
                equip_code: infoItem.equip_code,
                equip_hall: infoItem.equip_hall,
                equip_description: infoItem.equip_description
            })
        } else if (action === "add") {
            setEquipmentInfo({
                equip_status: false,
                equip_name: "",
                equip_code: "",
                equip_hall: null,
                equip_description: ""
            })
        }
    }, [action])

    const handleChangeHalls = (hallsCode) => {
        setEquipmentInfo(prevstate => ({ ...prevstate, equip_hall: hallsCode }))
    }
    const handleFormatCloseModal = () => {
        toggleModal();
        setEquipmentInfo({
            equip_status: false,
            equip_name: "",
            equip_code: "",
            equip_hall: null,
            equip_description: ""
        })
    }

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
                        "تعریف تجهیزات جدید" : action === "edit" ?
                            `ویرایش تجهیزات ${infoItem ?
                                infoItem.equip_code : "Equipment Code"}`
                            : "افزودن تجهیزات"}
                </Typography>
                <Box className={styles.delete_icon_modal} onClick={() => handleFormatCloseModal()}>
                    <FontAwesomeIcon
                        icon={faXmark}

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
                    gap: { xs: "0.7rem", sm: "0.9rem", md: "1.2 rem" },
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
                    <Typography variant='body2' className={styles.input_label}>{"وضعیت تجهیزات"}</Typography>
                    <ToggleSwitch value={equipmentInfo.equip_status} handleChange={handleChange} name='equip_status' />

                </Grid>
                <Grid
                    item
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        flexDirection: "column",
                        gap: { xs: "0.5rem", sm: "0.7rem", md: "1 rem", },
                    }}>
                    <Input3
                        id='equip_name_modal'
                        name='equip_name'
                        value={equipmentInfo.equip_name}
                        handleChange={handleChange}
                        helperText={helperText.help_name}
                        lable='نام تجهیزات:'
                        placeholder='نام تجهیزات را وارد نمایید'
                        type='text'
                        key={4}
                    />
                    <Input3
                        id='equip_code_modal'
                        name='equip_code'
                        value={equipmentInfo.equip_code}
                        handleChange={handleChange}
                        helperText={helperText.help_code}
                        lable='کد تجهیزات:'
                        placeholder='کد تجهیزات را وارد نمایید'
                        type='text'
                        key={5}
                    />
                    <FullReactDropDown
                        options={hallsInfo}
                        handleChange={handleChangeHalls}
                        helperText={helperText.help_halls}
                        lable="انتخاب سالن:"
                        selected={action === "edit" ? equipmentInfo.equip_hall : null}
                        key={6}
                    />
                    <Input3
                        id='equip_description_modal'
                        name='equip_description'
                        value={equipmentInfo.equip_description}
                        handleChange={handleChange}
                        helperText={helperText.help_description}
                        lable='توضیحات:'
                        placeholder='توضیحات اضافی خود را وارد نمایید'
                        type='text'
                        key={6}
                        styleInput={"textfield_modal"}
                        isTextAarea={true}
                        textAareaRows={5}
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

export default AddAndEditEquipment

