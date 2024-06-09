import React, { useState } from 'react'
import './SignUp.css'
import { Col } from 'react-bootstrap'
import { faPhone, faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import Input from '../../Components/Modules/Input/Input'
import Button1 from '../../Components/Modules/Button1/Button1'
import { Formik } from 'formik';
import axios from 'axios';
import { IP } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {

    const navigate = useNavigate()

    return (
        <>
            <div className="signup-page">
                {/* backgroundpage */}
                <div className="back-wrapper">
                    <Col xs={12} lg={7} xl={8} className='empty-space-login'></Col>
                    <Col xs={12} lg={5} xl={4} className='background-signUp'></Col>
                </div>
                {/* form */}
                <div className="form-container">
                    <div className='form-hold'>
                        <p className="Signin-title p-signin">ثبت نام</p>
                        <Formik
                            validate={(values) => {
                                const errors = {};
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

                                if (values.email === "") {
                                    errors.email = "وارد کردن ایمیل اجباری میباشد";
                                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                                    errors.email = "ایمیل وارد شده معتبر نیست";
                                }

                                if (values.phone_number === "") {
                                    errors.phone_number = "وارد کردن شماره اجباری میباشد";
                                } else if (!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/.test(values.phone_number)) {
                                    errors.phone_number = "شماره وارد شده معتبر نیست";
                                }
                                if (values.password === "") {
                                    errors.phone_number = "وارد کردن پسورد اجباری میباشد";
                                }
                                return errors;
                            }}

                            initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                phone_number: "",
                                password: ""
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const response = await axios.post(`${IP}/user/signup/`, values)
                                    if (response.status === 201) {
                                        setSubmitting(false)
                                        navigate("/login")
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
                                <form className="form-wrapper p-signin" onSubmit={handleSubmit}>
                                    <div className="form-content">
                                        <p className="signin-text">اطلاعات حساب کاربری خود را وارد کنید</p>
                                        <div className="form-signin">
                                            <div className="signin-basic-info-wrapper margin-buttom">
                                                <div className='input-item-wrapper'>
                                                    <Input
                                                        name="first_name"
                                                        label="نام"
                                                        icon={faUser}
                                                        placeholder="نام"
                                                        type="text"
                                                        value={values.first_name}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.first_name && touched.first_name && <span className='error'>{errors.first_name}</span>}
                                                </div>
                                                <div className='input-item-wrapper'>
                                                    <Input
                                                        name="last_name"
                                                        label="نام خانوادگی"
                                                        icon={faUser}
                                                        placeholder="نام خانوادگی"
                                                        type="text"
                                                        value={values.last_name}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.last_name && touched.last_name && <span className='error'>{errors.last_name}</span>}
                                                </div>
                                            </div>
                                            <div className="signin-element-form-wrapper margin-buttom">
                                                <Input
                                                    name="email"
                                                    label="ایمیل"
                                                    icon={faEnvelope}
                                                    placeholder="ایمیل"
                                                    type="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && touched.email && <span className='error'>{errors.email}</span>}
                                            </div>
                                            <div className="signin-phone-wrapper margin-buttom">
                                                <Input
                                                    name="phone_number"
                                                    label="شماره تماس"
                                                    icon={faPhone}
                                                    placeholder="شماره تماس"
                                                    type="text"
                                                    value={values.phone_number}
                                                    onChange={handleChange}
                                                />
                                                {errors.phone_number && touched.phone_number && <span className='error'>{errors.phone_number}</span>}
                                            </div>
                                            <div className="signin-phone-wrapper margin-buttom">
                                                <Input
                                                    name="password"
                                                    label="رمز عبور"
                                                    icon={faKey}
                                                    placeholder="رمز عبور"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && touched.password && <span className='error'>{errors.password}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="signin-btn-wrapper">
                                        <Button1 type="submit" isSubmitting={isSubmitting} />
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <ToastContainer />
            </div>


        </>
    );
}





