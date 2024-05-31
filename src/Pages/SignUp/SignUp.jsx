import React from 'react'
import './SignUp.css'
import { useForm } from 'react-hook-form'
import { Col } from 'react-bootstrap'
import { faPhone, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Input from '../../Components/Modules/Input/Input'
import Button1 from '../../Components/Modules/Button1/Button1'

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

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
                        <div className="form-wrapper p-signin">
                            <div className="form-content">
                                <p className="signin-text">اطلاعات حساب کاربری خود را وارد کنید</p>
                                <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="signin-basic-info-wrapper margin-buttom">
                                        <div className='input-item-wrapper'>
                                            <Input
                                                name="firstName"
                                                label="نام"
                                                icon={faUser}
                                                placeholder="نام"
                                                type="text"
                                                {...register('firstName', {
                                                    required: true,
                                                    minLength: {
                                                        value: 4,
                                                        message: "اسم حداقل باید 4 کاراکنر باشد"
                                                    },
                                                    maxLength: {
                                                        value: 30,
                                                        message: "نام حداکثر باید 30 کاراکتر باشد"
                                                    }
                                                })}
                                            />
                                            {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                                        </div>

                                        <div className='input-item-wrapper'>
                                            <Input
                                                name="lastName"
                                                label="نام خانوادگی"
                                                icon={faUser}
                                                placeholder="نام خانوادگی"
                                                type="text"
                                                {...register('lastName', {
                                                    required: true,
                                                    minLength: {
                                                        value: 3,
                                                        message: " نام خانوادگی حداقل باید 3 کاراکنر باشد"
                                                    },
                                                    maxLength: {
                                                        value: 40,
                                                        message: "نام خانوادگی حداکثر باید 40 کاراکتر باشد"
                                                    }
                                                })}
                                            />
                                            {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                                        </div>
                                    </div>
                                    <div className="signin-element-form-wrapper margin-buttom">
                                        <Input
                                            name="email"
                                            label="ایمیل"
                                            icon={faEnvelope}
                                            placeholder="ایمیل"
                                            type="email"
                                            {...register('email', {
                                                required: true,
                                                minLength: {
                                                    value: 10,
                                                    message: "ایمیل حداقل باید 3 کاراکنر باشد"
                                                },
                                                maxLength: {
                                                    value: 35,
                                                    message: " ایمیل حداکثر باید 35 کاراکتر باشد"
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                                    message: "ایمیل وارد شده معتبر نمیباشد"
                                                }

                                            })}
                                        />
                                        {errors.email && <span className="error">{errors.email.message}</span>}
                                    </div>
                                    <div className="signin-phone-wrapper margin-buttom">
                                        <Input
                                            name="phone"
                                            label="شماره تماس"
                                            icon={faPhone}
                                            placeholder="شماره تماس"
                                            type="text"
                                            {...register('phone', {
                                                required: true,
                                                pattern: {
                                                    value: /^[0-9]{10,12}$/i,
                                                    message: "شماره تماس باید شامل 10 تا 12 رقم باشد"
                                                }
                                            })}
                                        />
                                        {errors.phone && <span className="error">{errors.phone.message}</span>}
                                    </div>
                                </form>
                            </div>
                            <div className="signin-btn-wrapper">
                                <Button1 onClick={handleSubmit(onSubmit)} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




// useEffect(() => {
//     const registerHandler = () => {
//         const res = signUpLogin.post("", {})
//             .then((res) => console.log(res))
//             .catch((err) => {
//                 console.log(err.message)
//             })
//     }
//     registerHandler()
// }, [])



// const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: ''
// });

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//         ...formData,
//         [name]: value
//     });
// };






