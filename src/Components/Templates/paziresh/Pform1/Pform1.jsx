import React, { useState } from 'react'
import './Pform1.css'
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Input from '../../../Modules/Input/Input';
import Texteara from '../../../Modules/Texteara/Textarea'
import { faPhone, faUser, faEnvelope, faAddressCard, faHashtag, faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import DropDown from '../../../Modules/DropDown/DropDown'
import InputRadio from '../../../Modules/InputRadio/InputRadio'
import { Col } from 'react-bootstrap';
import InputCheckBox from '../../../Modules/InputChekBox/InputCheckBox'
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
                        <form>
                            <div className='p-form1-part-one'>
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="نام مالک"
                                        icon={faUser}
                                        placeholder="نام مالک"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name="first_name"
                                        label="کد ملی مالک"
                                        icon={faAddressCard}
                                        placeholder="کد ملی مالک"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name="first_name"
                                        label="نام آورنده"
                                        icon={faUser}
                                        placeholder="نام آورنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name=""
                                        label="کد ملی آورنده"
                                        icon={faAddressCard}
                                        placeholder="کد ملی آورنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                </div>
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="نام خانوادگی مالک"
                                        icon={faUser}
                                        placeholder="نام خانوادگی مالک"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name="first_name"
                                        label="شماره تماس آورنده"
                                        icon={faPhone}
                                        placeholder="شماره تماس آورنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name="first_name"
                                        label="نام خانوادگی آورنده"
                                        icon={faUser}
                                        placeholder="نام خانوادگی آورنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                    <Input
                                        name="first_name"
                                        label="شماره تماس آورنده"
                                        icon={faPhone}
                                        placeholder="شماره تماس آورنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"} />
                                </div>
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="شماره تماس تحویل دهنده"
                                        icon={faPhone}
                                        placeholder="شماره تماس تحویل دهنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                    <Input
                                        name="first_name"
                                        label="شماره هرم"
                                        icon={faHashtag}
                                        placeholder="شماره هرم"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                    <div>
                                        <Texteara
                                            styled={"h-p-form1"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-form1-part-two">
                                <p className="title-p-form1-part-two">
                                    اطلاعات تکمیلی :
                                </p>
                                <div className='moraje-container'>
                                    <Col md={6} className='drop-moraje-wrapper'>
                                        <Col md={4}>
                                            <p className='drop-title'>نحوه نوبت دهی :</p>
                                        </Col>
                                        <Col md={8}>
                                            <DropDown
                                                haslable={false}
                                            />
                                        </Col>
                                    </Col>
                                    <Col md={6} className='moraje-wrappper '>
                                        <Col md={4}>
                                            <p className='moraje-title'>نحوه مراجعه :</p>
                                        </Col>
                                        <Col md={8}>
                                            <div className='p-form1-part-two-radio'>
                                                <InputRadio
                                                    value={"مشتری شخصا جهت تعمیرات مراجعه کرده است"} />
                                                <InputRadio
                                                    value={"امداد"} />
                                            </div>
                                        </Col>
                                    </Col>
                                </div>
                            </div>
                            <div className="p-form1-part-tree">
                                <p className="title-p-form1-part-tree">
                                    نوع خدمات :
                                </p>
                                <div className="p-form1-checkbox-container">
                                    <div className="chaeck-box-col1 check-col">
                                        <InputCheckBox value={"مکانیک"} />
                                        <InputCheckBox value={"زیروبند ساز"} />
                                        <InputCheckBox value={"نقاش"} />
                                    </div>
                                    <div className="chaeck-box-col2 check-col">
                                        <InputCheckBox value={"برق"} />
                                        <InputCheckBox value={"صافکاری"} />
                                        <InputCheckBox value={"اتوسرویس"} />
                                    </div>
                                    <div className="chaeck-box-col3 check-col">
                                        <InputCheckBox value={"آپاراتی"} />
                                        <InputCheckBox value={"تزئینات"} />
                                        <InputCheckBox value={"آپشن"} />
                                    </div>
                                    <div className="chaeck-box-col4 check-col">
                                        <InputCheckBox value={"امدادی تعمیراتی"} />
                                        <InputCheckBox value={"تعمیراتی"} />
                                        <InputCheckBox value={"برگشتی"} />
                                    </div>
                                    <div className="chaeck-box-col5 check-col">
                                        <InputCheckBox value={"سرویس سریع"} />
                                    </div>
                                </div>
                            </div>
                            <div className='pform-btns-action'>
                                <button className='btn-action-fp1 edit1'>
                                    ویرایش
                                    <FontAwesomeIcon icon={faPencil} className='plus-btn-2' />
                                </button>
                                <button className='btn-action-fp1 done1'>
                                    تایید
                                    <FontAwesomeIcon icon={faCheck} className='plus-btn-2' />
                                </button>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={"tab1-pform1"}>
                        <form>
                            <div className="p-form1-part-one-co">
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="نام شرکت"
                                        icon={faUser}
                                        placeholder="نام شرکت"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                    <Input
                                        name="first_name"
                                        label="شناسه ملی"
                                        icon={faAddressCard}
                                        placeholder="شناسه ملی"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                </div>
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="شماره تماس"
                                        icon={faPhone}
                                        placeholder="شماره تماس"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                    <Input
                                        name="first_name"
                                        label="شناسه اقتصادی"
                                        icon={faAddressCard}
                                        placeholder="شناسه اقتصادی"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                </div>
                                <div className="input-item-wrapper3">
                                    <Input
                                        name="first_name"
                                        label="شماره هرم"
                                        icon={faHashtag}
                                        placeholder="شماره هرم"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                    <Input
                                        name="first_name"
                                        label="شماره تماس تحویل گیرنده"
                                        icon={faPhone}
                                        placeholder="شماره تماس تحویل گیرنده"
                                        type="text"
                                        value={""}
                                        onChange={""}
                                        styled={"margin-buttom"}
                                    />
                                </div>
                            </div>
                            <div className="p-form1-part-two-co">
                                <Col className='p-form1-part-two-co-right' md={7}>
                                    <div className='w-50'>
                                        <Input
                                            name="first_name"
                                            label="نام مالک"
                                            icon={faUser}
                                            placeholder="نام مالک"
                                            type="text"
                                            value={""}
                                            onChange={""}
                                            styled={"margin-buttom"}
                                        />
                                    </div>
                                    <Texteara
                                        styled={"p-co-texteara"}
                                    />
                                </Col>
                                <Col md={6} className='radios-co-wrapper'>
                                    <p className='drop-title'>نحوه نوبت دهی :</p>
                                    <div className='mt-4'>
                                        <div className='mt-4'>
                                            <InputRadio value={"اینترنتی"} />
                                        </div>
                                        <div className='mt-4'>
                                            <InputRadio value={"حضوری"} />
                                        </div>
                                        <div className='mt-4'>
                                            <InputRadio value={"تلفنی"} />
                                        </div>
                                        <div className='mt-4'>
                                            <InputRadio value={"بدون اخذ نوبت"} />
                                        </div>
                                    </div>
                                </Col>
                            </div>
                            <div className='p-form1-part-three-co mt-3'>
                                <Col md={7} className='inputs-p-container'>
                                    <div className="width-50">
                                        <Input
                                            name="first_name"
                                            label="نام آورنده"
                                            icon={faUser}
                                            placeholder="نام آورنده"
                                            type="text"
                                            value={""}
                                            onChange={""}
                                            styled={"margin-buttom"} />
                                        <Input
                                            name="first_name"
                                            label="کدملی آورنده"
                                            icon={faAddressCard}
                                            placeholder="کدملی آورنده"
                                            type="text"
                                            value={""}
                                            onChange={""}
                                            styled={"margin-buttom"} />
                                    </div>
                                    <div className="width-50">
                                        <Input
                                            name="first_name"
                                            label="نام خانوادگی آورنده"
                                            icon={faUser}
                                            placeholder="نام خانوادگی آورنده"
                                            type="text"
                                            value={""}
                                            onChange={""}
                                            styled={"margin-buttom"} />
                                        <Input
                                            name="first_name"
                                            label="شماره تماس آورنده"
                                            icon={faPhone}
                                            placeholder="شماره تماس آورنده"
                                            type="text"
                                            value={""}
                                            onChange={""}
                                            styled={"margin-buttom"} />
                                    </div>
                                </Col>
                                <Col md={5} className='p-form1-reference-co'>
                                    <div>
                                        <p className='drop-title'>نحوه مراجعه :</p>
                                        <div>
                                            <InputRadio value={"پذیرش امدادی"} />
                                        </div>
                                    </div>
                                </Col>
                            </div>
                            <div className='pform-btns-action'>
                                <button className='btn-action-fp1 edit1'>
                                    ویرایش
                                    <FontAwesomeIcon icon={faPencil} className='plus-btn-2' />
                                </button>
                                <button className='btn-action-fp1 done1'>
                                    تایید
                                    <FontAwesomeIcon icon={faCheck} className='plus-btn-2' />
                                </button>
                            </div>
                        </form>
                    </TabPanel>
                </Box>
            </div>
        </>
    )
}
