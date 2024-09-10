import React, { useEffect, useState } from 'react'
import './Pform2.css'
import Input from '../../../Modules/Input/Input'
import EditBtn from '../../../Modules/EditBtn/EditBtn'
import ConfirmBtn from '../../../Modules/ConfirmBtn/ConfirmBtn'
import { Col } from 'react-bootstrap'
import CodeCar from '../../../Modules/codeCar/CodeCar'
import InputRadio from '../../../Modules/InputRadio/InputRadio'
import ClearProgress from '../../../Modules/ClearProgress/ClearProgress'
import InputUloadPform2 from '../../../Modules/InputUpload/InputUloadPform2'
import { faHashtag, faGauge, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import SelectDropDown from '../../../Modules/SelectDropDown/SelectDropDown'
import MapCar from '../../../Modules/MapCar/MapCar'
import CarModal from '../../../Modules/CarModal/CarModal'
import DropDown from '../../../Modules/DropDown/DropDown'
import PartMachine from './PartMachine/PartMachine'
import InputCheckBox from '../../../Modules/InputChekBox/InputCheckBox'
import { useContext } from 'react'
import { MyContext } from '../../../../context/context'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Pform2({ formData, updateFormData, nextTab, prevTab }) {

    const [otherCar, setotherCar] = useState(false)
    const [otherColor, setotherColor] = useState(false)
    const { isOpen } = useContext(MyContext)
    const [localData, setLocalData] = useState(formData);
    const [fuelLevel, setFuelLevel] = useState(null);
    const [cngLevel, setCngLevel] = useState(null);
    const [tireWear, setTireWear] = useState(null);
    const [spareTire, setSpareTire] = useState('');
    const [erosionRate, setErosionRate] = useState(null);
    const [opneModal, setOpenModal] = useState(false)
    const [imgImModal, setImgModal] = useState("")
    const [modalText, setModalText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(null);
    const [machineParts, setMachineParts] = useState([])


    const carParts = [
        {
            number: 1,
            name: "front part",
            belongings: [
                { name: "engine door", description: "" },
                { name: "glass", description: "" },
                { name: "Headlights", description: "" },
                { name: "Front guides", description: "" },
                { name: "fog breaker", description: "" },
            ]
        },
        {
            number: 2,
            name: "back part",
            belongings: [
                { name: "Box door", description: "" },
                { name: "glass", description: "" },
                { name: "Headlights", description: "" },
            ]
        },
        {
            number: 3,
            name: "Left front fender",
            belongings: [
                { name: "spread flowers", description: "" },
            ]
        },
        {
            number: 4,
            name: "right front fender",
            belongings: [
                { name: "spread flowers", description: "" },
            ]
        },
    ]


    const validationSchema = Yup.object({
        car_type: Yup.string().required('نوع خودرو را وارد کنید'),
        color: Yup.string().required("رنگ را انتخاب کنید"),
        chassis_number: Yup.number().required('شماره شاسی را وارد کنید').typeError("شماره شاسی صحیح نیست"),
        ...(otherCar && {
            otherCar: Yup.string().required('لطفاً مقدار "سایر" را وارد کنید'),
        }),
        ...(otherColor && {
            otherColor: Yup.string().required('لطفاً مقدار "سایر" را وارد کنید'),
        }),
        car_operation: Yup.number().required('کارکرد خودرو را وارد کنید').typeError('کارکرد خودرو باید عدد باشد'),
        number_plates: Yup.string().required('شماره پلاک را وارد کنید'),
        fuelLevel: Yup.number().required('میزان سوخت را انتخاب کنید'),
        cngLevel: Yup.number().required('میزان CNG را انتخاب کنید'),
        tireWear: Yup.number().required('میزان فرسایش لاستیک ها را انتخاب کنید'),
        number_punctured_tires: Yup.number()
            .min(0, 'تعداد لاستیک پنچر نمی‌تواند کمتر از 0 باشد')
            .max(4, 'تعداد لاستیک پنچر نمی‌تواند بیشتر از 4 باشد')
            .required('تعداد لاستیک پنچر را وارد کنید'),
        spare_tire: Yup.string().required('وضعیت لاستیک زاپاس را انتخاب کنید'),
        erosion_rate: Yup.number().required('میزان فرسایش را انتخاب کنید'),
        car_image_desc: Yup.array().of(
            Yup.object({
                image: Yup.string().required('تصویر الزامی است'),
                text: Yup.string().required('توضیحات الزامی است')
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            car_type: '',
            color: '',
            chassis_number: '',
            ...(otherCar && { otherCar: '' }),
            ...(otherColor && { otherColor: '' }),
            car_operation: '',
            number_plates: '',
            fuelLevel: '',
            cngLevel: '',
            tireWear: '',
            number_punctured_tires: '',
            spare_tire: '',
            erosion_rate: '',
            car_cleanliness: 0,
            car_image_desc: [
                { part: "front_car", image: "", text: "" },
                { part: "back_car", image: "", text: "" },
                { part: "right_car", image: "", text: "" },
                { part: "left_car", image: "", text: "" },
                { part: "car_km", image: "", text: "" },
                { part: "engine_door_open", image: "", text: "" }
            ],

            car_part: {
                vehicleType: "",
            },
            selectParts: []
        },
        validationSchema,
        onSubmit: (values) => {
            updateFormData(values);
            nextTab();
        },

        validateOnChange: true,
        validateOnBlur: true,
    });


    useEffect(() => {
        formik.setValues(prevValues => ({
            ...prevValues,
            ...(otherCar ? { otherCar: prevValues.otherCar } : {}),
            ...(otherColor ? { otherColor: prevValues.otherColor } : {}),
        }));
        formik.validateForm();
    }, [otherCar, otherColor]);


    const handleCodeCarChange = (name, value) => {
        formik.setFieldValue(name, value);
    };

    const handleFuelChange = (event) => {
        setFuelLevel(Number(event.target.value));
        formik.setFieldValue('fuelLevel', Number(event.target.value));
    };

    const handleCngChange = (event) => {
        setCngLevel(Number(event.target.value));
        formik.setFieldValue('cngLevel', Number(event.target.value));
    };

    const handleTireWearChange = (event) => {
        setTireWear(Number(event.target.value));
        formik.setFieldValue('tireWear', Number(event.target.value));
    };


    const handleSpareTireChange = (event) => {
        const value = event.target.value;
        setSpareTire(value);
        formik.setFieldValue('spare_tire', value);
    };

    const handleErosionRateChange = (event) => {
        const value = Number(event.target.value);
        setErosionRate(value);
        formik.setFieldValue('erosion_rate', value);
    };


    const handleOpenModal = (index) => {
        setCurrentIndex(index);
        setModalText(formik.values.car_image_desc[index].text);
        setOpenModal(true);
    };

    const handleSaveText = () => {
        if (currentIndex !== null) {
            formik.setFieldValue(`car_image_desc[${currentIndex}].text`, modalText);
            setOpenModal(false)
        }
    };

    useEffect(() => {
        updateFormData(localData);
    }, [localData]);


    const selectPart = (number) => {
        const mainpart = carParts.find(part => part.number === number);
        if (mainpart) {
            const updatedParts = machineParts;
            const isAlreadySelected = updatedParts.some(part => part.number === mainpart.number);

            const newParts = isAlreadySelected
                ? updatedParts.filter(part => part.number !== mainpart.number)
                : [...updatedParts, mainpart];

            setMachineParts(newParts)
        }
    };

    const handleCheckBoxChange = (partNumber, belongingName, isChecked) => {
        const updatedSelectParts = [...formik.values.selectParts];
        const existingPartIndex = updatedSelectParts.findIndex(part => part.number === partNumber);

        if (existingPartIndex !== -1) {

            const existingPart = updatedSelectParts[existingPartIndex];
            if (isChecked) {

                existingPart.belongings.push({ name: belongingName, description: "" });
            } else {

                existingPart.belongings = existingPart.belongings.filter(b => b.name !== belongingName);
                if (existingPart.belongings.length === 0) {
                    updatedSelectParts.splice(existingPartIndex, 1);
                }
            }
            updatedSelectParts[existingPartIndex] = existingPart;
        } else if (isChecked) {
            updatedSelectParts.push({
                number: partNumber,
                name: carParts.find(part => part.number === partNumber)?.name || '',
                belongings: [{ name: belongingName, description: "" }]
            });
        }
        const cleanedParts = updatedSelectParts.filter(part => part.belongings.length > 0);
        formik.setFieldValue('selectParts', cleanedParts);
    };

    console.log(formik.values)
    return (
        <>
            <CarModal
                opneModal={opneModal}
                setOpenModal={setOpenModal}
                imgImModal={imgImModal}
                modalText={modalText}
                setModalText={setModalText}
                handleSaveText={handleSaveText}
            />
            <div className={`form2-container ${isOpen ? "wide" : ""}`}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='p-form2-content'>
                        <div className='p-form2-row'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"نوع خودرو"}
                                    items={["item1", "item2", "item3", "item4", "item5", "سایر"]}
                                    name="car_type"
                                    setother={setotherCar}
                                    formik={formik}
                                />
                                {formik.errors.car_type && formik.touched.car_type && (
                                    <span className='error'>{formik.errors.car_type}</span>
                                )}
                            </Col>
                            {
                                otherCar &&
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="otherCar"
                                        value={formik.values.otherCar}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.otherCar && formik.touched.otherCar && (
                                        <span className='error'>{formik.errors.otherCar}</span>
                                    )}
                                </Col>
                            }
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="شماره شاسی"
                                    styled={"widthinput"}
                                    placeholder="شماره شاسی"
                                    icon={faHashtag}
                                    name="chassis_number"
                                    value={formik.values.chassis_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.chassis_number && formik.errors.chassis_number && (
                                    <span className='error'>{formik.errors.chassis_number}</span>
                                )}
                            </Col>
                        </div>
                        <div className='p-form2-row mt-md-4'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"رنگ"}
                                    items={["red", "blue", "green", "yellow", "black", "سایر"]}
                                    name="color"
                                    setother={setotherColor}
                                    formik={formik}
                                />
                                {formik.errors.color && formik.touched.color && (
                                    <span className='error'>{formik.errors.color}</span>
                                )}
                            </Col>
                            {
                                otherColor &&
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="otherColor"
                                        value={formik.values.otherColor}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.otherColor && formik.touched.otherColor && (
                                        <span className='error'>{formik.errors.otherColor}</span>
                                    )}

                                </Col>
                            }
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="کارکرد خودرو"
                                    styled={"widthinput"}
                                    placeholder="Km"
                                    icon={faGauge}
                                    name="car_operation"
                                    value={formik.values.car_operation || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.car_operation && formik.errors.car_operation && (
                                    <span className='error'>{formik.errors.car_operation}</span>
                                )}
                            </Col>

                        </div>
                        <div className='p-form2-row2'>
                            <Col xs={12} lg={5}>
                                <CodeCar
                                    name="number_plates"
                                    value={formik.values.number_plates}
                                    onChange={handleCodeCarChange}
                                />
                                {formik.errors.number_plates && formik.touched.number_plates && (
                                    <span className='error'>{formik.errors.number_plates}</span>
                                )}
                            </Col>
                            <Col className='mt-4 mt-lg-0' xs={12} lg={7}>
                                <div className='amount-wrapper'>
                                    <div className="amount-fuel-wrapper my-4">
                                        <span className='amount-fuel-text title-item-form'>میزان سوخت</span>
                                        <div className='amount-fuel-content'>
                                            <span className='f-text'>F</span>
                                            <div className='radio-fuel-wrapper'>
                                                {[100, 75, 50, 25].map(value => (
                                                    <div className='radio-fuel-item' key={value}>
                                                        <InputRadio
                                                            text={`${value}%`}
                                                            value={value}
                                                            checked={fuelLevel === value}
                                                            onChange={handleFuelChange}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {formik.errors.fuelLevel && formik.touched.fuelLevel && (
                                        <span className='error'>{formik.errors.fuelLevel}</span>
                                    )}
                                    <div className="amount-cng-wrapper my-4">
                                        <span className='amount-cng-text title-item-form'>میزان CNG</span>
                                        <div className='amount-cng-content'>
                                            <span className='f-text'>F</span>
                                            <div className='radio-fuel-wrapper'>
                                                {[100, 75, 50, 25].map(value => (
                                                    <div className='radio-fuel-item' key={value}>
                                                        <InputRadio
                                                            text={`${value}%`}
                                                            value={value}
                                                            checked={cngLevel === value}
                                                            onChange={handleCngChange}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {formik.errors.cngLevel && formik.touched.cngLevel && (
                                        <span className='error'>{formik.errors.cngLevel}</span>
                                    )}
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row3'>
                            <Col xs={12} md={7} lg={5}>
                                <div className='tire-wear-wrapper'>
                                    <span className='title-item-form'>میزان فرسایش لاستیک ها</span>
                                    <div className="tire-wear-content">
                                        {[90, 70, 50, 30, 10].map(value => (
                                            <InputRadio
                                                key={value}
                                                text={`${value}%`}
                                                value={value}
                                                checked={tireWear === value}
                                                onChange={handleTireWearChange}
                                                marginRight={"input-erosion"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {formik.errors.tireWear && formik.touched.tireWear && (
                                    <span className='error'>{formik.errors.tireWear}</span>
                                )}
                            </Col>
                            <Col xs={12} md={5} lg={7}>
                                <div className='numbers-tire'>
                                    <Input
                                        label={"تعداد لاستیک پنچر"}
                                        styled={"inputtire"}
                                        placeholder="از 0 تا 4"
                                        name="number_punctured_tires"
                                        value={formik.values.number_punctured_tires || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.number_punctured_tires && formik.errors.number_punctured_tires && (
                                        <span className='error'>{formik.errors.number_punctured_tires}</span>
                                    )}
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row4'>
                            <div className="spare-tire-wrapper">
                                <p className='spare-tire-text title-item-form'>وضعیت لاستیک زاپاس</p>
                                <div className="spare-tire-content">
                                    {['yes', 'no'].map(value => (
                                        <InputRadio
                                            key={value}
                                            text={value === 'yes' ? 'دارد' : 'ندارد'}
                                            value={value}
                                            checked={spareTire === value}
                                            onChange={handleSpareTireChange}
                                            marginRight={"input-spare"}
                                        />
                                    ))}
                                </div>
                                {formik.errors.spare_tire && formik.touched.spare_tire && (
                                    <span className='error'>{formik.errors.spare_tire}</span>
                                )}
                            </div>
                            <div className="erosion-rate-wrappper">
                                <p className="title-item-form">میزان فرسایش</p>
                                <div className="erosion-rate-content">
                                    {[90, 70, 50, 30, 10].map(value => (
                                        <InputRadio
                                            key={value}
                                            text={`${value}%`}
                                            value={value}
                                            checked={erosionRate === value}
                                            onChange={handleErosionRateChange}
                                            marginRight={"input-erosion"}
                                        />
                                    ))}
                                </div>
                                {formik.errors.erosion_rate && formik.touched.erosion_rate && (
                                    <span className='error'>{formik.errors.erosion_rate}</span>
                                )}
                            </div>
                        </div>
                        <div className="p-form2-row5">
                            <div className="title-item-form">تمیزی خودرو</div>
                            <div className='mx-sm-5'>
                                <ClearProgress
                                    name="car_cleanliness"
                                    value={formik.values.car_cleanliness}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="p-form2-row6">
                            <p className='title-item'>وضعیت ظاهری خودرو/بدنه</p>
                            <div className='vehicle-condition-wrapper'>
                                {
                                    formik.values.car_image_desc.map((item, index) => (
                                        <Col key={index} xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                            <div className='vehicle-condition-item'>
                                                <InputUloadPform2
                                                    name={`car_image_desc[${index}].image`}
                                                    setImgModal={setImgModal}
                                                    formik={formik}
                                                />
                                                <div className='detail-vehicle-condition-item'>
                                                    <p className='vehicle-item-text'>
                                                        {item.part === "front_car" ?
                                                            "جلو ماشین" :
                                                            item.part === "back_car" ?
                                                                "عقب ماشین" :
                                                                item.part === "right_car" ?
                                                                    "سمت راست" :
                                                                    item.part === "left_car" ?
                                                                        "سمت چپ" :
                                                                        item.part === "car_km" ?
                                                                            "کیلومتر ماشین" :
                                                                            item.part === "engine_door_open" ?
                                                                                "درب موتور باز" :
                                                                                null
                                                        }
                                                    </p>
                                                    <p className='viewmore' onClick={() => handleOpenModal(index)}>دیدن بیشتر</p>
                                                </div>
                                            </div>
                                            <p className='saved-text'>{item.text}</p>
                                        </Col>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="p-form2-row7">
                            <Col xs={12} lg={4} xl={3}>
                                <div className='map-drop_wrapper'>
                                    <MapCar
                                        selectPart={selectPart}
                                        selectParts={machineParts}
                                    />
                                    <DropDown
                                        styled="dropwidth3"
                                        lable="انتخاب تیپ خودرو"
                                        items={["نوع 2", "نوع 1"]}
                                        name="car_part.vehicleType"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.car_part.vehicleType}
                                    />
                                </div>
                            </Col>

                            <Col xs={12} lg={8} xl={9} className='part-machine-container'>
                                {machineParts.length > 0 && machineParts.map(part => (
                                    <Col xs={12} sm={6} lg={4} className='part-machine-item' key={part.number}>
                                        <PartMachine
                                            part={part}
                                            onCheckboxChange={(belongingName, isChecked) => handleCheckBoxChange(part.number, belongingName, isChecked)}
                                        />
                                    </Col>
                                ))}
                            </Col>

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



// {
//     formik.errors.car_image_desc && formik.errors.car_image_desc.map((partError, index) => (
//         <div key={index}>
//             {partError.image && <span className="error">{partError.image}</span>}
//             {partError.text && <span className="error">{partError.text}</span>}
//         </div>
//     ))
// }



{/* <div className='p-form2-row8'>
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
</div>     */}