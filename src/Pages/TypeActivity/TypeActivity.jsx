import React from 'react'
import './TypeActivity.css'
import { useForm } from 'react-hook-form'
import { Col } from 'react-bootstrap'
import Input from '../../Components/Modules/Input/Input'
import Button1 from '../../Components/Modules/Button1/Button1'
import {
    faUser as faUserRegular,
    faAddressCard

} from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


export default function TypeActivity() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };


    return (
        <div className="signup-page">
            <Col xs={12} lg={7} xl={8} className='empty-space-login'></Col>
            <Col xs={12} lg={5} xl={4} className='background-signUp'></Col>
            <div className="form-container">
                <p className="Signin-title p-signin">نوع فعالیت</p>
                <div className="form-wrapper p-signin">
                    <div className="form-content">
                        <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                            <div className="signin-basic-info-wrapper margin-buttom">
                                <div className='input-item-wrapper'>
                                    <Input
                                        label={"نام"}
                                        icon={faUserRegular}
                                        placeholder="نام"
                                        type="text"
                                    />
                                </div>
                                <div className='input-item-wrapper'>
                                    <Input
                                        label="نام خانوادگی"
                                        icon={faUserRegular}
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
                            <div className="signin-email-wrapper margin-buttom">
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
                        </form>
                    </div>
                    <div className="signin-btn-wrapper">
                        <Button1 onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
