import { useEffect, useRef, useState } from 'react';
import './pform3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faFile,
    faMicrophoneSlash,
    faFileLines, faXmark,
    faImage,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Modules/Input/Input';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EditBtn from '../../../Modules/EditBtn/EditBtn';
import ConfirmBtn from '../../../Modules/ConfirmBtn/ConfirmBtn';
import TableForm from '../../../Modules/Table/TableForm';
import { useFormik } from 'formik';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Modal from '../../../Modules/Modal/Modal';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useContext } from 'react'
import { MyContext } from '../../../../context/context'
import { toFarsiNumber } from '../../../../utils/utils';

const CustomTab = styled(Tab)({
    fontSize: 'inherit',
    fontFamily: 'inherit',
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Pform3({ nextTab, prevTab, setContent, coustomer }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [value, setValue] = useState(0);
    const [isRecordingExpert, setIsRecordingExpert] = useState(false);
    const [isRecordingCustomer, setIsRecordingCustomer] = useState(false);
    const expertMediaRecorder = useRef(null);
    const expertMediaStream = useRef(null);
    const expertChunks = useRef([]);
    const customerMediaRecorder = useRef(null);
    const customerMediaStream = useRef(null);
    const customerChunks = useRef([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedStatement, setSelectedStatement] = useState(null);
    const [loading, setLoading] = useState(false)
    const columns = ['توضیحات مشتری', 'توضیحات کارشناس', 'تخمین قیمت', 'تخمین زمان تعمیر'];
    const { dataForm, idForm, editMode } = useContext(MyContext)


    const [statementData, setStatementData] = useState({
        customerText: '',
        customerAudio: null,
        customerFile: null,
        expertText: '',
        expertFile: null,
        expertAudio: null,
        estimatedPrice: '',
        estimatedTime: ''
    });

    const formik = useFormik({
        initialValues: {
            form_id: coustomer,
            form: []
        },

        onSubmit: async (values) => {
            console.log(values)
            try {
                setLoading(true)
                const response = await axios.post(`${apiUrl}/app/fill-customer-third-form/`, values);
                if (response.status === 201 || response.status === 200) {
                    console.log('Form submitted successfully:', response.data);
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setLoading(false)
            }
        },
    });

    const hasAttachments = formik.values.form.some(
        item => item?.customerAudio || item?.customerFile || item?.expertFile || item?.expertAudio
    );

    if (hasAttachments) {
        columns.push("پیوست ها");
    }

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
                    expertAudio: blob
                }));
                expertChunks.current = [];
            };

            expertMediaRecorder.current.start();
            setIsRecordingExpert(true);
        } catch (err) {
            console.error('Error accessing microphone for expert:', err);
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
                    customerAudio: blob
                }));
                customerChunks.current = [];
            };

            customerMediaRecorder.current.start();
            setIsRecordingCustomer(true);
        } catch (err) {
            console.error('Error accessing microphone for customer:', err);
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

    const handleCustomerTextChange = (e) => {
        setStatementData((prevState) => ({
            ...prevState,
            customerText: e.target.value
        }));
    };

    const handleExpertTextChange = (e) => {
        setStatementData((prevState) => ({
            ...prevState,
            expertText: e.target.value
        }));
    };

    const handleCustomerFileChange = (e) => {
        const file = e.target.files[0];
        setStatementData((prevState) => ({
            ...prevState,
            customerFile: file
        }));
    };

    const handleExpertFileChange = (e) => {
        const file = e.target.files[0];
        setStatementData((prevState) => ({
            ...prevState,
            expertFile: file
        }));
    };

    const handleEstimatedPriceChange = (e) => {
        const value = e.target.value
        setStatementData((prevState) => ({
            ...prevState,
            estimatedPrice: value
        }));

    };

    const handleEstimatedTimeChange = (e) => {
        const value = e.target.value;
        formik.setFieldValue('estimatedTime', value);
        setStatementData((prevState) => ({
            ...prevState,
            estimatedTime: value
        }));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const addStatement = async (e) => {
        e.preventDefault();
        const {
            customerText,
            customerAudio,
            customerFile,
            expertText,
            expertFile,
            expertAudio,
            estimatedPrice,
            estimatedTime
        } = statementData;

        if (
            !customerText &&
            !customerAudio &&
            !customerFile &&
            !expertText &&
            !expertFile &&
            !expertAudio &&
            !estimatedPrice &&
            !estimatedTime
        ) {
            return;
        }

        const newStatement = {
            customerText: customerText || '',
            customerAudio: customerAudio ? await convertToBase64(customerAudio) : null,
            customerFile: customerFile ? await convertToBase64(customerFile) : null,
            expertText: expertText || '',
            expertFile: expertFile ? await convertToBase64(expertFile) : null,
            expertAudio: expertAudio ? await convertToBase64(expertAudio) : null,
            estimatedPrice: estimatedPrice || '',
            estimatedTime: estimatedTime || ''
        };
        formik.setFieldValue("form", [...formik.values.form, newStatement]);

        setStatementData({
            customerText: '',
            customerAudio: null,
            customerFile: null,
            expertText: '',
            expertFile: null,
            expertAudio: null,
            estimatedPrice: '',
            estimatedTime: ''
        });
    };


    const handleChangetab = (event, newValue) => {
        setValue(newValue);
    };


    const handleShowModal = (statement) => {
        setSelectedStatement(statement);
        setShowModal(true);
    };

    const handleDeleteStatement = (indexToDelete) => {
        const updatedform = formik.values.form.filter((_, index) => index !== indexToDelete);
        formik.setFieldValue('form', updatedform);
    };


    const handleImageChangeCoustomer = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64File = await convertToBase64(file)
        const updatedForm = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, customerFile: base64File }
                : statement
        );
        formik.setFieldValue('form', updatedForm);
        setSelectedStatement({ ...selectedStatement, customerFile: base64File });
    };

    const handleImageChangeExpert = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64File = await convertToBase64(file)
        const updatedform = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, expertFile: base64File }
                : statement
        );

        formik.setFieldValue('form', updatedform);
        setSelectedStatement({ ...selectedStatement, expertFile: base64File });
    };

    const handleDeleteImageCoustomer = () => {
        const updatedform = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, customerFile: null }
                : statement
        );

        formik.setFieldValue('form', updatedform);
        setSelectedStatement({ ...selectedStatement, customerFile: null });
    };


    const handleDeleteAudioCoustomer = () => {
        const updatedform = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, customerAudio: null }
                : statement
        );

        formik.setFieldValue('form', updatedform);
        setSelectedStatement({ ...selectedStatement, customerAudio: null });
    };


    const handleDeleteImageExpert = () => {
        const updatedform = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, expertFile: null }
                : statement
        );

        formik.setFieldValue('form', updatedform);
        setSelectedStatement({ ...selectedStatement, expertFile: null });
    };


    const handleDeleteAudioExpert = () => {
        const updatedform = formik.values.form.map((statement) =>
            statement === selectedStatement
                ? { ...statement, expertAudio: null }
                : statement
        );

        formik.setFieldValue('form', updatedform);
        setSelectedStatement({ ...selectedStatement, expertAudio: null });
    };

    const isBase64 = (str) => {

        const base64Regex = /^data:image\/[^;]+;base64,|^data:audio\/webm;base64,/;
        return base64Regex.test(str);
    };

    useEffect(() => {
        setContent("اظهارات مشتری :")
    }, [])


    // console.log(formik.values)


    return (
        <>
            <Modal
                style={"widthstyle"}
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChangetab} aria-label="simple tabs example">
                        <CustomTab label="مشتری" {...a11yProps(0)} />
                        <CustomTab label="کارشناس" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} key={0}>
                        <div className='wrap-image-modal'>
                            <div className='image-modal-content'>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className='delete-img-modal'
                                    onClick={handleDeleteImageCoustomer}
                                />
                                {selectedStatement?.customerFile ? (
                                    <img
                                        src={
                                            isBase64(selectedStatement.customerFile)
                                                ? selectedStatement.customerFile
                                                : `${apiUrl}${selectedStatement.customerFile}`
                                        }
                                        alt="Customer statement"
                                        className='img-statmentmodal'
                                    />
                                ) : (
                                    <div className='modal-empty-image'>
                                        <FontAwesomeIcon icon={faImage} className='empty-icon-image' />
                                    </div>
                                )}
                            </div>

                            <label htmlFor="filechnage" className='btn-chnage-img-modal mt-4'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChangeCoustomer}
                                    className='mt-3 d-none'
                                    id='filechnage'
                                />
                                ویرایش
                                <FontAwesomeIcon icon={faPen} className='mx-2' />
                            </label>

                            {selectedStatement?.customerAudio && (
                                <div className='d-flex mt-4 align-items-center'>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={handleDeleteAudioCoustomer}
                                        className='trash-audio-modal'
                                    />
                                    <audio controls>
                                        <source
                                            type="audio/webm"
                                            src={
                                                isBase64(selectedStatement.customerAudio)
                                                    ? selectedStatement.customerAudio
                                                    : `${apiUrl}${selectedStatement.customerAudio}`
                                            }
                                        />
                                        مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                    
                    <TabPanel value={value} index={1} key={1} >
                        <div className='wrap-image-modal'>
                            <div className='image-modal-content'>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className='delete-img-modal'
                                    onClick={handleDeleteImageExpert}
                                />
                                {selectedStatement?.expertFile ? (
                                    <img
                                        src={
                                            isBase64(selectedStatement.expertFile)
                                                ? selectedStatement.expertFile
                                                : `${apiUrl}${selectedStatement.expertFile}`
                                        }
                                        alt="Customer statement"
                                        className='img-statmentmodal'
                                    />
                                ) : (
                                    <div className='modal-empty-image'>
                                        <FontAwesomeIcon icon={faImage} className='empty-icon-image' />
                                    </div>
                                )}
                            </div>
                            <label htmlFor="filechnage" className='btn-chnage-img-modal mt-4'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChangeExpert}
                                    className='mt-3 d-none'
                                    id='filechnage'
                                />
                                ویرایش
                                <FontAwesomeIcon icon={faPen} className='mx-2' />
                            </label>

                            {selectedStatement?.expertAudio && (
                                <div className='d-flex mt-4 align-items-center'>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={handleDeleteAudioExpert}
                                        className='trash-audio-modal'
                                    />
                                    <audio controls>
                                        <source
                                            type="audio/webm"
                                            src={
                                                isBase64(selectedStatement.expertAudio)
                                                    ? selectedStatement.expertAudio
                                                    : `${apiUrl}${selectedStatement.expertAudio}`
                                            }
                                        />
                                        مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Box>
            </Modal>
            <div className="pform3-container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-form3-content">
                        <div className="statements-container">
                            <div className="statements-right">
                                <div className="statements-customer">
                                    <span className="statements-title">اظهارات مشتری</span>
                                    <div className="statements-content">
                                        <textarea
                                            className="statements-text"
                                            placeholder="اظهارات مشتری"
                                            value={statementData.customerText}
                                            onChange={handleCustomerTextChange}
                                        ></textarea>
                                        <div className="statements-media">
                                            <div className="media-statements media-voice">
                                                {isRecordingCustomer ? (
                                                    <FontAwesomeIcon icon={faMicrophoneSlash} onClick={stopRecordingCustomer} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faMicrophone} onClick={startRecordingCustomer} />
                                                )}
                                            </div>
                                            <label htmlFor="file_customer" className="media-statements media-file">
                                                <input
                                                    type="file"
                                                    id="file_customer"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={handleCustomerFileChange}
                                                />
                                                {
                                                    statementData.customerFile ?
                                                        <FontAwesomeIcon icon={faFileLines} />
                                                        :
                                                        <FontAwesomeIcon icon={faFile} />
                                                }

                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {statementData.customerAudio && (
                                    <audio controls className='mt-4'>
                                        <source src={URL.createObjectURL(statementData.customerAudio)} type="audio/webm" />
                                        مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                    </audio>
                                )}
                            </div>

                            <div className="statements-left">
                                <div className="statements-export">
                                    <span className="statements-title">اظهارات کارشناس</span>
                                    <div className="statements-content">
                                        <textarea
                                            className="statements-text"
                                            placeholder="اظهارات کارشناس"
                                            value={statementData.expertText}
                                            onChange={handleExpertTextChange}
                                        ></textarea>
                                        <div className="statements-media">
                                            <div className="media-statements media-voice">
                                                {isRecordingExpert ? (
                                                    <FontAwesomeIcon icon={faMicrophoneSlash} onClick={stopRecordingExpert} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faMicrophone} onClick={startRecordingExpert} />
                                                )}
                                            </div>
                                            <label htmlFor="file_statment" className="media-statements media-file">
                                                <input
                                                    type="file"
                                                    id="file_statment"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={handleExpertFileChange}
                                                />
                                                {
                                                    statementData.expertFile ?
                                                        <FontAwesomeIcon icon={faFileLines} />
                                                        :
                                                        <FontAwesomeIcon icon={faFile} />
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {statementData.expertAudio && (
                                    <audio controls className='mt-4'>
                                        <source src={URL.createObjectURL(statementData.expertAudio)} type="audio/webm" />
                                        مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
                                    </audio>
                                )}
                            </div>
                        </div>
                        <div className="estimate-wrapper mt-4">
                            <div className="estimate-item">
                                <div className="estimate-input">
                                    <div className={`input-container`}>
                                        <label htmlFor={"تخمین قیمت"} className='label-input mb-2'>تخمین قیمت</label>
                                        <div className="input-content-wrapper">
                                            <input
                                                id={"تخمین قیمت"}
                                                name={"تخمین قیمت"}
                                                type={"text"}
                                                placeholder={"تخمین قیمت"}
                                                value={toFarsiNumber(statementData.estimatedPrice)}
                                                onChange={handleEstimatedPriceChange}
                                                className='input-form'
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 mt-sm-0 estimate-item">
                                <div className="estimate-input">
                                    <label htmlFor="estimated-time">تخمین زمان تعمیر</label>
                                    <Input
                                        type="datetime-local"
                                        id="estimated-time"
                                        name="تخمین زمان تعمیر"
                                        value={statementData.estimatedTime}
                                        onChange={handleEstimatedTimeChange}
                                        placeholder="تخمین زمان تعمیر"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pform3-container-table mt-5" dir="rtl">
                            <button className="add-estimate-btn mb-3" onClick={addStatement}>
                                افزودن شرح اظهار
                                <FontAwesomeIcon icon={faPlus} className="plus-btn-2" />
                            </button>
                            {
                                formik.values.form.length ?
                                    <TableForm columns={columns}>
                                        {formik.values.form?.map((item, rowIndex) => (
                                            <TableRow
                                                key={rowIndex}
                                                sx={{ border: '1px solid #ddd', fontFamily: "iranYekan" }}
                                                className='statment-row-table'
                                            >
                                                <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                    {item.customerText}
                                                </TableCell>
                                                <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                    {item.expertText}
                                                </TableCell>
                                                <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                    {item.estimatedPrice}
                                                </TableCell>
                                                <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                    {item.estimatedTime}
                                                </TableCell>
                                                {
                                                    (item?.customerAudio || item?.customerFile || item?.expertFile || item?.expertAudio) ?
                                                        <TableCell
                                                            sx={{
                                                                borderRight: '1px solid #ddd',
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                            <label className="media-statements  mx-1" onClick={() => handleShowModal(item)}>
                                                                <FontAwesomeIcon icon={faFileLines} />
                                                            </label>
                                                        </TableCell>
                                                        : null
                                                }
                                                <div className='wrap-trash-table'>
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        onClick={() => handleDeleteStatement(rowIndex)}
                                                        className='trash-row-table'
                                                    />
                                                </div>
                                            </TableRow>
                                        ))}
                                    </TableForm> :
                                    null
                            }
                        </div>
                        <div className="p-form-actions pt-3">
                            <EditBtn onClick={prevTab} isSubmitting={loading} />
                            <ConfirmBtn type="submit" />
                        </div>
                    </div>
                </form >
            </div >
        </>

    );
}
