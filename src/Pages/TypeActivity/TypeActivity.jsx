import React, { useState } from 'react'
import './TypeActivity.css'
import { useForm } from 'react-hook-form'
import { Col } from 'react-bootstrap'
import Input from '../../Components/Modules/Input/Input'
import Button1 from '../../Components/Modules/Button1/Button1'
import InputUpload from '../../Components/Modules/InputUpload/InputUpload'
import { faPhone, faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputRadio from '../../Components/Modules/InputRadio/InputRadio'
import Input2 from '../../Components/Modules/input2/Input2'

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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    const [value, setValue] = useState(0);
    const [isPermition, setIsPermition] = useState("No")


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
                                <div className="form-content activityheight">
                                    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="signin-basic-info-wrapper margin-buttom">
                                            <div className='input-item-wrapper'>
                                                <Input
                                                    label={"نام"}
                                                    icon={faUser}
                                                    placeholder="نام"
                                                    type="text"
                                                />
                                            </div>
                                            <div className='input-item-wrapper'>
                                                <Input
                                                    label="نام خانوادگی"
                                                    icon={faUser}
                                                    placeholder="نام خانوادگی صاحب فعالیت"
                                                    type="text"
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
                                                />
                                            </div>
                                            <div className='input-item-wrapper'>
                                                <Input
                                                    label="شماره تماس متقاضی"
                                                    icon={faPhone}
                                                    placeholder="شماره تماس متقاضی"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="signin-element-form-wrapper margin-buttom">
                                            <Input
                                                label="آدرس"
                                                icon={faLocationDot}
                                                placeholder="آدرس محل فعالیت"
                                                type="text" />
                                            {/* {errors.email && <span className="error">{errors.email.message}</span>} */}
                                        </div>
                                        <div className="signin-basic-info-wrapper margin-buttom">
                                            <div className='input-item-wrapper'>
                                                <Input
                                                    label="کدپستی"
                                                    icon={faHashtag}
                                                    placeholder="کدپستی محل فعالیت"
                                                    type="text"
                                                />
                                            </div>
                                            <div className='input-item-wrapper'>
                                                <Input
                                                    name="phone"
                                                    label="شماره تماس"
                                                    icon={faPhone}
                                                    placeholder="شماره تماس محل فعالیت"
                                                    type="text"
                                                    {...register('phone', {
                                                        required: true,
                                                        pattern: {
                                                            value: /^[0-9]{10,12}$/i,
                                                            message: "شماره تماس باید شامل 10 تا 12 رقم باشد"
                                                        }
                                                    })} />
                                            </div>
                                        </div>
                                        <div className="signin-basic-info-wrapper margin-buttom">
                                            <div className='input-item-wrapper'>
                                                <InputUpload label={"تصویر جواز کسب"} />
                                            </div>
                                            <div className='input-item-wrapper'>
                                                <InputUpload label={"تصویر کارت"} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="signin-btn-wrapper">
                                    <Button1 onClick={handleSubmit(onSubmit)} />
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="form-content-all-form">
                                    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
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
                                                    </div> :
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
                                                        icon={""}
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
                                                    <InputUpload label={"تصویر اساسنامه شرکت"} />
                                                </div>
                                                <div className='input-item-wrapper2'>
                                                    <InputUpload label={"تصویر آخرین آگهی تغییرات"} />
                                                </div>
                                                <div className='input-item-wrapper2'>
                                                    <InputUpload label={"تصویر لوگو شرکت"} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="signin-btn-wrapper">
                                    <Button1 onClick={handleSubmit(onSubmit)} />
                                </div>
                            </TabPanel>
                        </Box>

                    </div>
                </div>
            </div>
        </div>
    )
}
