import  { useEffect, useState } from 'react'
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
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

export default function Pform1({ formData, updateFormData, nextTab, form, setContent }) {

    const [value, setValue] = useState(0);
    const [localData, setLocalData] = useState(formData);
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const nationalIdRegex = /^[0-9]{10}$/
    const postalCodeRegex = /^[0-9]{10}$/;
    const economicCodeRegex = /^[0-9]{12}$/;
    setContent("اطلاعات اولیه مشتری :")

    const validationSchema = Yup.object({
        owner_name: Yup.string()
            .required('نام مالک را وارد کنید'),
        owner_lastname: Yup.string()
            .required('نام خانوادگی مالک را وارد کنید'),
        phone_number: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس مالک نامعتبر است')
            .required('شماره تماس مالک را وارد کنید'),
        nattion_code_owner: Yup.string()
            .matches(nationalIdRegex, 'کد ملی مالک نامعتبر است')
            .required('کد ملی مالک را وارد کنید'),
        phone_number_owner: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس مالک نامعتبر است')
            .required('شماره تماس مالک را وارد کنید'),
        pyramid_number: Yup.string()
            .required('شماره هرم را وارد کنید'),
        address: Yup.string()
            .required('آدرس را وارد کنید'),
        name_bearer: Yup.string()
            .required('نام آورنده را وارد کنید'),
        last_name_bearer: Yup.string()
            .required('نام خانوادگی آورنده را وارد کنید'),
        phone_number_bearer: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس آورنده نامعتبر است')
            .required('شماره تماس آورنده را وارد کنید'),
        make_turn: Yup.string()
            .required('نحوه نوبت دهی را انتخاب کنید'),
        refer: Yup.string()
            .required('نحوه مراجعه را انتخاب کنید'),
        type_of_service: Yup.array()
            .min(1, 'حداقل یک نوع خدمات را انتخاب کنید')
    });

    const validationSchema2 = Yup.object({
        company_name: Yup.string()
            .required('نام شرکت را وارد کنید'),
        phone_number: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس نامعتبر است')
            .required('شماره تماس را وارد کنید'),
        pyramid_number: Yup.string()
            .required('شماره هرم را وارد کنید'),
        national_code: Yup.string()
            .matches(nationalIdRegex, 'کد ملی نامعتبر است')
            .required('کد ملی را وارد کنید'),
        Economic_code: Yup.string()
            .matches(economicCodeRegex, 'کد اقتصادی نامعتبر است')
            .required('کد اقتصادی را وارد کنید'),
        compony_phone_number: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس شرکت نامعتبر است')
            .required('شماره تماس شرکت را وارد کنید'),
        postal_code: Yup.string()
            .matches(postalCodeRegex, 'کدپستی نامعتبر است')
            .required('کدپستی را وارد کنید'),
        make_turn: Yup.string()
            .required('نحوه نوبت دهی را انتخاب کنید'),
        address: Yup.string()
            .required('آدرس را وارد کنید'),
        refer: Yup.string()
            .required('نحوه مراجعه را انتخاب کنید'),
        bearer_name: Yup.string()
            .required('نام آورنده را وارد کنید'),
        bearer_lastname: Yup.string()
            .required('نام خانوادگی آورنده را وارد کنید'),
        bearer_national: Yup.string()
            .matches(nationalIdRegex, 'کد ملی آورنده نامعتبر است')
            .required('کد ملی آورنده را وارد کنید'),
        bearer_phone_number: Yup.string()
            .matches(phoneNumberRegex, 'شماره تماس آورنده نامعتبر است')
            .required('شماره تماس آورنده را وارد کنید'),
    });

    const formik = useFormik({
        initialValues: {
            owner_name: '',
            owner_lastname: '',
            phone_number: '',
            nattion_code_owner: '',
            phone_number_owner: "",
            pyramid_number: '',
            address: '',
            name_bearer: '',
            last_name_bearer: '',
            phone_number_bearer: '',
            make_turn: '',
            refer: '',
            type_of_service: []
        },
        validationSchema,
        onSubmit: (values) => {
            updateFormData(values, "form1");
            nextTab();
        },
    });

    const formik2 = useFormik({

        initialValues: {
            company_name: '',
            phone_number: '',
            pyramid_number: '',
            national_code: '',
            Economic_code: '',
            compony_phone_number: '',
            postal_code: '',
            make_turn: '',
            address: '',
            refer: '',
            bearer_name: '',
            bearer_lastname: '',
            bearer_national: '',
            bearer_phone_number: '',
        },
        validationSchema: validationSchema2,
        onSubmit: (values) => {
            updateFormData(values, "form2");
            nextTab();
        },
    });

    const handleCheckboxChange = (value) => {
        const { type_of_service } = formik.values;
        if (type_of_service.includes(value)) {
            formik.setFieldValue('type_of_service', type_of_service.filter((service) => service !== value));
        } else {
            formik.setFieldValue('type_of_service', [...type_of_service, value]);
        }
    };

    const handleChangetab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        updateFormData(localData);
    }, [localData]);

    useEffect(() => {
        if (formData) {
            if (form === "form1") {
                formik.setValues(prevValues => ({
                    ...prevValues,
                    ...formData
                }));
            } else {
                formik2.setValues(prevValues => ({
                    ...prevValues,
                    ...formData
                }));
                console.log(formData)
            }
        }
    }, [formData]);

    return (
        <>
            <div className="form1-container">
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChangetab} aria-label="simple tabs example">
                        <CustomTab label="شخصی" {...a11yProps(0)} />
                        <CustomTab label="شرکتی" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} className={"tab1-pform1"}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='p-form1-contant' >
                                <div className='p-form1-row'>
                                    <Col className='mb-4 mb-lg-0' xs={12} md={4}>
                                        <Input
                                            label="نام مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            placeholder="نام مالک"
                                            name="owner_name"
                                            value={formik.values.owner_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.owner_name && formik.errors.owner_name && <span className='error'>{formik.errors.owner_name}</span>}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="نام خانوادگی مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            placeholder="نام خانوادگی مالک"
                                            name="owner_lastname"
                                            value={formik.values.owner_lastname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.owner_lastname && formik.errors.owner_lastname && <span className='error'>{formik.errors.owner_lastname}</span>}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس مالک"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            placeholder="شماره تماس مالک"
                                            name="phone_number"
                                            value={formik.values.phone_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.phone_number && formik.errors.phone_number && <span className='error'>{formik.errors.phone_number}</span>}
                                    </Col>
                                </div>
                                <div className='mt-lg-4 p-form1-row'>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="کد ملی مالک"
                                            styled={"inputwidth"}
                                            icon={faAddressCard}
                                            placeholder="کد ملی مالک"
                                            name="nattion_code_owner"
                                            value={formik.values.nattion_code_owner}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.nattion_code_owner && formik.errors.nattion_code_owner && <span className='error'>{formik.errors.nattion_code_owner}</span>}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس مالک"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            placeholder="شماره تماس مالک"
                                            name="phone_number_owner"
                                            value={formik.values.phone_number_owner}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.phone_number_owner && formik.errors.phone_number_owner && <span className='error'>{formik.errors.phone_number_owner}</span>}
                                    </Col>

                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره هرم"
                                            styled={"inputwidth"}
                                            icon={faHashtag}
                                            placeholder="شماره هرم"
                                            name="pyramid_number"
                                            value={formik.values.pyramid_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                        />
                                        {formik.touched.pyramid_number && formik.errors.pyramid_number && <span className='error'>{formik.errors.pyramid_number}</span>}
                                    </Col>
                                </div>
                                <div className='mt-4 p-form1-texte'>
                                    <Texteara
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        name="address"
                                        onBlur={formik.handleBlur}
                                        styled={"eara1"}
                                    />
                                    {formik.touched.address && formik.errors.address && <span className='error'>{formik.errors.address}</span>}
                                </div>
                                <div className='p-form1-row mt-4'>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="نام آورنده"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={formik.values.name_bearer}
                                            placeholder="نام آورنده"
                                            name="name_bearer"
                                            onChange={formik.handleChange}
                                            type="text"
                                        />
                                        {formik.errors.name_bearer && formik.touched.name_bearer && (
                                            <span className='error'>{formik.errors.name_bearer}</span>
                                        )}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="نام خانوادگی آورنده"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={formik.values.last_name_bearer}
                                            placeholder="نام خانواگی آورنده"
                                            name="last_name_bearer"
                                            onChange={formik.handleChange}
                                            type="text"
                                        />
                                        {formik.errors.last_name_bearer && formik.touched.last_name_bearer && (
                                            <span className='error'>{formik.errors.last_name_bearer}</span>
                                        )}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس آورنده"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            value={formik.values.phone_number_bearer}
                                            placeholder="شماره تماس آورنده"
                                            name="phone_number_bearer"
                                            onChange={formik.handleChange}
                                            type="text"
                                        />
                                        {formik.errors.phone_number_bearer && formik.touched.phone_number_bearer && (
                                            <span className='error'>{formik.errors.phone_number_bearer}</span>
                                        )}
                                    </Col>
                                </div>
                                <div className='p-form-row2 mt-md-5'>
                                    <p className='complete-info'>اطلاعات تکمیلی :</p>
                                    <div className="p-form2-complete">
                                        <Col xs={12} md={6}>
                                            <div className='make-turn'>
                                                <span className='title-item-form'>نحوه نوبت دهی</span>
                                                <DropDown
                                                    styled={"dropwidth"}
                                                    items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                    onChange={formik.handleChange}
                                                    name="make_turn"
                                                    defaultValue={formik.values.make_turn}
                                                />
                                                {formik.errors.make_turn && formik.touched.make_turn && (
                                                    <span className='error'>{formik.errors.make_turn}</span>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} className='refer-wrapper'>
                                            <div className='refer-content'>
                                                <div className='wrapper-refrer-option'>
                                                    <span className='title-item-form'>نحوه مراجعه</span>
                                                    <div className='refrer-option'>
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="عادی"
                                                            name="refer"
                                                            value="normal"
                                                            onChange={formik.handleChange}
                                                            checked={formik.values.refer === "normal"}
                                                        />
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="امدادی"
                                                            name="refer"
                                                            value="relief"
                                                            onChange={formik.handleChange}
                                                            checked={formik.values.refer === "relief"}
                                                        />
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="برگشتی"
                                                            name="refer"
                                                            value="returned"
                                                            onChange={formik.handleChange}
                                                            checked={formik.values.refer === "returned"}
                                                        />
                                                    </div>
                                                </div>
                                                {formik.errors.refer && formik.touched.refer && (
                                                    <span className='error'>{formik.errors.refer}</span>
                                                )}
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                                <div className='p-form-row3'>
                                    <p className='title-item-form'>نوع خدمات </p>
                                    <div className='options-services-wrappper'>
                                        {["مکانیک", "زیر و بندسازی", "نقاشی", "برق", "صافکاری", "اتوسرویس", "آپاراتی", "تزئینات", "آپشن", "سرویس سریع", "تعمیراتی"].map(service => (
                                            <Col md={4}>
                                                <InputCheckBox
                                                    key={service}
                                                    value={service}
                                                    onChange={handleCheckboxChange}
                                                    checked={formik.values.type_of_service.includes(service)}
                                                />
                                            </Col>
                                        ))}
                                    </div>
                                    {formik.errors.type_of_service && formik.touched.type_of_service && (
                                        <span className='error'>{formik.errors.type_of_service}</span>
                                    )}
                                </div>
                                <div className='p-form-actions'>
                                    <EditBtn />
                                    <ConfirmBtn type="submit" />
                                </div>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={"tab1-pform1"}>
                        <form onSubmit={formik2.handleSubmit}>
                            <div className='p-fomrm1-tab2-wrapper'>
                                <div className='co-row'>
                                    <Col xs={12} md={7}>
                                        <div className="p-form1-row">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="نام شرکت"
                                                    styled={"inputwidth2"}
                                                    icon={faUser}
                                                    value={formik2.values.company_name}
                                                    placeholder={"نام شرکت"}
                                                    name="company_name"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.company_name && formik2.touched.company_name && (
                                                    <span className='error'>{formik2.errors.company_name}</span>
                                                )}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="شماره تماس"
                                                    styled={"inputwidth2"}
                                                    icon={faPhone}
                                                    value={formik2.values.phone_number}
                                                    placeholder={"شماره تماس"}
                                                    name="phone_number"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.phone_number && formik2.touched.phone_number && (
                                                    <span className='error'>{formik2.errors.phone_number}</span>
                                                )}
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left'>
                                        <Col className='tab2-left-item mb-4 mb-md-0'>
                                            <Input
                                                label="شماره هرم"
                                                styled={"inputwidth2"}
                                                icon={faUser}
                                                value={formik2.values.pyramid_number}
                                                placeholder="شماره هرم"
                                                name="pyramid_number"
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                type="text"
                                            />
                                            {formik2.errors.pyramid_number && formik2.touched.pyramid_number && (
                                                <span className='error'>{formik2.errors.pyramid_number}</span>
                                            )}
                                        </Col>
                                    </Col>
                                </div>
                                <div className='co-row mt-md-4'>
                                    <Col xs={12} md={7}>
                                        <div className="p-form1-row">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="شناسه ملی"
                                                    styled={"inputwidth2"}
                                                    icon={faAddressCard}
                                                    value={formik2.values.national_code}
                                                    placeholder={"شناسه ملی"}
                                                    name="national_code"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.national_code && formik2.touched.national_code && (
                                                    <span className='error'>{formik2.errors.national_code}</span>
                                                )}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="کد اقتصادی"
                                                    styled={"inputwidth2"}
                                                    icon={faHashtag}
                                                    value={formik2.values.Economic_code}
                                                    placeholder={"کد اقتصادی"}
                                                    name="Economic_code"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.Economic_code && formik2.touched.Economic_code && (
                                                    <span className='error'>{formik2.errors.Economic_code}</span>
                                                )}
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left'>
                                        <Col className='tab2-left-item mb-4 mb-md-0'>
                                            <Input
                                                label="شماره تماس"
                                                styled={"inputwidth2"}
                                                icon={faUser}
                                                value={formik2.values.compony_phone_number}
                                                placeholder="شماره تماس شرکت"
                                                name="compony_phone_number"
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                type="text"
                                            />
                                            {formik2.errors.compony_phone_number && formik2.touched.compony_phone_number && (
                                                <span className='error'>{formik2.errors.compony_phone_number}</span>
                                            )}
                                        </Col>
                                    </Col>
                                </div>
                                <div className='co-row mt-md-4'>
                                    <Col className='mb-4 mb-md-0' xs={12} md={7}>
                                        <Col xs={12} md={6}>
                                            <Input
                                                label="کدپستی"
                                                styled={"inputwidth2"}
                                                icon={faEnvelope}
                                                value={formik2.values.postal_code}
                                                placeholder={"کدپستی"}
                                                name="postal_code"
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                type="text"
                                            />
                                            {formik2.errors.postal_code && formik2.touched.postal_code && (
                                                <span className='error'>{formik2.errors.postal_code}</span>
                                            )}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left mb-4 mb-md-0'>
                                        <Col xs={12} md={6} className='tab2-left-item'>
                                            <span style={{ marginRight: "8px" }} className='title-item-form mb-2'>نحوه نوبت دهی :</span>
                                            <DropDown
                                                styled={"inputwidth2"}
                                                items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                onBlur={formik2.handleBlur}
                                                name="make_turn"
                                                onChange={formik2.handleChange}
                                                value={formik2.values.make_turn}
                                                defaultValue={formik2.values.make_turn}
                                            />
                                            {formik2.errors.make_turn && formik2.touched.make_turn && (
                                                <span className='error'>{formik2.errors.make_turn}</span>
                                            )}
                                        </Col>
                                    </Col>
                                </div>
                                <div className='co-row mt-md-4'>
                                    <Col xs={12} md={6}>
                                        <div className="texteara-co-row">
                                            <Texteara
                                                value={formik2.values.address}
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                styled={"eara1"}
                                                name="address"
                                            />
                                            {formik2.errors.address && formik2.touched.address && (
                                                <span className='error'>{formik2.errors.address}</span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} className=''>
                                        <div className='mt-4 mt-md-0 tab2-refer-wrapper'>
                                            <span className='title-item-form'>نحوه مراجعه</span>
                                            <div className='refrer-option'>
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="عادی"
                                                    name="refer"
                                                    value="normal"
                                                    onChange={formik2.handleChange}
                                                    checked={formik2.values.refer === 'normal'}
                                                />
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="امدادی"
                                                    name="refer"
                                                    value="relief"
                                                    onChange={formik2.handleChange}
                                                    checked={formik2.values.refer === 'relief'}
                                                />
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="برگشتی"
                                                    name="refer"
                                                    value="returned"
                                                    onChange={formik2.handleChange}
                                                    checked={formik2.values.refer === 'returned'}
                                                />
                                            </div>
                                            {formik2.errors.refer && formik2.touched.refer && (
                                                <span className='error'>{formik2.errors.refer}</span>
                                            )}
                                        </div>
                                    </Col>
                                </div>
                                <div className='p-form1-contant-tab2-botton'>
                                    <Col xs={12} md={7} lg={6}>
                                        <div className="p-form1-row mt-4">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="نام آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faUser}
                                                    value={formik2.values.bearer_name}
                                                    placeholder={"نام آورنده"}
                                                    name="bearer_name"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.bearer_name && formik2.touched.bearer_name && (
                                                    <span className='error'>{formik2.errors.bearer_name}</span>
                                                )}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="نام خانوادگی آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faUser}
                                                    value={formik2.values.bearer_lastname}
                                                    placeholder={"نام خانوادگی آورنده"}
                                                    name="bearer_lastname"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.bearer_lastname && formik2.touched.bearer_lastname && (
                                                    <span className='error'>{formik2.errors.bearer_lastname}</span>
                                                )}
                                            </Col>
                                        </div>
                                        <div className="p-form1-row mt-4">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="کد ملی آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faAddressCard}
                                                    value={formik2.values.bearer_national}
                                                    placeholder={"کد ملی آورنده"}
                                                    name="bearer_national"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.bearer_national && formik2.touched.bearer_national && (
                                                    <span className='error'>{formik2.errors.bearer_national}</span>
                                                )}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="شماره تماس آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faPhone}
                                                    value={formik2.values.bearer_phone_number}
                                                    placeholder={"شماره تماس آورنده"}
                                                    name="bearer_phone_number"
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    type="text"
                                                />
                                                {formik2.errors.bearer_phone_number && formik2.touched.bearer_phone_number && (
                                                    <span className='error'>{formik2.errors.bearer_phone_number}</span>
                                                )}
                                            </Col>
                                        </div>
                                    </Col>
                                </div>
                                <div className='p-form-actions'>
                                    <EditBtn />
                                    <ConfirmBtn type="submit" />
                                </div>
                            </div>
                        </form>
                    </TabPanel>
                </Box>
            </div>
        </>
    )
}





{/* <div className='options-services'>
    <InputCheckBox value="مکانیک" onChange={handleCheckboxChange} />
    <InputCheckBox value="زیر و بندسازی" onChange={handleCheckboxChange} />
    <InputCheckBox value="نقاشی" onChange={handleCheckboxChange} />
</div> */}




