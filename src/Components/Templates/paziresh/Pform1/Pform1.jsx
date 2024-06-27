import React, { useState } from 'react'
import './Pform1.css'
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Input from '../../../Modules/Input/Input';
import Texteara from '../../../Modules/Texteara/Textarea'
import { faPhone, faUser, faEnvelope, faAddressCard, faHashtag } from '@fortawesome/free-solid-svg-icons';
import DropDown from '../../../Modules/DropDown/DropDown'
import InputRadio from '../../../Modules/InputRadio/InputRadio'
import { Col } from 'react-bootstrap';
import InputCheckBox from '../../../Modules/InputChekBox/InputCheckBox'
import ConfirmBtn from '../../../Modules/ConfirmBtn/ConfirmBtn';
import EditBtn from '../../../Modules/EditBtn/EditBtn';
import { Formik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function Pform1() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <div className="form1-container">
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <CustomTab label="شخصی" {...a11yProps(0)} />
                        <CustomTab label="شرکتی" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} className={"tab1-pform1"}>
                        <Formik
                            validate={(values) => {
                                const errors = {};
                                if (!values.owner_name) {
                                    errors.owner_name = "وارد کردن نام مالک اجباری میباشد";
                                } else if (values.owner_name.length < 4) {
                                    errors.owner_name = "نام حداقل باید 4 کارکتر باشد"
                                }
                                if (!values.owner_lastname) {
                                    errors.owner_lastname = "وارد کردن نام خانوادگی مالک اجباری میباشد";
                                } else if (values.owner_lastname < 4) {
                                    errors.owner_lastname = "نام خانوادگی حداقل باید 4 کاراکتر باشد"
                                }
                                if (!values.phone_number) {
                                    errors.phone_number = "وارد کردن شماره مالک اجباری میباشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.phone_number)) {
                                    errors.phone_number = "شماره وارد شده معتبر نیست";
                                }
                                if (!values.nattion_code_owner) {
                                    errors.nattion_code_owner = "وارد کردن کد ملی مالک اجباری میباشد";
                                } else if (!/^\d{10}$/.test(values.nattion_code_owner)) {
                                    errors.nattion_code_owner = "کدملی وارد شده معتبر نیست";
                                }
                                if (!values.phone_number_owner) {
                                    errors.phone_number_owner = "وارد کردن شماره مالک اجباری می‌باشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.phone_number_owner)) {
                                    errors.phone_number_owner = "شماره وارد شده معتبر نیست";
                                }

                                if (!values.pyramid_number) {
                                    errors.pyramid_number = "وارد کردن شماره هرم اجباری می‌باشد";
                                }

                                if (!values.name_bearer) {
                                    errors.name_bearer = "وارد کردن نام آورنده اجباری می‌باشد";
                                }

                                if (!values.last_name_bearer) {
                                    errors.last_name_bearer = "وارد کردن نام خانوادگی آورنده اجباری می‌باشد";
                                }

                                if (!values.phone_number_bearer) {
                                    errors.phone_number_bearer = "وارد کردن شماره آورنده اجباری می‌باشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.phone_number_bearer)) {
                                    errors.phone_number_bearer = "شماره وارد شده معتبر نیست";
                                }

                                if (!values.make_turn) {
                                    errors.make_turn = "نحوه نوبت دهی را انتخاب کنید";
                                }

                                if (!values.refer) {
                                    errors.refer = "نحوه مراجعه را انتخاب کنید";
                                }

                                if (!values.address) {
                                    errors.address = "وارد کردن آدرس اجباری می‌باشد";
                                }

                                return errors;
                            }}

                            initialValues={{
                                personal: "Personal",
                                owner_name: "",
                                owner_lastname: "",
                                phone_number: "",
                                nattion_code_owner: "",
                                phone_number_owner: "",
                                pyramid_number: "",
                                name_bearer: "",
                                last_name_bearer: "",
                                phone_number_bearer: "",
                                make_turn: "",
                                refer: "",
                                address: ""
                            }}

                            onSubmit={async (values, { setSubmitting }) => {
                                console.log(values)
                                setSubmitting(false)
                            }}
                        >
                            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className='p-form1-contant' >
                                        <div className='p-form1-row'>
                                            <Col md={4}>
                                                <Input
                                                    label="نام مالک"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                    value={values.owner_name}
                                                    placeholder="نام مالک"
                                                    name="owner_name"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.owner_name && touched.owner_name && <span className='error'>{errors.owner_name}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="نام خانوادگی مالک"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                    value={values.owner_lastname}
                                                    placeholder="نام خانوادگی مالک"
                                                    name="owner_lastname"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.owner_lastname && touched.owner_lastname && <span className='error'>{errors.owner_lastname}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس مالک"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                    value={values.phone_number}
                                                    placeholder="شماره تماس مالک"
                                                    name="phone_number"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.phone_number && touched.phone_number && <span className='error'>{errors.phone_number}</span>}
                                            </Col>
                                        </div>
                                        <div className='p-form1-row mt-4'>
                                            <Col md={4}>
                                                <Input
                                                    label="کد ملی مالک"
                                                    styled={"inputwidth"}
                                                    icon={faAddressCard}
                                                    value={values.nattion_code_owner}
                                                    placeholder="کد ملی مالک"
                                                    name="nattion_code_owner"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.nattion_code_owner && touched.nattion_code_owner && <span className='error'>{errors.nattion_code_owner}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس مالک"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                    value={values.phone_number_owner}
                                                    placeholder="شماره تماس مالک"
                                                    name="phone_number_owner"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.phone_number_owner && touched.phone_number_owner && <span className='error'>{errors.phone_number_owner}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره هرم"
                                                    styled={"inputwidth"}
                                                    icon={faHashtag}
                                                    value={values.pyramid_number}
                                                    placeholder="شماره هرم"
                                                    name="pyramid_number"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.pyramid_number && touched.pyramid_number && <span className='error'>{errors.pyramid_number}</span>}
                                            </Col>
                                        </div>
                                        <div className='mt-4 p-form1-texte'>
                                            <Texteara
                                                value={values.address}
                                                onChange={handleChange}
                                                styled={"eara1"}
                                                name="address"
                                            />
                                            {errors.address && touched.address && <span className='error'>{errors.address}</span>}
                                        </div>
                                        <div className='p-form1-row mt-4'>
                                            <Col md={4}>
                                                <Input
                                                    label="نام آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                    value={values.name_bearer}
                                                    placeholder="نام آورنده"
                                                    name="name_bearer"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.name_bearer && touched.name_bearer && <span className='error'>{errors.name_bearer}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="نام خانوادگی آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                    value={values.last_name_bearer}
                                                    placeholder="نام خانواگی آورنده"
                                                    name="last_name_bearer"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.last_name_bearer && touched.last_name_bearer && <span className='error'>{errors.last_name_bearer}</span>}
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                    value={values.phone_number_bearer}
                                                    placeholder="شماره تماس آورنده"
                                                    name="phone_number_bearer"
                                                    onChange={handleChange}
                                                    type="text"
                                                />
                                                {errors.phone_number_bearer && touched.phone_number_bearer && <span className='error'>{errors.phone_number_bearer}</span>}
                                            </Col>
                                        </div>
                                        <div className='p-form-row2 mt-5'>
                                            <p className='complete-info'>اطلاعات تکمیلی :</p>
                                            <div className="p-form2-complete">
                                                <Col md={5} >
                                                    <div className='make-turn'>
                                                        <span className='title-item-form'>نحوه نوبت دهی :</span>
                                                        <DropDown
                                                            styled={"dropwidth"}
                                                            items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                            onChange={handleChange}
                                                            name="make_turn"
                                                            value={values.make_turn}
                                                        />
                                                    </div>
                                                    {errors.make_turn && touched.make_turn && <span className='error'>{errors.make_turn}</span>}
                                                </Col>
                                                <Col md={7} className='refer-wrapper'>
                                                    <div className='refer-content'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='title-item-form'>نحوه مراجعه :</span>
                                                            <div className='refrer-option'>
                                                                <InputRadio
                                                                    marginRight="radiostyle"
                                                                    text="عادی"
                                                                    name="normal"
                                                                    value={"normal"}
                                                                    onChange={() => setFieldValue('refer', 'normal')}
                                                                    checked={values.refer === "normal"}
                                                                />
                                                                <InputRadio
                                                                    marginRight="radiostyle"
                                                                    text="امدادی"
                                                                    name="relief"
                                                                    value={"relief"}
                                                                    onChange={() => setFieldValue('refer', 'relief')}
                                                                    checked={values.refer === "relief"}
                                                                />
                                                                <InputRadio
                                                                    marginRight="radiostyle"
                                                                    text="برگشتی"
                                                                    name="returned"
                                                                    value={"returned"}
                                                                    onChange={() => setFieldValue('refer', 'returned')}
                                                                    checked={values.refer === "returned"}
                                                                />
                                                            </div>
                                                        </div>
                                                        {errors.refer && touched.refer && <span className='error'>{errors.refer}</span>}
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>
                                        <div className='p-form-row3'>
                                            <p className='title-item-form'>نوع خدمات :</p>
                                            <div className='options-services-wrappper'>
                                                <div className='options-services'>
                                                    <InputCheckBox value={"مکانیک"} />
                                                    <InputCheckBox value={"زیر و بندسازی"} />
                                                    <InputCheckBox value={"نقاشی"} />

                                                </div>
                                                <div className='options-services'>
                                                    <InputCheckBox value={"برق"} />
                                                    <InputCheckBox value={"صافکاری"} />
                                                    <InputCheckBox value={"اتوسرویس"} />

                                                </div>
                                                <div className='options-services'>
                                                    <InputCheckBox value={"آپاراتی"} />
                                                    <InputCheckBox value={"تزئینات"} />
                                                    <InputCheckBox value={"آپشن"} />

                                                </div>
                                                <div className='options-services'>
                                                    <InputCheckBox value={"سرویس سریع"} />
                                                    <InputCheckBox value={"تعمیراتی"} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-form-actions'>
                                        <EditBtn />
                                        <ConfirmBtn type="submit" isSubmitting={isSubmitting} />
                                    </div>
                                </form>
                            )}

                        </Formik>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={"tab1-pform1"}>
                        <Formik
                            validate={(values) => {
                                const errors = {};

                                if (!values.company_name) {
                                    errors.company_name = "وارد کردن نام شرکت اجباری می‌باشد";
                                }

                                if (!values.phone_number) {
                                    errors.phone_number = "وارد کردن شماره تلفن اجباری می‌باشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.phone_number)) {
                                    errors.phone_number = "شماره وارد شده معتبر نیست";
                                }

                                if (!values.national_code) {
                                    errors.national_code = "وارد کردن کد ملی اجباری می‌باشد";
                                } else if (!/^\d{10}$/.test(values.national_code)) {
                                    errors.national_code = "کدملی وارد شده معتبر نیست";
                                }

                                if (!values.Economic_code) {
                                    errors.Economic_code = "وارد کردن کد اقتصادی اجباری می‌باشد";
                                }

                                if (!values.postal_code) {
                                    errors.postal_code = "وارد کردن کد پستی اجباری می‌باشد";
                                } else if (!/^\d{10}$/.test(values.postal_code)) {
                                    errors.postal_code = "کدپستی وارد شده معتبر نیست";
                                }

                                if (!values.pyramid_number) {
                                    errors.pyramid_number = "وارد کردن شماره هرم اجباری می‌باشد";
                                }

                                if (!values.compony_phone_number) {
                                    errors.compony_phone_number = "وارد کردن شماره تلفن شرکت اجباری می‌باشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.compony_phone_number)) {
                                    errors.compony_phone_number = "شماره وارد شده معتبر نیست";
                                }


                                if (!values.bearer_name) {
                                    errors.bearer_name = "وارد کردن نام آورنده اجباری می‌باشد";
                                }

                                if (!values.bearer_lastname) {
                                    errors.bearer_lastname = "وارد کردن نام خانوادگی آورنده اجباری می‌باشد";
                                }

                                if (!values.bearer_national) {
                                    errors.bearer_national = "وارد کردن کد ملی آورنده اجباری می‌باشد";
                                } else if (!/^\d{10}$/.test(values.bearer_national)) {
                                    errors.bearer_national = "کدملی وارد شده معتبر نیست";
                                }


                                if (!values.bearer_phone_number) {
                                    errors.bearer_phone_number = "وارد کردن شماره تلفن آورنده اجباری می‌باشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.bearer_phone_number)) {
                                    errors.bearer_phone_number = "شماره وارد شده معتبر نیست";
                                }


                                if (!values.refer) {
                                    errors.refer = "نحوه مراجعه را انتخاب کنید";
                                }

                                if (!values.make_turn) {
                                    errors.make_turn = "نحوه نوبت دهی را انتخاب کنید";
                                }

                                if (!values.address) {
                                    errors.address = "وارد کردن آدرس اجباری می‌باشد";
                                }
                                return errors;
                            }}

                            initialValues={{
                                corporative: "Corporative",
                                company_name: "",
                                phone_number: "",
                                national_code: "",
                                Economic_code: "",
                                postal_code: "",
                                pyramid_number: "",
                                compony_phone_number: "",
                                bearer_name: "",
                                bearer_lastname: "",
                                bearer_national: "",
                                bearer_phone_number: "",
                                refer: "",
                                make_turn: "",
                                address: ""
                            }}

                            onSubmit={async (values, { setSubmitting }) => {
                                console.log(values)
                                setSubmitting(false)
                            }}
                        >
                            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className='p-fomrm1-tab2-wrapper'>
                                        <div className='p-form1-contant-tab2'>
                                            <Col md={7}>
                                                <div className="p-form1-row">
                                                    <Col md={6}>
                                                        <Input
                                                            label="نام شرکت"
                                                            styled={"inputwidth"}
                                                            icon={faUser}
                                                            value={values.company_name}
                                                            placeholder={"نام شرکت"}
                                                            name="company_name"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.company_name && touched.company_name && <span className='error'>{errors.company_name}</span>}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Input
                                                            label="شماره تماس"
                                                            styled={"inputwidth"}
                                                            icon={faPhone}
                                                            value={values.phone_number}
                                                            placeholder={"شماره تماس"}
                                                            name="phone_number"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.phone_number && touched.phone_number && <span className='error'>{errors.phone_number}</span>}
                                                    </Col>
                                                </div>
                                                <div className="p-form1-row mt-4">
                                                    <Col md={6}>
                                                        <Input
                                                            label="شناسه ملی"
                                                            styled={"inputwidth"}
                                                            icon={faAddressCard}
                                                            value={values.national_code}
                                                            placeholder={"شناسه ملی"}
                                                            name="national_code"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.national_code && touched.national_code && <span className='error'>{errors.national_code}</span>}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Input
                                                            label="کد اقتصادی"
                                                            styled={"inputwidth"}
                                                            icon={faHashtag}
                                                            value={values.Economic_code}
                                                            placeholder={"کد اقتصادی"}
                                                            name="Economic_code"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.Economic_code && touched.Economic_code && <span className='error'>{errors.Economic_code}</span>}
                                                    </Col>
                                                </div>
                                                <div className="p-form1-row mt-4">
                                                    <Col md={6}>
                                                        <Input
                                                            label="کدپستی"
                                                            styled={"inputwidth"}
                                                            icon={faEnvelope}
                                                            value={values.postal_code}
                                                            placeholder={"کدپستی"}
                                                            name="postal_code"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.postal_code && touched.postal_code && <span className='error'>{errors.postal_code}</span>}
                                                    </Col>
                                                </div>
                                                <div className=" mt-4">
                                                    <Texteara
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        styled={"eara1"}
                                                        name="address"
                                                    />
                                                    {errors.address && touched.address && <span className='error'>{errors.address}</span>}
                                                </div>
                                            </Col>
                                            <Col md={5} className='p-form1-contant-tab2-left'>
                                                <Col className='tab2-left-item'>
                                                    <Input
                                                        label="شماره هرم"
                                                        styled={"inputwidth"}
                                                        icon={faUser}
                                                        value={values.pyramid_number}
                                                        placeholder="شماره هرم"
                                                        name="pyramid_number"
                                                        onChange={handleChange}
                                                        type="text"
                                                    />
                                                    {errors.pyramid_number && touched.pyramid_number && <span className='error'>{errors.pyramid_number}</span>}
                                                </Col>
                                                <Col className='mt-4 tab2-left-item'>
                                                    <Input
                                                        label="شماره تماس"
                                                        styled={"inputwidth"}
                                                        icon={faUser}
                                                        value={values.compony_phone_number}
                                                        placeholder="شماره تماس شرکت"
                                                        name="compony_phone_number"
                                                        onChange={handleChange}
                                                        type="text"
                                                    />
                                                    {errors.compony_phone_number && touched.compony_phone_number && <span className='error'>{errors.compony_phone_number}</span>}
                                                </Col>
                                                <Col className=' mt-4 tab2-left-item'>
                                                    <span style={{ marginRight: "8px" }} className='title-item-form mb-2'>نحوه نوبت دهی :</span>
                                                    <DropDown
                                                        styled={"dropwidth2"}
                                                        items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                        onChange={handleChange}
                                                        name="make_turn"
                                                        value={values.make_turn}
                                                    />
                                                    {errors.make_turn && touched.make_turn && <span className='error'>{errors.make_turn}</span>}
                                                </Col>
                                                <Col className=''>
                                                    <div className='tab2-refer-wrapper'>
                                                        <span className='title-item-form'>نحوه مراجعه :</span>
                                                        <div className='refrer-option'>
                                                            <InputRadio
                                                                marginRight="radiostyle"
                                                                text="عادی"
                                                                name="normal"
                                                                value={"normal"}
                                                                onChange={() => setFieldValue('refer', 'normal')}
                                                                checked={values.refer === "normal"}

                                                            />
                                                            <InputRadio
                                                                marginRight="radiostyle"
                                                                text="امدادی"
                                                                name="relief"
                                                                value={"relief"}
                                                                onChange={() => setFieldValue('refer', 'relief')}
                                                                checked={values.refer === "relief"}

                                                            />
                                                            <InputRadio
                                                                marginRight="radiostyle"
                                                                text="برگشتی"
                                                                name="returned"
                                                                value={"returned"}
                                                                onChange={() => setFieldValue('refer', 'returned')}
                                                                checked={values.refer === "returned"}
                                                            />
                                                        </div>
                                                    </div>
                                                    {errors.refer && touched.refer && <span className='error'>{errors.refer}</span>}
                                                </Col>
                                            </Col>
                                        </div>
                                        <div className='p-form1-contant-tab2-botton'>
                                            <Col md={6}>
                                                <div className="p-form1-row mt-4">
                                                    <Col md={6}>
                                                        <Input
                                                            label="نام آورنده"
                                                            styled={"inputwidth"}
                                                            icon={faUser}
                                                            value={values.bearer_name}
                                                            placeholder={"نام آورنده"}
                                                            name="bearer_name"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.bearer_name && touched.bearer_name && <span className='error'>{errors.bearer_name}</span>}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Input
                                                            label="نام خانوادگی آورنده"
                                                            styled={"inputwidth"}
                                                            icon={faUser}
                                                            value={values.bearer_lastname}
                                                            placeholder={"نام خانوادگی آورنده"}
                                                            name="bearer_lastname"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.bearer_lastname && touched.bearer_lastname && <span className='error'>{errors.bearer_lastname}</span>}
                                                    </Col>
                                                </div>
                                                <div className="p-form1-row mt-4">
                                                    <Col md={6}>
                                                        <Input
                                                            label="کد ملی آورنده"
                                                            styled={"inputwidth"}
                                                            icon={faAddressCard}
                                                            value={values.bearer_national}
                                                            placeholder={"کد ملی آورنده"}
                                                            name="bearer_national"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.bearer_national && touched.bearer_national && <span className='error'>{errors.bearer_national}</span>}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Input
                                                            label="شماره تماس آورنده"
                                                            styled={"inputwidth"}
                                                            icon={faPhone}
                                                            value={values.bearer_phone_number}
                                                            placeholder={"شماره تماس آورنده"}
                                                            name="bearer_phone_number"
                                                            onChange={handleChange}
                                                            type="text"
                                                        />
                                                        {errors.bearer_phone_number && touched.bearer_phone_number && <span className='error'>{errors.bearer_phone_number}</span>}
                                                    </Col>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                    <div className='p-form-actions'>
                                        <EditBtn />
                                        <ConfirmBtn type="submit" isSubmitting={isSubmitting} />
                                    </div>
                                </form>
                            )}

                        </Formik>
                    </TabPanel>
                </Box>
                <ToastContainer />
            </div>
        </>
    )
}





// try {
//     const response = await axios.post(`${IP}//`, values)
//     if (response.status === 200) {
//         setSubmitting(false)
//     }
// } catch (error) {
//     toast.error(error.response.data.detail, {
//         position: "top-left"
//     })
//     setSubmitting(false);
// }