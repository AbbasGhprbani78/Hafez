import React, { useState } from 'react'
import './Pform1.css'
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Input from '../../Input/Input';
import Texteara from '../../Texteara/Textarea'
import { faPhone, faUser, faEnvelope, faAddressCard, faHashtag } from '@fortawesome/free-solid-svg-icons';
import DropDown from '../../DropDown/DropDown'
import InputRadio from '../../InputRadio/InputRadio'
import { Col } from 'react-bootstrap';

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
                                <div className="input-item-wrapper2">
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
                                <div className="input-item-wrapper2">
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
                                <div className="input-item-wrapper2">
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
                                    <Col md={5} className='drop-moraje-wrapper'>
                                        <DropDown />
                                    </Col>
                                    <Col md={6} className='moraje-wrappper '>
                                        <p className='moraje-title'>نحوه مراجعه :</p>
                                        <div className='p-form1-part-two-radio'>
                                            <InputRadio
                                                value={"مشتری شخصا جهت تعمیرات مراجعه کرده است"} />
                                            <InputRadio
                                                value={"امداد"} />
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            <div className="p-form1-part-tree">
                                <p className="title-p-form1-part-tree">
                                    نوع خدمات :
                                </p>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    </TabPanel>
                </Box>
            </div>
        </>
    )
}
