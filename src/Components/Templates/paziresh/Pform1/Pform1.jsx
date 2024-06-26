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
                                return errors;
                            }}

                            initialValues={{
                            }}

                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const response = await axios.post(`${IP}//`, values)
                                    if (response.status === 200) {
                                        setSubmitting(false)
                                    }
                                } catch (error) {
                                    toast.error(error.response.data.detail, {
                                        position: "top-left"
                                    })
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                <form>
                                    <div className='p-form1-contant'>
                                        <div className='p-form1-row'>
                                            <Col md={4}>
                                                <Input
                                                    label="نام مالک"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="نام خانوادگی مالک"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                />
                                            </Col>
                                        </div>
                                        <div className='p-form1-row mt-4'>
                                            <Col md={4}>
                                                <Input
                                                    label="کد ملی مالک"
                                                    styled={"inputwidth"}
                                                    icon={faAddressCard}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس مالک"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره هرم"
                                                    styled={"inputwidth"}
                                                    icon={faHashtag}
                                                />
                                            </Col>
                                        </div>
                                        <div className='p-form1-row mt-4 p-form1-texte'>
                                            <Texteara />
                                        </div>
                                        <div className='p-form1-row mt-4'>
                                            <Col md={4}>
                                                <Input
                                                    label="نام آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="نام خانوادگی آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faUser}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    label="شماره تماس آورنده"
                                                    styled={"inputwidth"}
                                                    icon={faPhone}
                                                />
                                            </Col>
                                        </div>
                                        <div className='p-form-row2 mt-5'>
                                            <p className='complete-info'>اطلاعات تکمیلی :</p>
                                            <div className="p-form2-complete">
                                                <Col md={5} className='make-turn'>
                                                    <span className='title-item-form'>نحوه نوبت دهی :</span>
                                                    <DropDown
                                                        styled={"dropwidth"} />
                                                </Col>
                                                <Col md={7} className='refer-wrapper'>
                                                    <span className='title-item-form'>نحوه مراجعه :</span>
                                                    <div className='refrer-option'>
                                                        <InputRadio marginRight="radiostyle" text="عادی" />
                                                        <InputRadio marginRight="radiostyle" text="امدادی" />
                                                        <InputRadio marginRight="radiostyle" text="برگشتی" />
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
                                        <ConfirmBtn />
                                    </div>
                                </form>
                            )}

                        </Formik>
                    </TabPanel>
                    <TabPanel value={value} index={1} className={"tab1-pform1"}>
                        <form>
                            <div className='p-form1-contant-tab2'>
                                <Col md={7}>
                                    <div className="p-form1-row">
                                        <Col md={6}>
                                            <Input
                                                label="نام شرکت"
                                                styled={"inputwidth"}
                                                icon={faUser}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                label="شماره تماس"
                                                styled={"inputwidth"}
                                                icon={faPhone}
                                            />
                                        </Col>
                                    </div>
                                    <div className="p-form1-row mt-4">
                                        <Col md={6}>
                                            <Input
                                                label="شناسه ملی"
                                                styled={"inputwidth"}
                                                icon={faAddressCard}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                label="کد اقتصادی"
                                                styled={"inputwidth"}
                                                icon={faHashtag}
                                            />
                                        </Col>
                                    </div>
                                    <div className="p-form1-row mt-4">
                                        <Col md={6}>
                                            <Input
                                                label="کدپستی"
                                                styled={"inputwidth"}
                                                icon={faEnvelope}
                                            />
                                        </Col>
                                    </div>
                                    <div className="p-form1-row mt-4">
                                        <Texteara />
                                    </div>
                                </Col>
                                <Col md={5} className='p-form1-contant-tab2-left'>
                                    <Col className='tab2-left-item'>
                                        <Input
                                            label="نام مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                        />
                                    </Col>
                                    <Col className='mt-4 tab2-left-item'>
                                        <Input
                                            label="نام مالک"
                                            styled={"inputwidth"}
                                            icon={faUser}
                                        />
                                    </Col>
                                    <Col className='make-turn mt-5 tab2-left-item'>
                                        <span className='title-item-form'>نحوه نوبت دهی :</span>
                                        <DropDown
                                            styled={"dropwidth"} />
                                    </Col>
                                    <Col className='tab2-refer-wrapper'>
                                        <span className='title-item-form'>نحوه مراجعه :</span>
                                        <div className='refrer-option'>
                                            <InputRadio marginRight="radiostyle" text="عادی" />
                                            <InputRadio marginRight="radiostyle" text="امدادی" />
                                            <InputRadio marginRight="radiostyle" text="برگشتی" />
                                        </div>
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
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                label="نام خانوادگی آورنده"
                                                styled={"inputwidth"}
                                                icon={faUser}
                                            />
                                        </Col>
                                    </div>
                                    <div className="p-form1-row mt-4">
                                        <Col md={6}>
                                            <Input
                                                label="کد ملی آورنده"
                                                styled={"inputwidth"}
                                                icon={faAddressCard}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                label="شماره تماس آورنده"
                                                styled={"inputwidth"}
                                                icon={faPhone}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='p-form-actions'>
                                        <EditBtn />
                                        <ConfirmBtn />
                                    </div>
                                </Col>
                            </div>
                        </form>
                    </TabPanel>
                </Box>
                <ToastContainer />
            </div>
        </>
    )
}


