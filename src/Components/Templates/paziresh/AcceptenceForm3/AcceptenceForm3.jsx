import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from "./AcceptenceForm3.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Other Components
import { errorMessage, successMessage, warningMessage, infoMessage } from '../../../Modules/Toast/ToastCustom';
import LoadingForm from '../../../Modules/Loading/LoadingForm';
import Modal from '../../../Modules/Modal/Modal';
import Button2 from '../../../Modules/Button2/Button2';
import DataInput from '../../../Modules/DataInput/DataInput';
import SelectDropDown from '../../../Modules/SelectDropDown/SelectDropDown';

//Mui Components
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

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
    faPenToSquare,
    faCheck,
    faUserTie,
    faFileImage,
    faFileAudio,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';


function AcceptenceForm3({
    nextTab,
    prevTab,
    setContent,
    customer
}) {
    //Pictures and Voice file
    const [isRecordingExpert, setIsRecordingExpert] = useState(false);
    const [isRecordingCustomer, setIsRecordingCustomer] = useState(false);
    const expertMediaRecorder = useRef(null);
    const expertMediaStream = useRef(null);
    const expertChunks = useRef([]);
    const customerMediaRecorder = useRef(null);
    const customerMediaStream = useRef(null);
    const customerChunks = useRef([]);
    const [statementData, setStatementData] = useState({
        expert_statements_text: '',
        expert_images: [],
        expert_statements_voice: null,
        customer_statements_text: '',
        customer_images: [],
        customer_statements_voice: null
    });

    //Customer and Experts statement items
    const [customerStatementItems, setCustomerStatementItems] = useState([])
    const [expertStatementItems, setExpertStatementItems] = useState([])

    //Loading consts
    const [loading, setLoading] = useState({ page: false, finalForm: false })

    //Main data consts
    const [dateValue, setDateValue] = useState("")

    //Error consts
    const [errors, setErrors] = useState({
        customer_statements_text: 'وارد نمودن اظهارات مشتری الزامی است!',
        expert_statements_text: 'وارد نمودن کارشناس مشتری الزامی است!',
        estimated_repair_time: "تعیین تخمین زمان تعمیر الزامیست!"
    });

    const [expertFileModal, setExpertFileModal] = useState(false)

    //set functions
    const handleToggleModal = () => {
        setExpertFileModal((modal) => !modal)
    }

    //Handle click on buttons function
    //Confirm button to submit finall form
    const handleSubmitForm = async () => { }
    const hadleClickOnGoesBack = () => {
        prevTab()

    }
    const handleClickOnSendToExperts = () => {

    }
    const handleCliclOnRepairmanSchedule = () => {

    }

    //Handle start and stop voice recording
    const startRecordingExpert = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            expertMediaStream.current = stream;
            expertMediaRecorder.current = new MediaRecorder(stream);

            expertMediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) expertChunks.current.push(e.data);
            };

            expertMediaRecorder.current.onstop = () => {
                const blob = new Blob(expertChunks.current, { type: 'audio/webm' });
                setStatementData((prevState) => ({
                    ...prevState,
                    expert_statements_voice: blob
                }));
                expertChunks.current = [];
            };

            expertMediaRecorder.current.start();
            setIsRecordingExpert(true);
        } catch (err) {
            errorMessage("خطا در دسترسی میکروفون برای کارشناس!")
        }
    };

    const stopRecordingExpert = () => {
        if (expertMediaRecorder.current && expertMediaRecorder.current.state === 'recording') {
            expertMediaRecorder.current.stop();
        }
        if (expertMediaStream.current) {
            expertMediaStream.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecordingExpert(false);
    };

    const startRecordingCustomer = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            customerMediaStream.current = stream;
            customerMediaRecorder.current = new MediaRecorder(stream);

            customerMediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) customerChunks.current.push(e.data);
            };

            customerMediaRecorder.current.onstop = () => {
                const blob = new Blob(customerChunks.current, { type: 'audio/webm' });
                setStatementData((prevState) => ({
                    ...prevState,
                    customer_statements_voice: blob
                }));
                customerChunks.current = [];
            };

            customerMediaRecorder.current.start();
            setIsRecordingCustomer(true);
        } catch (err) {
            errorMessage("خطا در دسترسی میکروفون برای مشتری!")
        }
    };

    const stopRecordingCustomer = () => {
        if (customerMediaRecorder.current && customerMediaRecorder.current.state === 'recording') {
            customerMediaRecorder.current.stop();
        }
        if (customerMediaStream.current) {
            customerMediaStream.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecordingCustomer(false);
    };

    const fetchStatemenmtsItems = async () => {
        try {
            let access = window.localStorage.getItem("access")
            const headers = {
                Authorization: `Bearer ${access}`
            };

            const response = await axios.get(`${apiUrl}/app/`, {
                headers,
            });
            if (response.status === 200) {
                setCustomerStatementItems(response.data)
                setExpertStatementItems(response.data)
            }
        } catch (error) {
            errorMessage("خطا در برقراری ارتباط با سرور")
            setCustomerStatementItems([])
            setExpertStatementItems([])
        }

    }


    useEffect(() => {
        setContent("اظهارات مشتری:")
        // fetchStatemenmtsItems()
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
                        gap: { xs: "1.2rem", sm: "0.9rem", md: "1.2 rem" },
                        width: "100%"

                    }}
                    noValidate
                    autoComplete="off"
                >

                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            width: "100%",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: "0.5rem", lg: "0" }
                        }}>

                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            display: "flex",
                            flexDirection: { xs: "column", lg: "row" },
                            alignItems: { xs: "flex-end", sm: 'flex-start' },
                            justifyContent: { xs: "center", lg: 'flex-start' },
                            width: "100%",
                            gap: { xs: ".5rem" }
                        }}>
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    width: '100%',
                                }}
                                size={{ xs: 12, sm: 11, md: 10, lg: 7 }}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"اظهارات مشتری"}
                                    items={customerStatementItems}
                                    name="customerStatemants"
                                    placeHolder={"اظهارات مشتری را انتخاب یا وارد کنید."}
                                    isDesirableValue={true}
                                    key={724}
                                // setother={setotherCar}
                                // value={form2?.customer_secend_form?.material}
                                // onChange={handleSelectChange}
                                // material={dataForm?.customer_form_two?.material}
                                />
                                {errors.customer_statements_text && (
                                    <Typography
                                        className={styles.error_subtitle_form3}
                                        sx={{ marginTop: { xs: "4px" } }}
                                    >
                                        {errors.customer_statements_text}
                                    </Typography>)
                                }
                            </Grid>
                            <UploaderButton
                                key={711}
                                bottonText='بارگذاری فایل'
                                imageCount={statementData.customer_images.length}
                                voiceCount={statementData.customer_statements_voice ? 1 : 0}
                            />

                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6 }} sx={{
                                display: "flex",
                                flexDirection: { xs: "column", lg: "row" },
                                alignItems: { xs: "flex-end", sm: "flex-start" },
                                justifyContent: { xs: "center", lg: 'flex-start' },
                                width: "100%",
                                gap: { xs: ".5rem", lg: "0" }

                            }}>
                            <Grid
                                size={{ xs: 12, sm: 11, md: 10, lg: 7 }}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    width: '100%'

                                }} >
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"اظهارات کارشناس:"}
                                    items={expertStatementItems}
                                    name="expertStatemants"
                                    placeHolder={"اظهار کارشناس را انتخاب کنید."}
                                    isDesirableValue={false}
                                // setother={setotherCar}
                                // value={form2?.customer_secend_form?.material}
                                // onChange={handleSelectChange}
                                // material={dataForm?.customer_form_two?.material}
                                />
                                {errors.expert_statements_text && (
                                    <Typography
                                        className={styles.error_subtitle_form3}
                                        sx={{ marginTop: { xs: "4px" } }}
                                    >
                                        {errors.expert_statements_text}
                                    </Typography>)
                                }
                            </Grid>
                            <UploaderButton
                                key={712}
                                bottonText='بارگذاری فایل'
                                imageCount={statementData.expert_images.length}
                                voiceCount={statementData.expert_statements_voice ? 1 : 0}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", md: "flex-start" },
                            alignItems: "flex-start",
                            width: "100%",
                            flexDirection: { xs: "column", md: "row" }
                        }}
                    >
                        <PayRowComponent />
                    </Grid>
                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: { xs: "flex-start", sm: "center" },
                            width: "100%",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: "0.5rem" }
                        }}>
                        <Grid
                            size={{ xs: 12, sm: 5, md: 4, lg: 3, xxl: 2 }}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                width: "100%",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                className={styles.label_input_form3}
                                sx={{ marginBottom: { xs: "5px" } }}
                            >
                                {"تخمین زمان تعمیرکار:"}
                            </Typography>
                            <DataInput value={dateValue} onChange={setDateValue} placeHolder="تخمین زمان تعمیر را انتخاب نمایید!" />
                            {errors.estimated_repair_time && (
                                <Typography
                                    className={styles.error_subtitle_form3}
                                    sx={{ marginTop: { xs: "4px" } }}
                                >
                                    {errors.estimated_repair_time}
                                </Typography>)
                            }
                        </Grid>
                        <Button2
                            key={814}
                            type='button'
                            variant='contained'
                            onClick={handleCliclOnRepairmanSchedule}
                        >{"برنامه‌ریزی تعمیرکار"}</Button2>
                    </Grid>
                    <Grid
                        size={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: "0.5rem", sm: "0" }
                        }}>
                        <Grid
                            order={{ xs: 1, sm: 2 }}
                            size={{ xs: 12, sm: 6, md: 2, xxl: 3 }}
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "center", sm: "flex-start" },
                                alignItems: "center",
                                gap: { xs: "1rem", sm: ".5rem" }
                            }}
                        >
                            <Button2
                                key={812}
                                type='button'
                                variant="outlined"
                                icon={faPen}
                                onClick={hadleClickOnGoesBack}
                                style={"outline_btn"}
                            >
                                {"قبل"}
                            </Button2>
                            <Button2
                                key={811}
                                type='button'
                                variant="contained"
                                icon={loading.finalForm ? "" : faCheck}
                                onClick={handleSubmitForm}
                                disable={loading.finalForm}
                                style={"add_btn"}
                            >
                                {loading.finalForm ? <CircularProgress size={"25.2px"} color="success" /> : "تایید"}
                            </Button2>
                        </Grid>
                        <Grid
                            order={{ xs: 2, sm: 1 }}
                            size={{ xs: 12, sm: 6, md: 5, lg: 7, xl: 8, xxl: 9 }}
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "center", sm: "flex-end" },
                                alignItems: "center",
                                paddingLeft: { xs: "0", sm: ".5rem" }
                            }}
                        >
                            <Button2
                                key={813}
                                type='button'
                                variant="contained"
                                icon={faUserTie}
                                style={"add_btn"}
                                onClick={handleClickOnSendToExperts}
                            >{"ارجاع به کارشناس"}</Button2>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
            {loading.page && <LoadingForm />}

        </Grid>
    )
}

