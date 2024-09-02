import React, { useState } from 'react'
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
import { Formik } from 'formik'
import MapCar from '../../../Modules/MapCar/MapCar'
import CarModal from '../../../Modules/CarModal/CarModal'
import DropDown from '../../../Modules/DropDown/DropDown'
import PartMachine from './PartMachine/PartMachine'
import InputCheckBox from '../../../Modules/InputChekBox/InputCheckBox'

export default function Pform2() {

    const [otherCar, setotherCar] = useState(false)
    const [otherColor, setotherColor] = useState(false)

    return (
        <>
            <CarModal />
            <div className='form2-container'>
                <Formik
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}

                    initialValues={{
                        car_type: "",
                        chassis_number: "",
                        color: "",
                        car_operation: "",
                        number_plates: "",
                        amount_fuel: "",
                        cng_mount: "",
                        tire_wear_rate: "",
                        number_punctured_tires: "",
                        condition_spare_tire: "",
                        erosion_rate: "",
                        car_cleanliness: "",
                        front_car: "",
                        back_car: "",
                        right_car: "",
                        left_car: "",
                        car_km: "",
                        engine_door_open: ""
                    }}

                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values)
                        setSubmitting(false)
                    }}>

                    {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='p-form2-content'>
                                <div className='p-form2-row'>
                                    <Col md={4}>
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
                                        <Col md={4}>
                                            <Input
                                                label="سایر"
                                                styled={"widthinput"}
                                                placeholder="سایر"
                                                name="car_type"
                                                value={values.car_type}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    }

                                    <Col md={4}>
                                        <Input
                                            label="شماره شاسی"
                                            styled={"widthinput"}
                                            placeholder="شماره شاسی"
                                            icon={faHashtag}
                                            name="chassis_number"
                                            value={values.chassis_number}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </div>
                                <div className='p-form2-row  mt-4'>
                                    <Col md={4}>
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
                                        <Col md={4}>
                                            <Input
                                                label="سایر"
                                                styled={"widthinput"}
                                                placeholder="سایر"
                                                name="color"
                                                value={values.color}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    }
                                    <Col md={4}>
                                        <Input
                                            label="کارکرد خودرو"
                                            styled={"widthinput"}
                                            placeholder="Km"
                                            icon={faGauge}
                                            name="car_operation"
                                            value={values.car_operation}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </div>
                                <div className='p-form2-row2'>
                                    <Col md={5}>
                                        <CodeCar
                                            name="number_plates"
                                            value={values.number_plates}
                                        />
                                    </Col>
                                    <Col md={7} >
                                        <div className='amount-wrapper'>
                                            <div className="amount-fuel-wrapper my-4">
                                                <span className='amount-fuel-text title-item-form'>میزان سوخت :</span>
                                                <div className='amount-fuel-content'>
                                                    <span className='f-text'>F</span>
                                                    <InputRadio
                                                        text="100%"
                                                        marginRight={"input-amount"}
                                                        value={100}
                                                        onChange={() => setFieldValue('amount_fuel', 100)}
                                                        checked={values.amount_fuel === 100}
                                                    />
                                                    <InputRadio
                                                        text="75%"
                                                        marginRight={"input-amount"}
                                                        value={75}
                                                        onChange={() => setFieldValue('amount_fuel', 75)}
                                                        checked={values.amount_fuel === 75}
                                                    />
                                                    <InputRadio
                                                        text="50%"
                                                        marginRight={"input-amount"}
                                                        value={50}
                                                        onChange={() => setFieldValue('amount_fuel', 50)}
                                                        checked={values.amount_fuel === 50}
                                                    />
                                                    <InputRadio
                                                        text="25%"
                                                        marginRight={"input-amount"}
                                                        value={25}
                                                        onChange={() => setFieldValue('amount_fuel', 25)}
                                                        checked={values.amount_fuel === 25}
                                                    />
                                                    <span className='f-text'>E</span>
                                                </div>
                                            </div>
                                            <div className="amount-cng-wrapper my-4">
                                                <span className='amount-cng-text title-item-form'>میزان CNG :</span>
                                                <div className='amount-cng-content'>
                                                    <span className='f-text'>F</span>
                                                    <InputRadio
                                                        text="100%"
                                                        marginRight={"input-amount"}
                                                        value={100}
                                                        onChange={() => setFieldValue('cng_mount', 100)}
                                                        checked={values.cng_mount === 100}
                                                    />
                                                    <InputRadio
                                                        text="75%"
                                                        marginRight={"input-amount"}
                                                        value={75}
                                                        onChange={() => setFieldValue('cng_mount', 75)}
                                                        checked={values.cng_mount === 75}
                                                    />
                                                    <InputRadio
                                                        text="50%"
                                                        marginRight={"input-amount"}
                                                        value={50}
                                                        onChange={() => setFieldValue('cng_mount', 50)}
                                                        checked={values.cng_mount === 50}
                                                    />
                                                    <InputRadio
                                                        text="25%"
                                                        marginRight={"input-amount"}
                                                        value={25}
                                                        onChange={() => setFieldValue('cng_mount', 25)}
                                                        checked={values.cng_mount === 25}
                                                    />
                                                    <span className='f-text'>E</span>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                <div className='p-form2-row3'>
                                    <Col md={5}>
                                        <div className='tire-wear-wrapper'>
                                            <span className='title-item-form'>میزان فرسایش لاستیک ها</span>
                                            <div className="tire-wear-content">
                                                <InputRadio
                                                    text="90%"
                                                    marginRight={"input-erosion"}
                                                    value={90}
                                                    onChange={() => setFieldValue('tire_wear_rate', 90)}
                                                    checked={values.tire_wear_rate === 90}

                                                />
                                                <InputRadio
                                                    text="70%"
                                                    marginRight={"input-erosion"}
                                                    value={70}
                                                    onChange={() => setFieldValue('tire_wear_rate', 70)}
                                                    checked={values.tire_wear_rate === 70}

                                                />
                                                <InputRadio
                                                    text="50%"
                                                    marginRight={"input-erosion"}
                                                    value={50}
                                                    onChange={() => setFieldValue('tire_wear_rate', 50)}
                                                    checked={values.tire_wear_rate === 50}
                                                />
                                                <InputRadio
                                                    text="30%"
                                                    marginRight={"input-erosion"}
                                                    value={30}
                                                    onChange={() => setFieldValue('tire_wear_rate', 30)}
                                                    checked={values.tire_wear_rate === 30}
                                                />
                                                <InputRadio
                                                    text="10%"
                                                    marginRight={"input-erosion"}
                                                    value={10}
                                                    onChange={() => setFieldValue('tire_wear_rate', 10)}
                                                    checked={values.tire_wear_rate === 10}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div className='numbers-tire'>
                                            <Input
                                                label={"تعداد لاستیک پنچر"}
                                                styled={"inputtire"}
                                                placeholder="از 0 تا 4"
                                                value={values.number_punctured_tires}
                                                onChange={handleChange}
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
                                                onChange={() => setFieldValue('condition_spare_tire', "yes")}
                                                checked={values.condition_spare_tire === "yes"}
                                            />
                                            <InputRadio
                                                text="ندارد"
                                                marginRight={"input-spare"}
                                                value={"no"}
                                                onChange={() => setFieldValue('condition_spare_tire', "no")}
                                                checked={values.condition_spare_tire === "no"}
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
                                                onChange={() => setFieldValue('erosion_rate', 90)}
                                                checked={values.erosion_rate === 90}
                                            />
                                            <InputRadio
                                                text="70%"
                                                marginRight={"input-erosion"}
                                                value={70}
                                                onChange={() => setFieldValue('erosion_rate', 70)}
                                                checked={values.erosion_rate === 70}
                                            />
                                            <InputRadio
                                                text="50%"
                                                marginRight={"input-erosion"}
                                                value={50}
                                                onChange={() => setFieldValue('erosion_rate', 50)}
                                                checked={values.erosion_rate === 50}
                                            />
                                            <InputRadio
                                                text="30%"
                                                marginRight={"input-erosion"}
                                                value={30}
                                                onChange={() => setFieldValue('erosion_rate', 30)}
                                                checked={values.erosion_rate === 30}
                                            />
                                            <InputRadio
                                                text="10%"
                                                marginRight={"input-erosion"}
                                                value={10}
                                                onChange={() => setFieldValue('erosion_rate', 10)}
                                                checked={values.erosion_rate === 10}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-form2-row5">
                                    <div className="title-item-form">تمیزی خودرو :</div>
                                    <div className='mx-5'>
                                        <ClearProgress
                                            name="car_cleanliness"
                                            value={values.car_cleanliness}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="p-form2-row6">
                                    <p className='title-item'>وضعیت ظاهری خودرو/بدنه</p>
                                    <div className='vehicle-condition-wrapper'>
                                        <Col md={4} className='vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="front_car"
                                                    onChange={(name, file) => setFieldValue(name, file)}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>جلو ماشین</p>
                                                    <p className='viewmore'>دیدن بیشتر</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4} className='vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="back_car"
                                                    onChange={(name, file) => setFieldValue(name, file)}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>عقب ماشین</p>
                                                    <p className='viewmore'>دیدن بیشتر</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4} className='vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="right_car"
                                                    onChange={(name, file) => setFieldValue(name, file)}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>سمت راست</p>
                                                    <p className='viewmore'>دیدن بیشتر</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4} className='mt-4 vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="left_car"
                                                    onChange={(name, file) => setFieldValue(name, file)}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>سمت چپ</p>
                                                    <p className='viewmore'>دیدن بیشتر</p>
                                                </div>                                        </div>
                                        </Col>
                                        <Col md={4} className='mt-4 vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="car_km"
                                                    onChange={(name, file) => setFieldValue(name, file)}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>کیلومتر ماشین</p>
                                                    <p className='viewmore'>دیدن بیشتر</p>
                                                </div>                                        </div>
                                        </Col>
                                        <Col md={4} className='mt-4 vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUpload
                                                    name="engine_door_open"
                                                    onChange={(name, file) => setFieldValue(name, file)}
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
                                    <Col md={3}>
                                        <div className='map-drop_wrapper'>
                                            <MapCar />
                                            <div className='mt-4'>
                                                <DropDown
                                                    lable={"انتخاب تیپ خودرو"}
                                                    items={["نوع 2", "نوع 1",]}
                                                    onChange={""}
                                                    name={""}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={9} className='part-machine-container'>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                        <Col md={4} className='part-machine-item'>
                                            <PartMachine title={"1 سپر جلو"} />
                                        </Col>
                                    </Col>
                                </div>
                                <div className='p-form2-row8'>
                                    <p className='title-item'>متعلقات خودرو</p>
                                    <div className='belongings-wrapper'>
                                        <Col md={4} >
                                            <div className='belongings'>
                                                <span className='title-item-form '>متعلقات بدنه</span>
                                                <div className='belongings-item-container belongings1'>
                                                    <div>
                                                        <InputCheckBox value={"رکاب راست وچپ"} />
                                                        <InputCheckBox value={"گارد عقب وجلو"} />
                                                        <InputCheckBox value={"رینگ اسپرت"} />
                                                        <InputCheckBox value={"پروژکتور"} />
                                                        <InputCheckBox value={"آنتن"} />
                                                    </div>
                                                    <div>
                                                        <InputCheckBox value={"پلاک جلو"} />
                                                        <InputCheckBox value={"پلاک عقب"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={5}>
                                            <div className='belongings'>
                                                <span className='title-item-form '>متعلقات داخلی</span>
                                                <div className='belongings-item-container belonging2'>
                                                    <div>
                                                        <InputCheckBox value={"پخش صوت"} />
                                                        <InputCheckBox value={"کفپوش"} />
                                                        <InputCheckBox value={"آچار چرخ"} />
                                                        <InputCheckBox value={"مثلث خطر"} />
                                                        <InputCheckBox value={"چرخ زاپاس"} />
                                                    </div>
                                                    <div>
                                                        <InputCheckBox value={"دزدگیر"} />
                                                        <InputCheckBox value={"فندک"} />
                                                        <InputCheckBox value={"قالپاق"} />
                                                        <InputCheckBox value={"فلش"} />
                                                    </div>
                                                    <div>
                                                        <InputCheckBox value={"جاسیگاری"} />
                                                        <InputCheckBox value={"جک"} />
                                                        <InputCheckBox value={"زه خودرو"} />                                                    </div>
                                                </div>
                                            </div>
                                        </Col >
                                        <Col md={3} >
                                            <div className='belongings belongings-input d-flex flex-column'>
                                                <span className='title-item-form '>سایر متعلقات</span>
                                                <input type="text" className='input-belongings' />
                                            </div>
                                        </Col>
                                    </div>
                                    <div className='mt-5'>
                                        <InputCheckBox value={"همه موارد"} />
                                    </div>
                                </div>
                            </div>
                            <div className='p-form-actions'>
                                <EditBtn />
                                <ConfirmBtn type="submit" isSubmitting={isSubmitting} />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>

    )
}
