import React, { useEffect, useState } from 'react'
import './Login.css'
import { Col } from 'react-bootstrap'
import { Formik } from 'formik'
import Button1 from '../../Components/Modules/Button1/Button1'
import Input from '../../Components/Modules/Input/Input'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { IP } from '../../App'
import TypeActivity from './TypeActivity/TypeActivity'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [isShowActivityForm, setIsShowActivityForm] = useState(localStorage.getItem("level"))

    return (
        <>{
            isShowActivityForm === "one" ?
                <TypeActivity /> :
                <div className="loginpage">
                    <div className="back-wrapper">
                        <Col xs={12} lg={7} xl={8} className='empty-space-login'></Col>
                        <Col xs={12} lg={5} xl={4} className='background-signUp'></Col>
                    </div>
                    <div className="form-container">
                        <div className='form-hold'>
                            <p className="Signin-title p-signin">ورود</p>
                            <Formik
                                validate={(values) => {
                                    const errors = {};
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    const phoneRegex = /^\d{10,15}$/;

                                    if (!values.login_field) {
                                        errors.login_field = "وارد کردن ایمیل یا شماره تلفن اجباری میباشد";
                                    } else if (!emailRegex.test(values.login_field) && !phoneRegex.test(values.login_field)) {
                                        errors.login_field = "ایمیل یا شماره تلفن معتبر نیست";
                                    }

                                    if (!values.password) {
                                        errors.password = "وارد کردن رمز عبور اجباری میباشد";
                                    }
                                    return errors;
                                }}

                                initialValues={{
                                    login_field: "",
                                    password: "",

                                }}

                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        const response = await axios.post(`${IP}/user/login/`, values)
                                        if (response.status === 200) {
                                            setSubmitting(false)
                                            localStorage.setItem("access", response.data.access)
                                            localStorage.setItem("refresh", response.data.refresh)
                                            localStorage.setItem("level", response?.data?.level)
                                            if (response?.data?.level !== "one") {
                                                navigate("/")
                                            } else {
                                                setIsShowActivityForm("one")
                                            }
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
                                    <form className="form-wrapper p-signin" onSubmit={handleSubmit}>
                                        <div className="form-content-login">
                                            <p className="signin-text">اطلاعات حساب کاربری خود را وارد کنید</p>
                                            <div>
                                                <Input
                                                    name="login_field"
                                                    label="ایمیل / شماره تماس"
                                                    icon={faUser}
                                                    placeholder="ایمیل / شماره تماس"
                                                    type="text"
                                                    value={values.login_field}
                                                    onChange={handleChange}
                                                />
                                                {errors.login_field && touched.login_field && <span className='error'>{errors.login_field}</span>}
                                            </div>
                                            <div>
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
                                        <div className="signin-btn-wrapper">
                                            <Button1 type="submit" isSubmitting={isSubmitting} />
                                        </div>
                                        <p className='text-tosignup'>حساب کاربری ندارید؟ <Link to={'/signup'} className='link-to-signup'>ثبت نام </Link>کنید</p>

                                    </form>
                                )}
                            </Formik>

                        </div>
                    </div>
                    <ToastContainer />
                </div>
        }

        </>
    )
}




// token/refresh