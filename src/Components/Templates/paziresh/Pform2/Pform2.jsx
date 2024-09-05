import React, { useEffect, useState } from 'react'
import './Pform2.css'
import Input from '../../../Modules/Input/Input'
import EditBtn from '../../../Modules/EditBtn/EditBtn'
import ConfirmBtn from '../../../Modules/ConfirmBtn/ConfirmBtn'
import { Col } from 'react-bootstrap'
import CodeCar from '../../../Modules/codeCar/CodeCar'
import InputRadio from '../../../Modules/InputRadio/InputRadio'
import ClearProgress from '../../../Modules/ClearProgress/ClearProgress'
import InputUpload from '../../../Modules/InputUpload/InputUpload'
import { faHashtag, faGauge, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import SelectDropDown from '../../../Modules/SelectDropDown/SelectDropDown'
import MapCar from '../../../Modules/MapCar/MapCar'
import CarModal from '../../../Modules/CarModal/CarModal'
import DropDown from '../../../Modules/DropDown/DropDown'
import PartMachine from './PartMachine/PartMachine'
import InputCheckBox from '../../../Modules/InputChekBox/InputCheckBox'
import { useContext } from 'react'
import { MyContext } from '../../../../context/context'
export default function Pform2({ formData, updateFormData, nextTab, prevTab }) {

    const [otherCar, setotherCar] = useState(false)
    const [otherColor, setotherColor] = useState(false)
    const { isOpen } = useContext(MyContext)
    const [localData, setLocalData] = useState(formData);

    useEffect(() => {
        updateFormData(localData);
    }, [localData]);

    const handleChange = (e) => {
        setLocalData({
            ...localData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextTab();
    };



    return (
        <>
            <CarModal />
            <div className={`form2-container ${isOpen ? "wide" : ""}`}>
                <form onSubmit={handleSubmit}>
                    <div className='p-form2-content'>
                        <div className='p-form2-row'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"نوع خودرو"}
                                    items={["item1", "item2", "item3", "item4", "item5"]}
                                    name="car_type"
                                    selectdrop="cartype"
                                    setother={setotherCar}
                                />
                            </Col>
                            {
                                otherCar &&
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="car_type"
                                        value={""}
                                        onChange={""}
                                    />
                                </Col>
                            }

                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="شماره شاسی"
                                    styled={"widthinput"}
                                    placeholder="شماره شاسی"
                                    icon={faHashtag}
                                    name="chassis_number"
                                    value={""}
                                    onChange={""}
                                />
                            </Col>
                        </div>
                        <div className='p-form2-row mt-md-4'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"رنگ"}
                                    items={["red", "blue", "green", "yellow", "black"]}
                                    name="color"
                                    setother={setotherColor}
                                />
                            </Col>
                            {
                                otherColor &&
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="color"
                                        value={""}
                                        onChange={""}
                                    />
                                </Col>
                            }
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="کارکرد خودرو"
                                    styled={"widthinput"}
                                    placeholder="Km"
                                    icon={faGauge}
                                    name="car_operation"
                                    value={""}
                                    onChange={""}
                                />
                            </Col>
                        </div>
                        <div className='p-form2-row2'>
                            <Col xs={12} lg={5}>
                                <CodeCar
                                    name="number_plates"
                                    value={""}
                                />
                            </Col>
                            <Col className='mt-4 mt-lg-0' xs={12} lg={7}>
                                <div className='amount-wrapper'>
                                    <div className="amount-fuel-wrapper my-4">
                                        <span className='amount-fuel-text title-item-form'>میزان سوخت</span>
                                        <div className='amount-fuel-content'>
                                            <span className='f-text'>F</span>
                                            <div className='radio-fuel-wrapper'>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="100%"
                                                        marginRight={"input-amount"}
                                                        value={100}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="75%"
                                                        marginRight={"input-amount"}
                                                        value={75}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item' >
                                                    <InputRadio
                                                        text="50%"
                                                        marginRight={"input-amount"}
                                                        value={50}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item' >
                                                    <InputRadio
                                                        text="25%"
                                                        marginRight={"input-amount"}
                                                        value={25}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                            </div>

                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    <div className="amount-cng-wrapper my-4">
                                        <span className='amount-cng-text title-item-form'>میزان CNG</span>
                                        <div className='amount-cng-content'>
                                            <span className='f-text'>F</span>
                                            <div className='radio-fuel-wrapper'>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="100%"
                                                        marginRight={"input-amount"}
                                                        value={100}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="75%"
                                                        marginRight={"input-amount"}
                                                        value={75}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="50%"
                                                        marginRight={"input-amount"}
                                                        value={50}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                                <div className='radio-fuel-item'>
                                                    <InputRadio
                                                        text="25%"
                                                        marginRight={"input-amount"}
                                                        value={25}
                                                        onChange={""}
                                                        checked={""}
                                                    />
                                                </div>
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row3'>
                            <Col xs={12} md={7} lg={5}>
                                <div className='tire-wear-wrapper'>
                                    <span className='title-item-form'>میزان فرسایش لاستیک ها</span>
                                    <div className="tire-wear-content">
                                        <InputRadio
                                            text="90%"
                                            marginRight={"input-erosion"}
                                            value={90}
                                            onChange={""}
                                            checked={""}

                                        />
                                        <InputRadio
                                            text="70%"
                                            marginRight={"input-erosion"}
                                            value={70}
                                            onChange={""}
                                            checked={""}

                                        />
                                        <InputRadio
                                            text="50%"
                                            marginRight={"input-erosion"}
                                            value={50}
                                            onChange={""}
                                            checked={""}
                                        />
                                        <InputRadio
                                            text="30%"
                                            marginRight={"input-erosion"}
                                            value={30}
                                            onChange={""}
                                            checked={""}
                                        />
                                        <InputRadio
                                            text="10%"
                                            marginRight={"input-erosion"}
                                            value={10}
                                            onChange={""}
                                            checked={""}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={5} lg={7}>
                                <div className='numbers-tire'>
                                    <Input
                                        label={"تعداد لاستیک پنچر"}
                                        styled={"inputtire"}
                                        placeholder="از 0 تا 4"
                                        value={""}
                                        onChange={""}
                                        name="number_punctured_tires"
                                    />
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row4'>
                            <div className="spare-tire-wrapper">
                                <p className='spare-tire-text title-item-form'>وضعیت لاستیک زاپاس</p>
                                <div className="spare-tire-content">
                                    <InputRadio
                                        text="دارد"
                                        marginRight={"input-spare"}
                                        value={"yes"}
                                        onChange={""}
                                        checked={""}
                                    />
                                    <InputRadio
                                        text="ندارد"
                                        marginRight={"input-spare"}
                                        value={"no"}
                                        onChange={""}
                                        checked={""}
                                    />
                                </div>
                            </div>
                            <div className="erosion-rate-wrappper">
                                <p className="title-item-form">میزان فرسایش</p>
                                <div className="erosion-rate-content">
                                    <InputRadio
                                        text="90%"
                                        marginRight={"input-erosion"}
                                        value={90}
                                        onChange={""}
                                        checked={""}
                                    />
                                    <InputRadio
                                        text="70%"
                                        marginRight={"input-erosion"}
                                        value={70}
                                        onChange={""}
                                        checked={""}
                                    />
                                    <InputRadio
                                        text="50%"
                                        marginRight={"input-erosion"}
                                        value={50}
                                        onChange={""}
                                        checked={""}
                                    />
                                    <InputRadio
                                        text="30%"
                                        marginRight={"input-erosion"}
                                        value={30}
                                        onChange={""}
                                        checked={""}
                                    />
                                    <InputRadio
                                        text="10%"
                                        marginRight={"input-erosion"}
                                        value={10}
                                        onChange={""}
                                        checked={""}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-form2-row5">
                            <div className="title-item-form">تمیزی خودرو</div>
                            <div className='mx-sm-5'>
                                <ClearProgress
                                    name="car_cleanliness"
                                    value={""}
                                    onChange={""}
                                />
                            </div>
                        </div>

                        <div className="p-form2-row6">
                            <p className='title-item'>وضعیت ظاهری خودرو/بدنه</p>
                            <div className='vehicle-condition-wrapper'>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="front_car"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>جلو ماشین</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="back_car"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>عقب ماشین</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="right_car"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>سمت راست</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="left_car"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>سمت چپ</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>                                        </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="car_km"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>کیلومتر ماشین</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>                                        </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUpload
                                            name="engine_door_open"
                                            onChange={""}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>درب موتور باز</p>
                                            <p className='viewmore'>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>

                        <div className="p-form2-row7">
                            <Col xs={12} lg={4} xl={3}>
                                <div className='map-drop_wrapper'>
                                    <MapCar />
                                    <DropDown
                                        styled={"dropwidth3"}
                                        lable={"انتخاب تیپ خودرو"}
                                        items={["نوع 2", "نوع 1",]}
                                        onChange={""}
                                        name={""}
                                    />
                                </div>
                            </Col>

                            <Col xs={12} lg={8} xl={9} className='part-machine-container'>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='part-machine-item'>
                                    <PartMachine title={"1 سپر جلو"} />
                                </Col>
                            </Col>
                        </div>
                        <div className='p-form2-row8'>
                            <p className='title-item'>متعلقات خودرو</p>
                            <div className='belongings-wrapper'>
                                <Col xs={12} md={6} xl={4} >
                                    <div className='belongings'>
                                        <span className='title-item-form '>متعلقات بدنه</span>
                                        <div className='belongings-item-container belongings1'>
                                            <Col xs={12} sm={6}>
                                                <InputCheckBox value={"رکاب راست وچپ"} />
                                                <InputCheckBox value={"گارد عقب وجلو"} />
                                                <InputCheckBox value={"رینگ اسپرت"} />
                                                <InputCheckBox value={"پروژکتور"} />
                                                <InputCheckBox value={"آنتن"} />
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <InputCheckBox value={"پلاک جلو"} />
                                                <InputCheckBox value={"پلاک عقب"} />
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} xl={5}>
                                    <div className='belongings'>
                                        <span className='title-item-form '>متعلقات داخلی</span>
                                        <div className='belongings-item-container belonging2'>
                                            <Col xs={12} sm={4} md={6}>
                                                <InputCheckBox value={"پخش صوت"} />
                                                <InputCheckBox value={"کفپوش"} />
                                                <InputCheckBox value={"آچار چرخ"} />
                                                <InputCheckBox value={"مثلث خطر"} />
                                                <InputCheckBox value={"چرخ زاپاس"} />
                                            </Col>
                                            <Col xs={12} sm={4} md={6}>
                                                <InputCheckBox value={"دزدگیر"} />
                                                <InputCheckBox value={"فندک"} />
                                                <InputCheckBox value={"قالپاق"} />
                                                <InputCheckBox value={"فلش"} />
                                            </Col>
                                            <Col xs={12} sm={4} md={6}>
                                                <InputCheckBox value={"جاسیگاری"} />
                                                <InputCheckBox value={"جک"} />
                                                <InputCheckBox value={"زه خودرو"} />                                                    </Col>
                                        </div>
                                    </div>
                                </Col >
                                <Col className='mt-4 mt-md-0' xs={12} md={4} xl={3} >
                                    <div className='belongings belongings-input d-flex flex-column'>
                                        <span className='title-item-form '>سایر متعلقات</span>
                                        <input type="text" className='input-belongings' />
                                    </div>
                                </Col>
                            </div>
                            <div className='mt-4 mt-md-5'>
                                <InputCheckBox value={"همه موارد"} />
                            </div>
                        </div>
                        <div className='p-form-actions'>
                            <EditBtn onClick={prevTab} />
                            <ConfirmBtn type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}
