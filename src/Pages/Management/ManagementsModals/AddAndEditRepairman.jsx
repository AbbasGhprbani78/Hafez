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
import MultipleSelectCheckmarks from '../../../Components/Modules/MultipleSelectCheckmarks/MultipleSelectCheckmarks';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

//Icons
import {
    faXmark,
    faCheck,
    faPenToSquare,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddAndEditRepairman({ action = "add", infoItem, toggleModal, hallsInfo = [] }) {
    const [repairmanInfo, setRepairmanInfo] = useState({
        repair_status: false,
        repair_name: "",
        repair_national_code: "",
        repair_phone_number: "",
        repair_expertise: "",
        repair_work_hours: 8,
        repair_username: "",
        repair_password: ""
    })
    const [repairHalls, setRepairHalls] = useState([])
    const [helperText, setHelperText] = useState({
        help_name: "",
        help_national_code: "",
        help_phone_number: "",
        help_expertise: "",
        help_work_hours: "",
        help_halls: "",
        help_username: "",
        help_password: "",
    })

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        warningMessage("handle submit repairman")
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
        setRepairmanInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // }
    };

    useEffect(() => {
        if (action === "edit") {
            setRepairmanInfo({
                repair_status: infoItem.repair_status,
                repair_name: infoItem.repair_name,
                repair_national_code: infoItem.repair_national_code,
                repair_phone_number: infoItem.repair_phone_number,
                repair_expertise: infoItem.repair_expertise,
                repair_work_hours: infoItem.repair_work_hours,
                repair_username: infoItem.repair_username,
                repair_password: infoItem.repair_password
            })
            setRepairHalls(infoItem.halls)

        } else if (action === "add") {
            setRepairmanInfo({
                repair_status: false,
                repair_name: "",
                repair_national_code: "",
                repair_phone_number: "",
                repair_expertise: "",
                repair_work_hours: 8,
                repair_username: "",
                repair_password: ""
            })
            setRepairHalls([])
        }
    }, [action])

    const handleFormatCloseModal = () => {
        toggleModal();
        setRepairmanInfo({
            repair_status: false,
            repair_name: "",
            repair_national_code: "",
            repair_phone_number: "",
            repair_expertise: "",
            repair_work_hours: 8,
            repair_username: "",
            repair_password: ""
        })
        setRepairHalls([])
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
                        "تعریف تعمیرکار جدید" : action === "edit" ?
                            `ویرایش اطلاعات ${infoItem ?
                                infoItem.repair_name : "نام تعمیرکار"} `
                            : "افزودن تعمیرکار جدید"}
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
                    <ToggleSwitch value={repairmanInfo.equip_status} handleChange={handleChange} name='repair_status' />

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
                        id='repair_name_modal'
                        name='repair_name'
                        value={repairmanInfo.repair_name}
                        handleChange={handleChange}
                        helperText={helperText.help_name}
                        lable='نام تعمیرکار:'
                        placeholder='نام تعمیرکار را وارد نمایید'
                        type='text'
                        key={10}
                    />
                    <Grid
                        container
                        item
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%"
                        }}
                    >
                        <Grid
                            item
                            size={6}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingLeft: { xs: "0.5rem", md: "1rem" }
                            }}
                        >
                            <Input3
                                id='repair_national_code_modal'
                                name='repair_national_code'
                                value={repairmanInfo.repair_national_code}
                                handleChange={handleChange}
                                helperText={helperText.help_national_code}
                                lable='کدملی تعمیرکار:'
                                placeholder='عدد ده رقمی'
                                type='text'
                                key={11}
                            />
                        </Grid>
                        <Grid
                            item
                            size={6}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingRight: { xs: "0.5rem", md: "1rem" }

                            }}
                        >
                            <Input3
                                id='repair_phone_number_modal'
                                name='repair_phone_number'
                                value={repairmanInfo.repair_phone_number}
                                handleChange={handleChange}
                                helperText={helperText.help_phone_number}
                                lable='شماره تماس:'
                                placeholder='**** *** **۰۹'
                                type='text'
                                key={12}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%"
                        }}
                    >
                        <Grid
                            item
                            size={8}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingLeft: { xs: "0.5rem", md: "1rem" }
                            }}
                        >
                            <Input3
                                id='repair_expertise_modal'
                                name='repair_expertise'
                                value={repairmanInfo.repair_expertise}
                                handleChange={handleChange}
                                helperText={helperText.help_expertise}
                                lable='تخصص تعمیرکار:'
                                placeholder='حرفه تعمیرکار را وارد نمایید'
                                type='text'
                                key={13}
                            />
                        </Grid>
                        <Grid
                            item
                            size={4}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingRight: { xs: "0.5rem", md: "1rem" }

                            }}
                        >
                            <Input3
                                id='repair_work_hours_modal'
                                name='repair_work_hours'
                                value={repairmanInfo.repair_work_hours}
                                handleChange={handleChange}
                                helperText={helperText.help_work_hours}
                                lable='ساعت کاری:'
                                placeholder='ساعت در روز'
                                type='number'
                                icon={faClock}
                                key={14}
                            />
                        </Grid>
                    </Grid>

                    <MultipleSelectCheckmarks
                        options={hallsInfo}
                        selectedValues={repairHalls}
                        onChange={setRepairHalls}
                        lable="انتخاب سالن:"
                        helperText={helperText.help_halls}

                    />

                    <Grid
                        container
                        item
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%"
                        }}
                    >
                        <Grid
                            item
                            size={6}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingLeft: { xs: "0.5rem", md: "1rem" }
                            }}
                        >
                            <Input3
                                id='repair_username_modal'
                                name='repair_username'
                                value={repairmanInfo.repair_username}
                                handleChange={handleChange}
                                helperText={helperText.help_username}
                                lable='نام کاربری:'
                                placeholder='حداقل ۵ کاراکتر'
                                type='text'
                                key={15}
                            />
                        </Grid>
                        <Grid
                            item
                            size={6}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                paddingRight: { xs: "0.5rem", md: "1rem" }

                            }}
                        >
                            <Input3
                                id='repair_password_modal'
                                name='repair_password'
                                value={repairmanInfo.repair_password}
                                handleChange={handleChange}
                                helperText={helperText.help_password}
                                lable='رمز عبور:'
                                placeholder='حداقل ۶ کاراکتر'
                                type='text'
                                key={16}
                            />
                        </Grid>
                    </Grid>

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

export default AddAndEditRepairman
