import React, { useEffect, useState } from 'react'
import './TypeActivity.css'
import { Col } from 'react-bootstrap'
import Input from '../../../Components/Modules/Input/Input'
import Button1 from '../../../Components/Modules/Button1/Button1'
import InputUpload from '../../../Components/Modules/InputUpload/InputUpload'
import { faPhone, faUser, faAddressCard, faPlus, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputRadio from '../../../Components/Modules/InputRadio/InputRadio'
import Input2 from '../../../Components/Modules/input2/Input2'
import { Formik } from 'formik'
import axios from 'axios'
import { IP } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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


export default function TypeActivity() {

    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const [isPermition, setIsPermition] = useState("")

    const [dataFormCompany, setDataFormCompany] = useState({
        applicants_position_in_company: "",
        signed_right: "",
        company_national_id: "",
        phone_number: "",
        address: "",
        postal_code: "",
        company_statute_image: "",
        last_ad_changes_image: "",
        company_image: ""
    })

    const [addSignature, setAddSignature] = useState([
        {
            full_name: "",
            position_incompany: "",
            national_code: "",
            phone_number: ""
        }
    ]);

    const [firstSignature, setFirstSignature] = useState([
        {
            owner_first_signature: "",
            national_code: ""
        }
    ])

    const dataFormCompanyChange = (e) => {
        const { name, value } = e.target;
        setDataFormCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleFileChange = (name, file) => {
        setDataFormCompany(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const handlerAddinputssignatureFalse = () => {
        setAddSignature([...addSignature, {
            full_name: "",
            position_incompany: "",
            national_code: "",
            phone_number: "",
        }]);
    }
    const handlerAddinputssignatureTrue = () => {
        setFirstSignature([...firstSignature, {
            owner_first_signature: "",
            national_code: ""
        }]);
    }


    const addSignatureChange = (e, index) => {
        const { name, value } = e.target;
        const newInputs = [...addSignature];
        newInputs[index][name] = value;
        setAddSignature(newInputs);
    }


    const handleFirstSignatureChange = (e, index) => {
        const { name, value } = e.target;
        const newInputs = [...firstSignature];
        newInputs[index][name] = value;
        setFirstSignature(newInputs);
    }

    const sendDataHandler = (e) => {
        e.preventDefault();
        let updatedDataFormCompany;
        if (isPermition) {
            updatedDataFormCompany = { ...dataFormCompany, firstSignature };
            delete updatedDataFormCompany.addSignature;
        } else {
            updatedDataFormCompany = { ...dataFormCompany, addSignature };
            delete updatedDataFormCompany.firstSignature;
        }
        setDataFormCompany(updatedDataFormCompany);
        console.log(dataFormCompany)
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="signup-page">
            <div className="back-wrapper">
                <Col xs={12} lg={7} xl={8} className='empty-space-login'></Col>
                <Col xs={12} lg={5} xl={4} className='background-signUp activity-back'></Col>
            </div>
            <div className="form-container">
                <div className="form-hold">
                    <p className="Signin-title p-signin">نوع فعالیت</p>
                    <div className="form-wrapper p-signin">
                        <Box sx={{ width: '100%' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <CustomTab label="شخصی" {...a11yProps(0)} />
                                <CustomTab label="شرکتی" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Formik
                                    validate={(values) => {
                                        const errors = {}
                                        if (values.first_name === "") {
                                            errors.first_name = "وارد کردن نام اجباری میباشد";
                                        } else if (values.first_name.length < 4) {
                                            errors.first_name = "نام حداقل باید 4 کاراکتر باشد";
                                        }
                                        if (values.last_name === "") {
                                            errors.last_name = "وارد کردن نام خانوادگی اجباری میباشد";
                                        } else if (values.last_name.length < 4) {
                                            errors.last_name = "نام خانوادگی حداقل باید 4 کاراکتر باشد";
                                        }

                                        if (values.national_code === "") {
                                            errors.national_code = "وارد کردن کدملی اجباری میباشد";
                                        } else if (!/^\d{10}$/.test(values.national_code)) {
                                            errors.national_code = "کدملی وارد شده معتبر نیست";
                                        }

                                        if (values.applicant_phone_number === "") {
                                            errors.applicant_phone_number = "وارد کردن شماره اجباری میباشد";
                                        } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.applicant_phone_number)) {
                                            errors.applicant_phone_number = "شماره وارد شده معتبر نیست";
                                        }
                                        if (values.address === "") {
                                            errors.address = "وارد کردن آدرس اجباری میباشد";
                                        }
                                        if (values.postal_code === "") {
                                            errors.postal_code = "وارد کردن پستی اجباری میباشد";
                                        } else if (!/^\d{10}$/.test(values.postal_code)) {
                                            errors.postal_code = "کدپستی وارد شده معتبر نیست";
                                        }
                                        if (values.work_place_number === "") {
                                            errors.work_place_number = "وارد کردن شماره اجباری میباشد";
                                        } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.work_place_number)) {
                                            errors.work_place_number = "شماره وارد شده معتبر نیست";
                                        }
                                        if (values.business_license_image === "") {
                                            errors.business_license_image = "تصویر جواز کسب را قرار دهید";
                                        }
                                        if (values.national_card_image === "") {
                                            errors.national_card_image = "تصویر کارت ملی را قرار دهید";
                                        }
                                        return errors
                                    }}
                                    initialValues={{
                                        personal: "Personal",
                                        first_name: "",
                                        last_name: "",
                                        national_code: "",
                                        applicant_phone_number: "",
                                        address: "",
                                        postal_code: "",
                                        work_place_number: "",
                                        business_license_image: "",
                                        national_card_image: ""
                                    }}

                                    onSubmit={async (values, { setSubmitting }) => {
                                        const access = localStorage.getItem("access")
                                        const headers = {
                                            Authorization: `Bearer ${access}`
                                        };
                                        try {
                                            const response = await axios.post(`${IP}/user/continuation-signup/`, values, {
                                                headers
                                            })
                                            if (response.status === 201) {
                                                setSubmitting(false)
                                                console.log(response.data)
                                                navigate("/")
                                            }
                                        } catch (error) {
                                            console.log(error)
                                            if (error.response.status === 401) {
                                                localStorage.removeItem('access')
                                                localStorage.removeItem('refresh')
                                                window.location.href = "/login"
                                            }
                                            toast.error(error.response.data.message, {
                                                position: "top-left"
                                            })
                                            setSubmitting(false);
                                        }
                                    }}
                                >

                                    {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-content activityheight">
                                                <div className="form-signin" >
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label={"نام"}
                                                                icon={faUser}
                                                                placeholder="نام"
                                                                type="text"
                                                                name={"first_name"}
                                                                onChange={handleChange}
                                                                value={values.first_name}
                                                            />
                                                            {errors.first_name && touched.first_name && <span className='error'>{errors.first_name}</span>}
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="نام خانوادگی"
                                                                icon={faUser}
                                                                placeholder="نام خانوادگی صاحب فعالیت"
                                                                type="text"
                                                                name={"last_name"}
                                                                value={values.last_name}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.last_name && touched.last_name && <span className='error'>{errors.last_name}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="کد ملی"
                                                                icon={faAddressCard}
                                                                placeholder=" کد ملی صاحب فعالیت"
                                                                type="text"
                                                                name={"national_code"}
                                                                onChange={handleChange}
                                                                value={values.national_code}
                                                            />
                                                            {errors.national_code && touched.national_code && <span className='error'>{errors.national_code}</span>}
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="شماره تماس متقاضی"
                                                                icon={faPhone}
                                                                placeholder="شماره تماس متقاضی"
                                                                type="text"
                                                                name={"applicant_phone_number"}
                                                                onChange={handleChange}
                                                                value={values.applicant_phone_number}
                                                            />
                                                            {errors.applicant_phone_number && touched.applicant_phone_number && <span className='error'>{errors.applicant_phone_number}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="signin-element-form-wrapper margin-buttom">
                                                        <Input
                                                            label="آدرس"
                                                            icon={faLocationDot}
                                                            placeholder="آدرس محل فعالیت"
                                                            type="text"
                                                            name={"address"}
                                                            onChange={handleChange}
                                                            value={values.address}
                                                        />
                                                        {errors.address && touched.address && <span className='error'>{errors.address}</span>}
                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="کدپستی"
                                                                icon={faHashtag}
                                                                placeholder="کدپستی محل فعالیت"
                                                                type="text"
                                                                name={"postal_code"}
                                                                onChange={handleChange}
                                                                value={values.postal_code}
                                                            />
                                                            {errors.postal_code && touched.postal_code && <span className='error'>{errors.postal_code}</span>}
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                name="work_place_number"
                                                                label="شماره تماس"
                                                                icon={faPhone}
                                                                placeholder="شماره تماس محل فعالیت"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.work_place_number}
                                                            />
                                                            {errors.work_place_number && touched.work_place_number && <span className='error'>{errors.work_place_number}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <InputUpload
                                                                label={"تصویر جواز کسب"}
                                                                name="business_license_image"
                                                                onChange={(file) => setFieldValue('business_license_image', file)}
                                                            />
                                                            {errors.business_license_image && touched.business_license_image && <span className='error'>{errors.business_license_image}</span>}
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <InputUpload
                                                                label={"تصویر کارت"}
                                                                name="national_card_image"
                                                                onChange={(file) => setFieldValue('national_card_image', file)}
                                                            />
                                                            {errors.national_card_image && touched.national_card_image && <span className='error'>{errors.national_card_image}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="signin-btn-wrapper">
                                                <Button1 type="submit" isSubmitting={isSubmitting} />
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <form onSubmit={sendDataHandler}>
                                    <div className="form-content-all-form">
                                        <div className="form-signin">
                                            <div className="form-content-top">
                                                <div className="signin-element-form-wrapper margin-buttom">
                                                    <Input
                                                        name="applicants_position_in_company"
                                                        label="سمت درخواست کننده"
                                                        icon={faUser}
                                                        placeholder="سمت درخواست کننده در شرکت"
                                                        type="text"
                                                        onChange={dataFormCompanyChange}
                                                        value={dataFormCompany.applicants_position_in_company}
                                                    />
                                                </div>

                                                <div className="radio-wrapper label-input">
                                                    <p className='mb-3'>حق امضا</p>
                                                    <div className="d-flex">
                                                        <InputRadio
                                                            text="دارم"
                                                            name="signed_right"
                                                            value={true}
                                                            checked={dataFormCompany.signed_right === true}
                                                            onChange={() => {
                                                                setDataFormCompany({ ...dataFormCompany, signed_right: true });
                                                                setIsPermition("true")
                                                                setAddSignature(
                                                                    [
                                                                        {
                                                                            full_name: "",
                                                                            position_incompany: "",
                                                                            national_code: "",
                                                                            phone_number: ""
                                                                        }
                                                                    ]
                                                                )
                                                            }}
                                                        />
                                                        <InputRadio
                                                            text="ندارم"
                                                            name="signed_right"
                                                            value={false}
                                                            checked={dataFormCompany.signed_right === false}
                                                            onChange={() => {
                                                                setDataFormCompany({ ...dataFormCompany, signed_right: false });
                                                                setIsPermition("false")
                                                                setFirstSignature(
                                                                    [
                                                                        {
                                                                            owner_first_signature: "",
                                                                            national_code: ""
                                                                        }
                                                                    ]
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    isPermition === "true" ?
                                                        <>
                                                            {
                                                                firstSignature.map((input, index) => (
                                                                    <div className='signature-true-wrapper' key={index}>
                                                                        <p className="mb-2 mt-4 info-owner-text">اطلاعات صاحب امضا جدید</p>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faUser}
                                                                                placeholder={`صاحب امضا ${index + 2}`} name="owner_first_signature"
                                                                                onChange={handleFirstSignatureChange}
                                                                                value={input.owner_first_signature}
                                                                            />

                                                                        </div>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faAddressCard}
                                                                                placeholder="کد ملی"
                                                                                name="national_code"
                                                                                onChange={handleFirstSignatureChange}
                                                                                value={input.national_code}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                ))
                                                            }

                                                            <p className="add-signature-title" onClick={handlerAddinputssignatureTrue}>
                                                                <>
                                                                    <span className='d-flex align-items-center'>
                                                                        <FontAwesomeIcon icon={faPlus} className='mx-2' />
                                                                        افزودن صاحب امضا جدید
                                                                    </span>
                                                                </>
                                                            </p>
                                                        </> :
                                                        isPermition === "false" ?
                                                            <>
                                                                {
                                                                    addSignature.map((input, index) => (
                                                                        <div className='signature-false-wrapper' key={index}>
                                                                            <p className="mb-2 mt-4 info-owner-text">اطلاعات صاحب امضا جدید</p>

                                                                            <div className='signin-element-form-wrapper margin-buttom'>
                                                                                <Input2
                                                                                    icon={faUser}
                                                                                    placeholder="نام ونام خانوادگی"
                                                                                    name="full_name"
                                                                                    value={input.full_name}
                                                                                    onChange={(e) => addSignatureChange(e, index)}
                                                                                />
                                                                            </div>
                                                                            <div className='signin-element-form-wrapper margin-buttom'>
                                                                                <Input2
                                                                                    icon={faUser}
                                                                                    placeholder="سمت در شرکت"
                                                                                    name="position_incompany"
                                                                                    value={input.position_incompany}
                                                                                    onChange={(e) => addSignatureChange(e, index)}
                                                                                />
                                                                            </div>
                                                                            <div className='signin-element-form-wrapper margin-buttom'>
                                                                                <Input2
                                                                                    icon={faAddressCard}
                                                                                    placeholder="کد ملی"
                                                                                    name="national_code"
                                                                                    value={input.national_code}
                                                                                    onChange={(e) => addSignatureChange(e, index)}
                                                                                />
                                                                            </div>
                                                                            <div className='signin-element-form-wrapper margin-buttom'>
                                                                                <Input2
                                                                                    icon={faPhone}
                                                                                    placeholder="شماره موبایل"
                                                                                    name="phone_number"
                                                                                    value={input.phone_number}
                                                                                    onChange={(e) => addSignatureChange(e, index)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                                <p className="add-signature-title" onClick={handlerAddinputssignatureFalse} >
                                                                    <>
                                                                        <span className='d-flex align-items-center'>
                                                                            <FontAwesomeIcon icon={faPlus} className='mx-2' />
                                                                            افزودن صاحب امضا جدید
                                                                        </span>
                                                                    </>
                                                                </p>
                                                            </> : null
                                                }

                                            </div>
                                            <div className="form-content-bottom">
                                                <div className="signin-basic-info-wrapper margin-buttom">
                                                    <div className='input-item-wrapper'>
                                                        <Input
                                                            label={"شناسه ملی شرکت"}
                                                            icon={faAddressCard}
                                                            placeholder="شناسه ملی شرکت"
                                                            type="text"
                                                            name="company_national_id"
                                                            onChange={dataFormCompanyChange}
                                                            value={dataFormCompany.company_national_id}
                                                        />
                                                    </div>
                                                    <div className='input-item-wrapper'>
                                                        <Input
                                                            label="شماره تماس"
                                                            name="phone_number"
                                                            icon={faPhone}
                                                            placeholder="شماره تماس شرکت"
                                                            type="text"
                                                            value={dataFormCompany.phone_number}
                                                            onChange={dataFormCompanyChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="signin-basic-info-wrapper margin-buttom">
                                                    <div className='input-item-wrapper'>
                                                        <Input
                                                            label={"ادرس"}
                                                            name="address"
                                                            icon={faLocationDot}
                                                            placeholder="ادرس شرکت"
                                                            type="text"
                                                            onChange={dataFormCompanyChange}
                                                            value={dataFormCompany.address}
                                                        />
                                                    </div>
                                                    <div className='input-item-wrapper'>
                                                        <Input
                                                            name="postal_code"
                                                            label="کدپستی"
                                                            icon={faHashtag}
                                                            placeholder="کدپستی شرکت"
                                                            type="text"
                                                            onChange={dataFormCompanyChange}
                                                            value={dataFormCompany.postal_code}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="signin-basic-info-wrapper margin-buttom mt-4">
                                                    <div className='input-item-wrapper2'>
                                                        <InputUpload
                                                            label={"تصویر اساسنامه شرکت"}
                                                            name="company_statute_image"
                                                            onChange={(name, file) => handleFileChange(name, file)}
                                                        />
                                                    </div>
                                                    <div className='input-item-wrapper2'>
                                                        <InputUpload
                                                            label={"تصویر آخرین آگهی تغییرات"}
                                                            name="last_ad_changes_image"
                                                            onChange={(name, file) => handleFileChange(name, file)}
                                                        />
                                                    </div>
                                                    <div className='input-item-wrapper2'>
                                                        <InputUpload
                                                            label={"تصویر لوگو شرکت"}
                                                            name="company_image"
                                                            onChange={(name, file) => handleFileChange(name, file)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="signin-btn-wrapper">
                                        <Button1 type="submit" onClick={sendDataHandler} />
                                    </div>
                                </form>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}











