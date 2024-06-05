import React, { useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
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

    const [value, setValue] = useState(0);
    const [uploads, setUploads] = useState({});
    const [isPermition, setIsPermition] = useState("No")



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlerAddinputssignature = () => {
        console.log("click")
    }

    const handleFileChange = (file, name) => {
        setUploads((prevUploads) => ({
            ...prevUploads,
            [name]: file
        }));
        setPersonalFormData({
            ...personlFormData,
            uploads: {
                ...personlFormData.uploads,
                [name]: file
            }
        });
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
                                        return errors
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
                                            toast.error(error.response.data.message, {
                                                position: "top-left"
                                            })
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                        <form>
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
                                                            />

                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="نام خانوادگی"
                                                                icon={faUser}
                                                                placeholder="نام خانوادگی صاحب فعالیت"
                                                                type="text"
                                                                name={"last_name"}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="کد ملی"
                                                                icon={faAddressCard}
                                                                placeholder=" کد ملی صاحب فعالیت"
                                                                type="text"
                                                                name={"ntionalIDNumber"}
                                                            />

                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="شماره تماس متقاضی"
                                                                icon={faPhone}
                                                                placeholder="شماره تماس متقاضی"
                                                                type="text"
                                                                name={"applicantNumber"}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="signin-element-form-wrapper margin-buttom">
                                                        <Input
                                                            label="آدرس"
                                                            icon={faLocationDot}
                                                            placeholder="آدرس محل فعالیت"
                                                            type="text"
                                                            name={"address"}
                                                        />

                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                label="کدپستی"
                                                                icon={faHashtag}
                                                                placeholder="کدپستی محل فعالیت"
                                                                type="text"
                                                                name={"postal_code"}
                                                            />
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <Input
                                                                name="phone_number"
                                                                label="شماره تماس"
                                                                icon={faPhone}
                                                                placeholder="شماره تماس محل فعالیت"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="signin-basic-info-wrapper margin-buttom">
                                                        <div className='input-item-wrapper'>
                                                            <InputUpload
                                                                label={"تصویر جواز کسب"}
                                                                name="businessLicense"
                                                                onFileChange={handleFileChange}
                                                            />
                                                        </div>
                                                        <div className='input-item-wrapper'>
                                                            <InputUpload
                                                                label={"تصویر کارت"}
                                                                name="cardImage"
                                                                onFileChange={handleFileChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="signin-btn-wrapper">
                                                <Button1 />
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Formik>
                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                        <form >
                                            <div className="form-content-all-form">
                                                <div className="form-signin" >
                                                    <div className="form-content-top">
                                                        <div className="signin-element-form-wrapper margin-buttom">
                                                            <Input
                                                                label="سمت درخواست کننده"
                                                                icon={faUser}
                                                                placeholder="سمت درخواست کننده در شرکت"
                                                                type="text" />
                                                        </div>
                                                        <div className="radio-wrapper label-input">
                                                            <p className='mb-3'>حق امضا</p>
                                                            <div className="d-flex">
                                                                <InputRadio
                                                                    text="دارم"
                                                                    onChange={setIsPermition}
                                                                    isPermition={isPermition}
                                                                    value={"Yes"}
                                                                />
                                                                <InputRadio
                                                                    text="ندارم"
                                                                    marginRight='marginRight'
                                                                    onChange={setIsPermition}
                                                                    isPermition={isPermition}
                                                                    value={"No"}
                                                                />
                                                            </div>
                                                        </div>
                                                        {
                                                            isPermition === "No" ?
                                                                <>
                                                                    <div>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faUser}
                                                                                placeholder="نام ونام خانوادگی"
                                                                            />
                                                                        </div>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faUser}
                                                                                placeholder="سمت در شرکت"
                                                                            />
                                                                        </div>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faAddressCard}
                                                                                placeholder="کد ملی"
                                                                            />
                                                                        </div>
                                                                        <div className='signin-element-form-wrapper margin-buttom'>
                                                                            <Input2
                                                                                icon={faPhone}
                                                                                placeholder="شماره موبایل"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <p className="add-signature-title" onClick={handlerAddinputssignature}>
                                                                        <FontAwesomeIcon icon={faPlus} />
                                                                        <span >
                                                                            افزودن صاحب امضا جدید
                                                                        </span>
                                                                    </p>
                                                                </>

                                                                :
                                                                <div >
                                                                    <div className='signin-element-form-wrapper margin-buttom'>
                                                                        <Input2
                                                                            icon={faUser}
                                                                            placeholder="صاحب امضا اول"
                                                                        />
                                                                    </div>
                                                                    <div className='signin-element-form-wrapper margin-buttom'>
                                                                        <Input2
                                                                            icon={faAddressCard}
                                                                            placeholder="کد ملی"
                                                                        />
                                                                    </div>
                                                                </div>
                                                        }

                                                    </div>
                                                    <div className="form-content-bottom">
                                                        <div className="signin-basic-info-wrapper margin-buttom">
                                                            <div className='input-item-wrapper'>
                                                                <Input
                                                                    label={"شناسه ملی"}
                                                                    icon={faAddressCard}
                                                                    placeholder="شناسه ملی شرکت"
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className='input-item-wrapper'>
                                                                <Input
                                                                    label="شماره تماس"
                                                                    icon={faPhone}
                                                                    placeholder="شماره تماس شرکت"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="signin-basic-info-wrapper margin-buttom">
                                                            <div className='input-item-wrapper'>
                                                                <Input
                                                                    label={"ادرس"}
                                                                    icon={faLocationDot}
                                                                    placeholder="ادرس شرکت"
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className='input-item-wrapper'>
                                                                <Input
                                                                    label="کدپستی"
                                                                    icon={faHashtag}
                                                                    placeholder="کدپستی شرکت"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="signin-basic-info-wrapper margin-buttom">
                                                            <div className='input-item-wrapper2'>
                                                                <InputUpload
                                                                    label={"تصویر اساسنامه شرکت"}
                                                                    name="Company Articles of Association"
                                                                    onFileChange={handleFileChange}
                                                                />
                                                            </div>
                                                            <div className='input-item-wrapper2'>
                                                                <InputUpload
                                                                    label={"تصویر آخرین آگهی تغییرات"}
                                                                    name="The latest advertisement of changes"
                                                                    onFileChange={handleFileChange}
                                                                />
                                                            </div>
                                                            <div className='input-item-wrapper2'>
                                                                <InputUpload
                                                                    label={"تصویر لوگو شرکت"}
                                                                    name="Company logo image"
                                                                    onFileChange={handleFileChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="signin-btn-wrapper">
                                                <Button1 />
                                            </div>
                                        </form>
                                    )}

                                </Formik>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}
