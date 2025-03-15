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

function AddAndEditRepairman({ action = "add", infoItem, toggleModal, tab, modal, handleToggleUpdate }) {
    const [hallsInfo, setHallsInfo] = useState([])
    const [expertiseInfo, setExpertiseInfo] = useState([])
    const [repairmanInfo, setRepairmanInfo] = useState({
        id: null,
        repair_status: true,
        repair_name: "",
        repair_national_code: "",
        repair_phone_number: "",
        repair_work_hours: 8,
        repair_username: "",
        repair_password: ""
    })
    const [itemRepairHalls, setItemRepairHalls] = useState(undefined)
    const [itemRepairExpertise, setItemRepairExpertise] = useState(undefined)
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

    // Handle change and validation
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "repair_name" && value === "") {
            setHelperText((prev) => ({
                ...prev,
                help_name: "این فیلد نمی‌تواند خالی باشد!"
            }));
        } else if (helperText.help_name !== "") {
            setHelperText((prev) => ({
                ...prev,
                help_name: ""
            }));
        }

        if (name === "repair_national_code" && !/^\d*$/.test(value)) {
            setHelperText((prev) => ({
                ...prev,
                help_national_code: "فقط عدد وارد کنید! "
            }));
            return
        } else if (name === "repair_national_code" && value.length > 10) {
            setHelperText((prev) => ({
                ...prev,
                help_national_code: "کدملی نمی‌تواند بیشتر از ده رقم باشد! "
            }));
            return
        } else if (name === "repair_national_code" && value === "") {
            setHelperText((prev) => ({
                ...prev,
                help_national_code: "این فیلد نمی‌تواند خالی باشد!"
            }));
        }
        else if (helperText.help_national_code !== "") {
            setHelperText((prev) => ({
                ...prev,
                help_national_code: ""
            }));
        }

        setRepairmanInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmitForm = async () => {


        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const full_name = repairmanInfo.repair_name.trim().split(/\s+/); // Trim and split by spaces

        const requestData = {
            first_name: full_name.length > 0 ? full_name[0] : null,
            last_name: full_name.length > 1 ? full_name.slice(1).join(" ") : null,
            national_code: repairmanInfo.repair_national_code,
            phone_number: repairmanInfo.repair_phone_number,
            salon: itemRepairHalls,
            status: repairmanInfo.repair_status,
            type: itemRepairExpertise,
            username: repairmanInfo.repair_username,
            password: repairmanInfo.repair_password,
            work_time: repairmanInfo.repair_work_hours
        }

        if (action === "add") {
            try {
                const response = await axios.post(`${apiUrl}/app/add-repairman/`,
                    requestData,
                    { headers });

                if (response.status === 201) {
                    successMessage("تعمیرکار جدید با موفقیت اضافه شد");
                    handleToggleUpdate();
                }
            } catch (error) {
                toggleModal()
                errorMessage("خطا در عملیات افزودن تعمیرکار");
            }
        } else if (action === "edit") {
            try {
                const response = await axios.put(`${apiUrl}/app/add-repairman/${repairmanInfo.id}`,
                    requestData,
                    { headers });

                if (response.status === 200) {
                    handleToggleUpdate()
                    successMessage("تعمیرکار با موفقیت ویرایش شد");
                }
            } catch (error) {
                toggleModal()
                errorMessage("خطا در عملیات ویرایش تعمیرکار");
            }
        }
    }


    useEffect(() => {
        if (tab === 1) {
            if (modal === true) {
                if (action === "edit") {
                    setRepairmanInfo({
                        id: infoItem.id,
                        repair_status: infoItem.status,
                        repair_name: `${infoItem.first_name} ${infoItem.last_name}`,
                        repair_national_code: infoItem.national_code,
                        repair_phone_number: infoItem.phone_number,
                        repair_work_hours: infoItem.work_time,
                        repair_username: infoItem.username,
                    })
                    setItemRepairHalls(infoItem.salon?.length > 0 ? infoItem.salon.map(hall => (hall.id)) : [])
                    setItemRepairExpertise(infoItem.type?.length > 0 ? infoItem.type.map(exp => (exp.id)) : [])

                } else if (action === "add") {
                    setRepairmanInfo({
                        repair_status: true,
                        repair_name: "",
                        repair_national_code: "",
                        repair_phone_number: "",
                        repair_work_hours: 8,
                        repair_username: "",
                        repair_password: ""
                    })
                    setItemRepairHalls([])
                    setItemRepairExpertise([])
                }
            } else {
                setRepairmanInfo({
                    id: null,
                    repair_status: true,
                    repair_name: "",
                    repair_national_code: "",
                    repair_phone_number: "",
                    repair_work_hours: 8,
                    repair_username: "",
                    repair_password: ""
                })
                setHelperText({
                    help_name: "",
                    help_national_code: "",
                    help_phone_number: "",
                    help_expertise: "",
                    help_work_hours: "",
                    help_halls: "",
                    help_username: "",
                    help_password: "",
                })
                setItemRepairHalls([])
                setItemRepairExpertise([])
            }
        }

    }, [action, infoItem, tab, modal])

    const fetchGetHalls = async () => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {

            const response = await axios.get(`${apiUrl}/app/get-user-type/`, {
                headers,
            });
            if (response.status === 200) {
                setHallsInfo(response.data.salons)
                setExpertiseInfo(response.data.user_type)
            }

        } catch (error) {
            errorMessage("خطا در برقراری ارتباط با سرور")
            setHallsInfo([])
            setExpertiseInfo([])
        }

    }
    useEffect(() => {
        fetchGetHalls();
    }, [])

    console.log(infoItem)
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
                                `${infoItem.first_name} ${infoItem.last_name}` : "نام تعمیرکار"} `
                            : "افزودن تعمیرکار جدید"}
                </Typography>
                <Box className={styles.delete_icon_modal} onClick={() => toggleModal()}>
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
                            <MultipleSelectCheckmarks
                                options={expertiseInfo?.map(exp => ({ value: exp.id, label: exp.type }))}
                                selectedValues={itemRepairExpertise}
                                onChange={setItemRepairExpertise}
                                lable="تخصص تعمیرکار:"
                                helperText={helperText.help_expertise}
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
                        options={hallsInfo?.map(hall => ({ value: hall.id, label: hall.name }))}
                        selectedValues={itemRepairHalls}
                        onChange={setItemRepairHalls}
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
                                placeholder={action === "edit" ? "رمز جدید وارد نمایید" : 'حداقل ۶ کاراکتر'}
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
                    onClick={() => handleSubmitForm()}
                />
            </Box>
        </Grid>
    )
}

export default AddAndEditRepairman
