import React, { useEffect, useState } from 'react'
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

export default function Pform1({ formData, updateFormData, nextTab }) {

    const [value, setValue] = useState(0);
    const [localData, setLocalData] = useState(formData);
    
    const handleChangetab = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextTab();
    };


    useEffect(() => {
        updateFormData(localData);
    }, [localData]);

    const handleChange = (e) => {
        setLocalData({
            ...localData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className="form1-container">
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChangetab} aria-label="simple tabs example">
                        <CustomTab label="شخصی" {...a11yProps(0)} />
                        <CustomTab label="شرکتی" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} className={"tab1-pform1"}>
                        <form onSubmit={handleSubmit}>
                            <div className='p-form1-contant' >
                                <div className='p-form1-row'>
                                    <Col className='mb-4 mb-lg-0' xs={12} md={4}>
                                        <Input
                                            label="نام مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={""}
                                            placeholder="نام مالک"
                                            name="owner_name"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.owner_name && touched.owner_name && <span className='error'>{errors.owner_name}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' l xs={12} md={4}>
                                        <Input
                                            label="نام خانوادگی مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={""}
                                            placeholder="نام خانوادگی مالک"
                                            name="owner_lastname"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.owner_lastname && touched.owner_lastname && <span className='error'>{errors.owner_lastname}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس مالک"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            value={""}
                                            placeholder="شماره تماس مالک"
                                            name="phone_number"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.phone_number && touched.phone_number && <span className='error'>{errors.phone_number}</span>} */}
                                    </Col>
                                </div>
                                <div className='p-form1-row'>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="کد ملی مالک"
                                            styled={"inputwidth"}
                                            icon={faAddressCard}
                                            value={""}
                                            placeholder="کد ملی مالک"
                                            name="nattion_code_owner"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.nattion_code_owner && touched.nattion_code_owner && <span className='error'>{errors.nattion_code_owner}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس مالک"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            value={""}
                                            placeholder="شماره تماس مالک"
                                            name="phone_number_owner"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.phone_number_owner && touched.phone_number_owner && <span className='error'>{errors.phone_number_owner}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره هرم"
                                            styled={"inputwidth"}
                                            icon={faHashtag}
                                            value={""}
                                            placeholder="شماره هرم"
                                            name="pyramid_number"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.pyramid_number && touched.pyramid_number && <span className='error'>{errors.pyramid_number}</span>} */}
                                    </Col>
                                </div>
                                <div className='mt-4 p-form1-texte'>
                                    <Texteara
                                        value={""}
                                        onChange={""}
                                        styled={"eara1"}
                                        name="address"
                                    />
                                    {/* {errors.address && touched.address && <span className='error'>{errors.address}</span>} */}
                                </div>
                                <div className='p-form1-row mt-4'>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="نام آورنده"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={""}
                                            placeholder="نام آورنده"
                                            name="name_bearer"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.name_bearer && touched.name_bearer && <span className='error'>{errors.name_bearer}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="نام خانوادگی آورنده"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                            value={""}
                                            placeholder="نام خانواگی آورنده"
                                            name="last_name_bearer"
                                            onChange={""}
                                            type="text"
                                        />
                                        {/* {errors.last_name_bearer && touched.last_name_bearer && <span className='error'>{errors.last_name_bearer}</span>} */}
                                    </Col>
                                    <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                        <Input
                                            label="شماره تماس آورنده"
                                            styled={"inputwidth"}
                                            icon={faPhone}
                                            value={""}
                                            placeholder="شماره تماس آورنده"
                                            name="phone_number_bearer"
                                            onChange={handleChangetab}
                                            type="text"
                                        />
                                        {/* {errors.phone_number_bearer && touched.phone_number_bearer && <span className='error'>{errors.phone_number_bearer}</span>} */}
                                    </Col>
                                </div>
                                <div className='p-form-row2 mt-md-5'>
                                    <p className='complete-info'>اطلاعات تکمیلی :</p>
                                    <div className="p-form2-complete">
                                        <Col xs={12} md={6} >
                                            <div className='make-turn'>
                                                <span className='title-item-form'>نحوه نوبت دهی</span>
                                                <DropDown
                                                    styled={"dropwidth"}
                                                    items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                    onChange={""}
                                                    name="make_turn"
                                                    value={""}
                                                />
                                            </div>
                                            {/* {errors.make_turn && touched.make_turn && <span className='error'>{errors.make_turn}</span>} */}
                                        </Col>
                                        <Col xs={12} md={6} className='refer-wrapper'>
                                            <div className='refer-content'>
                                                <div className='wrapper-refrer-option'>
                                                    <span className='title-item-form'>نحوه مراجعه</span>
                                                    <div className='refrer-option'>
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="عادی"
                                                            name="normal"
                                                            value={"normal"}
                                                            onChange={""}
                                                            checked={""}
                                                        />
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="امدادی"
                                                            name="relief"
                                                            value={"relief"}
                                                            onChange={""}
                                                            checked={""}
                                                        />
                                                        <InputRadio
                                                            marginRight="radiostyle"
                                                            text="برگشتی"
                                                            name="returned"
                                                            value={"returned"}
                                                            onChange={""}
                                                            checked={""}
                                                        />
                                                    </div>
                                                </div>
                                                {/* {errors.refer && touched.refer && <span className='error'>{errors.refer}</span>} */}
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                                <div className='p-form-row3'>
                                    <p className='title-item-form'>نوع خدمات </p>
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
                                <div className='p-form-actions'>
                                    <EditBtn />
                                    <ConfirmBtn type="submit" />
                                </div>
                            </div>

                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={"tab1-pform1"}>
                        <form onSubmit={handleSubmit}>
                            <div className='p-fomrm1-tab2-wrapper'>
                                <div className='co-row'>
                                    <Col xs={12} md={7}>
                                        <div className="p-form1-row">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="نام شرکت"
                                                    styled={"inputwidth2"}
                                                    icon={faUser}
                                                    value={""}
                                                    placeholder={"نام شرکت"}
                                                    name="company_name"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.company_name && touched.company_name && <span className='error'>{errors.company_name}</span>} */}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="شماره تماس"
                                                    styled={"inputwidth2"}
                                                    icon={faPhone}
                                                    value={""}
                                                    placeholder={"شماره تماس"}
                                                    name="phone_number"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.phone_number && touched.phone_number && <span className='error'>{errors.phone_number}</span>} */}
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left'>
                                        <Col className='tab2-left-item mb-4 mb-md-0'>
                                            <Input
                                                label="شماره هرم"
                                                styled={"inputwidth2"}
                                                icon={faUser}
                                                value={""}
                                                placeholder="شماره هرم"
                                                name="pyramid_number"
                                                onChange={handleChangetab}
                                                type="text"
                                            />
                                            {/* {errors.pyramid_number && touched.pyramid_number && <span className='error'>{errors.pyramid_number}</span>} */}
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
                                                    value={""}
                                                    placeholder={"شناسه ملی"}
                                                    name="national_code"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.national_code && touched.national_code && <span className='error'>{errors.national_code}</span>} */}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="کد اقتصادی"
                                                    styled={"inputwidth2"}
                                                    icon={faHashtag}
                                                    value={""}
                                                    placeholder={"کد اقتصادی"}
                                                    name="Economic_code"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.Economic_code && touched.Economic_code && <span className='error'>{errors.Economic_code}</span>} */}
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left'>
                                        <Col className=' tab2-left-item mb-4 mb-md-0'>
                                            <Input
                                                label="شماره تماس"
                                                styled={"inputwidth2"}
                                                icon={faUser}
                                                value={""}
                                                placeholder="شماره تماس شرکت"
                                                name="compony_phone_number"
                                                onChange={""}
                                                type="text"
                                            />
                                            {/* {errors.compony_phone_number && touched.compony_phone_number && <span className='error'>{errors.compony_phone_number}</span>} */}
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
                                                value={""}
                                                placeholder={"کدپستی"}
                                                name="postal_code"
                                                onChange={""}
                                                type="text"
                                            />
                                            {/* {errors.postal_code && touched.postal_code && <span className='error'>{errors.postal_code}</span>} */}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={5} className='p-form1-contant-tab2-left mb-4 mb-md-0'>
                                        <Col xs={12} md={6} className='tab2-left-item'>
                                            <span style={{ marginRight: "8px" }} className='title-item-form mb-2'>نحوه نوبت دهی :</span>
                                            <DropDown
                                                styled={"inputwidth2"}
                                                items={["تلفنی", "بدون اخذ نوبت", "حضوری", "اینترنتی"]}
                                                onChange={""}
                                                name="make_turn"
                                                value={""}
                                            />
                                            {/* {errors.make_turn && touched.make_turn && <span className='error'>{errors.make_turn}</span>} */}
                                        </Col>
                                    </Col>
                                </div>
                                <div className='co-row mt-md-4'>
                                    <Col xs={12} md={6} >
                                        <div className="texteara-co-row">
                                            <Texteara
                                                value={""}
                                                onChange={""}
                                                styled={"eara1"}
                                                name="address"
                                            />
                                            {/* {errors.address && touched.address && <span className='error'>{errors.address}</span>} */}
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} className=''>
                                        <div className='mt-4 mt-md-0 tab2-refer-wrapper'>
                                            <span className='title-item-form'>نحوه مراجعه</span>
                                            <div className='refrer-option'>
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="عادی"
                                                    name="normal"
                                                    value={""}
                                                    onChange={""}
                                                    checked={""}

                                                />
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="امدادی"
                                                    name="relief"
                                                    value={""}
                                                    onChange={""}
                                                    checked={""}

                                                />
                                                <InputRadio
                                                    marginRight="radiostyle"
                                                    text="برگشتی"
                                                    name="returned"
                                                    value={""}
                                                    onChange={""}
                                                    checked={""}
                                                />
                                            </div>
                                        </div>
                                        {/* {errors.refer && touched.refer && <span className='error'>{errors.refer}</span>} */}
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
                                                    value={""}
                                                    placeholder={"نام آورنده"}
                                                    name="bearer_name"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.bearer_name && touched.bearer_name && <span className='error'>{errors.bearer_name}</span>} */}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="نام خانوادگی آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faUser}
                                                    value={""}
                                                    placeholder={"نام خانوادگی آورنده"}
                                                    name="bearer_lastname"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.bearer_lastname && touched.bearer_lastname && <span className='error'>{errors.bearer_lastname}</span>} */}
                                            </Col>
                                        </div>
                                        <div className="p-form1-row mt-4">
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="کد ملی آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faAddressCard}
                                                    value={""}
                                                    placeholder={"کد ملی آورنده"}
                                                    name="bearer_national"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.bearer_national && touched.bearer_national && <span className='error'>{errors.bearer_national}</span>} */}
                                            </Col>
                                            <Col className='mb-4 mb-md-0' xs={12} md={6}>
                                                <Input
                                                    label="شماره تماس آورنده"
                                                    styled={"inputwidth2"}
                                                    icon={faPhone}
                                                    value={""}
                                                    placeholder={"شماره تماس آورنده"}
                                                    name="bearer_phone_number"
                                                    onChange={""}
                                                    type="text"
                                                />
                                                {/* {errors.bearer_phone_number && touched.bearer_phone_number && <span className='error'>{errors.bearer_phone_number}</span>} */}
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