const PayRowComponent = ({
    disable = false,
    payCounter = 1,
    payItems = [],
    payValue,
    paySet,
    payError = 'خطا',
    priceItems = [],
    priceValue,
    priceSet,
    priceError = 'خطا',
    repairManItems = [],
    repairManValue,
    repairManSet,
    repairManError = 'خطا'
}) => {
    return (
        <Grid
            size={12}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                width: "100%"
            }}
            className={styles.payComponent}
        >
            <Grid
                size={{ xs: 12, sm: 8, md: 4 }}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: { xs: "0 5px" }
                }}>
                <SelectDropDown
                    icon={faAngleDown}
                    label={"اجرت:"}
                    items={payItems}
                    name="pay"
                    disable={disable}
                    placeHolder={"اجرت مدنظر را انتخاب نمایید!"}
                    onChange={paySet}
                    value={payValue}
                    // setother={setotherCar}
                    key={721}
                />
                {payError && (
                    <Typography
                        className={styles.error_subtitle_form3}
                        sx={{ marginTop: { xs: "4px" } }}
                    >
                        {payError}
                    </Typography>)
                }
            </Grid>
            <Grid
                size={{ xs: 12, sm: 8, md: 4 }}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: { xs: "0 5px" }
                }}>
                <SelectDropDown
                    icon={faAngleDown}
                    label={"قیمت:"}
                    items={priceItems}
                    name="price"
                    disable={disable}
                    placeHolder={"قیمت مورد را انتخاب یا وارد کنید!"}
                    onChange={priceSet}
                    value={priceValue}
                    // setother={setotherCar}
                    key={722}
                />
                {priceError && (
                    <Typography
                        className={styles.error_subtitle_form3}
                        sx={{ marginTop: { xs: "4px" } }}
                    >
                        {priceError}
                    </Typography>)
                }
            </Grid>
            <Grid
                size={{ xs: 12, sm: 8, md: 4 }}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: { xs: "0 5px" }
                }}>
                <SelectDropDown
                    icon={faAngleDown}
                    label={"تعمیرکار:"}
                    items={repairManItems}
                    name="repairman"
                    disable={disable}
                    placeHolder={"تعمیرکار مدنظر را انتخاب کنید!"}
                    onChange={repairManSet}
                    value={repairManValue}
                    // setother={setotherCar}
                    key={723}
                />
                {repairManError && (
                    <Typography
                        className={styles.error_subtitle_form3}
                        sx={{ marginTop: { xs: "4px" } }}
                    >
                        {repairManError}
                    </Typography>)
                }
            </Grid>
        </Grid >)
}

const UploaderButton = ({ bottonText = "بارگذاری فایل", imageCount = 1, voiceCount = 1, onClick }) => {
    return <Box onClick={onClick} className={styles.upladerButton} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: ".5rem"
    }}>
        <Typography className={styles.uploadText}>{bottonText}</Typography>
        <Typography className={styles.uploadIcon}>
            {`(${voiceCount}) `}
            <FontAwesomeIcon icon={faFileAudio} />
        </Typography >
        <Typography className={styles.uploadIcon}>
            {`(${imageCount}) `}
            <FontAwesomeIcon icon={faFileImage} />
        </Typography>
    </Box>
}

export default AcceptenceForm3
