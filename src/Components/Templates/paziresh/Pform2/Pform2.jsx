import { useDebugValue, useEffect, useState } from 'react'
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
import axios from 'axios'

export default function Pform2({ nextTab, prevTab, setContent }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [otherCar, setotherCar] = useState(false)
    const [otherColor, setotherColor] = useState(false)
    const [allCar, setAllCar] = useState([]);
    const [allColor, setAllColor] = useState([]);
    const { isOpen } = useContext(MyContext)
    const [fuelLevel, setFuelLevel] = useState(null);
    const [cngLevel, setCngLevel] = useState(null);
    const [tireWear, setTireWear] = useState(null);
    const [spareTire, setSpareTire] = useState('');
    const [erosionRate, setErosionRate] = useState(null);
    const [opneModal, setOpenModal] = useState(false)
    const [imgImModal, setImgModal] = useState("")
    const [modalText, setModalText] = useState('');
    const [currentTextField, setCurrentTextField] = useState('');
    const [allTips, setAllTips] = useState("")
    const [carParts, setCarPart] = useState([])
    const [machineParts, setMachineParts] = useState([])
    // const [selectAll, setSelectAll] = useState(false);


    const validationSchema = Yup.object({
        tip: Yup.string().required('تیپ خودرو را انتخاب کنید'),
        customer_secend_form: Yup.object({
            material: Yup.string().required('نوع خودرو را وارد کنید'),
            color: Yup.string().required("رنگ را انتخاب کنید"),
            chassis_number: Yup.number()
                .required('شماره شاسی را وارد کنید')
                .typeError("شماره شاسی صحیح نیست"),
            ...(otherCar && {
                other_car: Yup.string().required('لطفاً مقدار "سایر" را وارد کنید'),
            }),
            ...(otherColor && {
                other_color: Yup.string().required('لطفاً مقدار "سایر" را وارد کنید'),
            }),
            car_operation: Yup.number()
                .required('کارکرد خودرو را وارد کنید')
                .typeError('کارکرد خودرو باید عدد باشد'),
            license_plate_number: Yup.string().required('شماره پلاک را وارد کنید'),
            amount_fuel: Yup.number().required('میزان سوخت را انتخاب کنید'),
            amount_cng: Yup.number().required('میزان CNG را انتخاب کنید'),
            tire_wear_rate: Yup.number().required('میزان فرسایش لاستیک ها را انتخاب کنید'),
            number_punctured_tires: Yup.number()
                .min(0, 'تعداد لاستیک پنچر نمی‌تواند کمتر از 0 باشد')
                .max(4, 'تعداد لاستیک پنچر نمی‌تواند بیشتر از 4 باشد')
                .required('تعداد لاستیک پنچر را وارد کنید'),
            condition_spare_tire: Yup.string().required('وضعیت لاستیک زاپاس را انتخاب کنید'),
            erosion_rate: Yup.number().required('میزان فرسایش را انتخاب کنید'),

        }),
    });

    const formik = useFormik({
        initialValues: {
            tip: "",
            customer_secend_form: {
                coustomer: "",
                material: "",
                color: "",
                chassis_number: "",
                car_operation: "",
                license_plate_number: "",
                amount_fuel: "",
                amount_cng: "",
                number_punctured_tires: "",
                tire_wear_rate: "",
                condition_spare_tire: "",
                erosion_rate: "",
                car_cleanliness: 0,
                ...(otherCar && { other_car: '' }),
                ...(otherColor && { other_color: '' }),
                front_car_image: "",
                front_car_text: "",
                behind_car_image: "",
                behind_car_text: "",
                right_side_image: "",
                right_side_text: "",
                left_side_image: "",
                left_side_text: "",
                car_km_image: "",
                car_km_text: "",
                engine_door_open_image: "",
                engine_door_open_text: "",
                other_accessories: ""
            },
            secondpart: {
                fill_form: []
            }
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });


    const handleCodeCarChange = (name, value) => {
        formik.setFieldValue(name, value);
    };

    const handleFuelChange = (event) => {
        const value = event.target.value;
        setFuelLevel(value);
        formik.setFieldValue('customer_secend_form.amount_fuel', value);
    };

    const handleCngChange = (event) => {
        const value = event.target.value;
        setCngLevel(value);
        formik.setFieldValue('customer_secend_form.amount_cng', value);
    };

    const handleTireWearChange = (event) => {
        const value = event.target.value;
        setTireWear(value);
        formik.setFieldValue('customer_secend_form.tire_wear_rate', value);
    };

    const handleSpareTireChange = (event) => {
        const value = event.target.value;
        console.log(value)
        setSpareTire(value);
        formik.setFieldValue('customer_secend_form.condition_spare_tire', value);
    };

    const handleErosionRateChange = (event) => {
        const value = event.target.value;
        setErosionRate(value);
        formik.setFieldValue('customer_secend_form.erosion_rate', value);
    };

    const handleOpenModal = (imageField, text_field) => {
        const imageValue = formik.values.customer_secend_form[imageField];
        const textValue = formik.values.customer_secend_form[text_field];
        setImgModal(imageValue);
        setModalText(textValue)
        setCurrentTextField(text_field)
        setOpenModal(true);
    };

    const handleSaveText = () => {
        formik.setFieldValue(`customer_secend_form.${currentTextField}`, modalText);
        setOpenModal(false);
        setModalText("")
    };

    const selectPart = (number) => {
        const mainpart = carParts.find(part => part.value_number == number);
        if (mainpart) {
            const updatedParts = machineParts;
            const isAlreadySelected = updatedParts.some(part => part.value_number == mainpart.value_number);
            const newParts = isAlreadySelected
                ? updatedParts.filter(part => part.value_number !== mainpart.value_number)
                : [...updatedParts, mainpart];

            setMachineParts(newParts)
            const updatedFillForm = formik.values.secondpart.fill_form;

            if (isAlreadySelected) {
                console.log(number)
                const newFillForm = updatedFillForm.filter(item => Number(item.value_number) !== number);
                console.log(newFillForm)
                formik.setFieldValue('secondpart.fill_form', newFillForm);
            }
        }
    };

    const handleCheckboxChange = (belongingId, isChecked, valuenumber) => {
        const updatedForm = formik.values.secondpart.fill_form;

        if (isChecked) {
            updatedForm.push({ parts: belongingId, description: '', value_number: valuenumber });
        } else {

            const index = updatedForm.findIndex(item => item.parts === belongingId);
            if (index !== -1) {
                updatedForm.splice(index, 1);
            }
        }

        formik.setFieldValue('secondpart.fill_form', updatedForm);

    };

    const handleDescriptionChange = (belongingId, newDescription) => {
        const updatedForm = formik.values.secondpart.fill_form.map(item => {
            if (item.parts === belongingId) {
                return { ...item, description: newDescription };
            }
            return item;
        });

        formik.setFieldValue('secondpart.fill_form', updatedForm);
    };


    ////////

    // const chnageCheckboxInteriorAccessories = (value) => {
    //     const currentAccessories = formik.values.Car_accessories.Interior_accessories;
    //     if (currentAccessories.includes(value)) {
    //         formik.setFieldValue('Car_accessories.Interior_accessories', currentAccessories.filter(item => item !== value));
    //     } else {
    //         formik.setFieldValue('Car_accessories.Interior_accessories', [...currentAccessories, value]);
    //     }
    // };

    // const handleSelectAll = () => {
    //     const bodyItems = [
    //         "رکاب راست وچپ",
    //         "گارد عقب وجلو",
    //         "رینگ اسپرت",
    //         "پروژکتور",
    //         "آنتن",
    //         "پلاک جلو",
    //         "پلاک عقب"
    //     ];

    //     const interiorItems = [
    //         "پخش صوت",
    //         "کفپوش",
    //         "آچار چرخ",
    //         "مثلث خطر",
    //         "چرخ زاپاس",
    //         "جاسیگاری",
    //         "دزدگیر",
    //         "فندک",
    //         "قالپاق",
    //         "فلش",
    //         "جک",
    //         "زه خودرو"
    //     ];

    //     if (!selectAll) {
    //         // Check all checkboxes
    //         formik.setFieldValue('Car_accessories.Body_accessories', bodyItems);
    //         formik.setFieldValue('Car_accessories.Interior_accessories', interiorItems);
    //     } else {
    //         // Uncheck all checkboxes
    //         formik.setFieldValue('Car_accessories.Body_accessories', []);
    //         formik.setFieldValue('Car_accessories.Interior_accessories', []);
    //     }

    //     // Toggle the state of selectAll
    //     setSelectAll(!selectAll);
    // };



    useEffect(() => {
        const getMaterial = async () => {
            try {
                const res = await axios.get(`${apiUrl}/app/materials/`)
                if (res.status === 200) {
                    setAllCar(res.data[0].values)
                    setAllColor(res.data[1].values)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getAccessories = async () => {
            try {
                const res = await axios.get(`${apiUrl}/app//`)
                if (res.status === 200) {
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMaterial()
        // getAccessories()
        setContent("اطلاعات اولیه خودرو :")
    }, [])


    useEffect(() => {
        if (allTips?.car_tips?.length > 0) {
            setCarPart(allTips.car_tips[0].body_condition);
        }
    }, [allTips]);


    const transformedCarTips = allTips?.car_tips?.map(item => ({
        value: item.car_tip_id,
        name: item.car_tip
    }));

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
                                    items={allCar}
                                    name="customer_secend_form.material"
                                    setother={setotherCar}
                                    formik={formik}
                                    chnageType={true}
                                    setAllTips={setAllTips}
                                />
                                {formik.errors.customer_secend_form?.material && formik.touched.customer_secend_form?.material && (
                                    <span className='error'>{formik.errors.customer_secend_form.material}</span>
                                )}
                            </Col>
                            {otherCar && (
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="customer_secend_form.other_car"
                                        value={formik.values.customer_secend_form.other_car}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.customer_secend_form?.other_car && formik.touched.customer_secend_form?.other_car && (
                                        <span className='error'>{formik.errors.customer_secend_form.other_car}</span>
                                    )}

                                </Col>
                            )}
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="شماره شاسی"
                                    styled={"widthinput"}
                                    placeholder="شماره شاسی"
                                    icon={faHashtag}
                                    name="customer_secend_form.chassis_number"
                                    value={formik.values.customer_secend_form.chassis_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.customer_secend_form?.chassis_number && formik.touched.customer_secend_form?.chassis_number && (
                                    <span className='error'>{formik.errors.customer_secend_form.chassis_number}</span>
                                )}
                            </Col>
                        </div>
                        <div className='p-form2-row mt-md-4'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"رنگ"}
                                    items={allColor}
                                    name="customer_secend_form.color"
                                    setother={setotherColor}
                                    formik={formik}
                                />
                                {formik.errors.customer_secend_form?.color && formik.touched.customer_secend_form?.color && (
                                    <span className='error'>{formik.errors.customer_secend_form.color}</span>
                                )}

                            </Col>
                            {
                                otherColor &&
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="customer_secend_form.other_color"
                                        value={formik.values.customer_secend_form.other_color}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.customer_secend_form?.other_color && formik.touched.customer_secend_form?.other_color && (
                                        <span className='error'>{formik.errors.customer_secend_form.other_color}</span>
                                    )}


                                </Col>
                            }
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="کارکرد خودرو"
                                    styled={"widthinput"}
                                    placeholder="Km"
                                    icon={faGauge}
                                    name="customer_secend_form.car_operation"
                                    value={formik.values.customer_secend_form.car_operation || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.customer_secend_form?.car_operation && formik.errors.customer_secend_form?.car_operation && (
                                    <span className='error'>{formik.errors.customer_secend_form.car_operation}</span>
                                )}

                            </Col>

                        </div>
                        <div className='p-form2-row2'>
                            <Col xs={12} lg={5}>
                                <CodeCar
                                    name="customer_secend_form.license_plate_number"
                                    value={formik.values.customer_secend_form.license_plate_number}
                                    onChange={handleCodeCarChange}
                                />
                                {formik.touched.customer_secend_form?.license_plate_number && formik.errors.customer_secend_form?.license_plate_number && (
                                    <span className='error'>{formik.errors.customer_secend_form.license_plate_number}</span>
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
                                                            checked={fuelLevel == value}
                                                            onChange={handleFuelChange}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {formik.touched.customer_secend_form?.amount_fuel && formik.errors.customer_secend_form?.amount_fuel && (
                                        <span className='error'>{formik.errors.customer_secend_form.amount_fuel}</span>
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
                                                            checked={cngLevel == value}
                                                            onChange={handleCngChange}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {formik.touched.customer_secend_form?.amount_cng && formik.errors.customer_secend_form?.amount_cng && (
                                        <span className='error'>{formik.errors.customer_secend_form.amount_cng}</span>
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
                                                checked={tireWear == value}
                                                onChange={handleTireWearChange}
                                                marginRight={"input-erosion"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {formik.touched.customer_secend_form?.tire_wear_rate && formik.errors.customer_secend_form?.tire_wear_rate && (
                                    <span className='error'>{formik.errors.customer_secend_form.tire_wear_rate}</span>
                                )}

                            </Col>
                            <Col xs={12} md={5} lg={7}>
                                <div className='numbers-tire'>
                                    <Input
                                        label={"تعداد لاستیک پنچر"}
                                        styled={"inputtire"}
                                        placeholder="از 0 تا 4"
                                        name="customer_secend_form.number_punctured_tires"
                                        value={formik.values.customer_secend_form.number_punctured_tires || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.customer_secend_form?.number_punctured_tires && formik.errors.customer_secend_form?.number_punctured_tires && (
                                        <span className='error'>{formik.errors.customer_secend_form.number_punctured_tires}</span>
                                    )}

                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row4'>
                            <div className="spare-tire-wrapper">
                                <p className='spare-tire-text title-item-form'>وضعیت لاستیک زاپاس</p>
                                <div className="spare-tire-content">
                                    {['true', 'false'].map(value => (
                                        <InputRadio
                                            key={value}
                                            text={value == 'true' ? 'دارد' : 'ندارد'}
                                            value={value}
                                            checked={spareTire == value}
                                            onChange={handleSpareTireChange}
                                            marginRight={"input-spare"}
                                        />
                                    ))}
                                </div>
                                {formik.touched.customer_secend_form?.condition_spare_tire && formik.errors.customer_secend_form?.condition_spare_tire && (
                                    <span className='error'>{formik.errors.customer_secend_form.condition_spare_tire}</span>
                                )}

                            </div>
                            {
                                spareTire === "true" &&
                                <div className="erosion-rate-wrappper">
                                    <p className="title-item-form">میزان فرسایش</p>
                                    <div className="erosion-rate-content">
                                        {[90, 70, 50, 30, 10].map(value => (
                                            <InputRadio
                                                key={value}
                                                text={`${value}%`}
                                                value={value}
                                                checked={erosionRate == value}
                                                onChange={handleErosionRateChange}
                                                marginRight={"input-erosion"}
                                            />
                                        ))}
                                    </div>
                                    {formik.touched.customer_secend_form?.erosion_rate && formik.errors.customer_secend_form?.erosion_rate && (
                                        <span className='error'>{formik.errors.customer_secend_form.erosion_rate}</span>
                                    )}
                                </div>
                            }

                        </div>
                        <div className="p-form2-row5">
                            <div className="title-item-form">تمیزی خودرو</div>
                            <div className='mx-sm-5'>
                                <ClearProgress
                                    name="customer_secend_form.car_cleanliness"
                                    value={formik.values.customer_secend_form.car_cleanliness}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="p-form2-row6">
                            <p className='title-item'>وضعیت ظاهری خودرو/بدنه</p>
                            <div className='vehicle-condition-wrapper'>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.front_car_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>جلو ماشین</p>
                                            <p className='viewmore'
                                                onClick={() => handleOpenModal('front_car_image', `front_car_text`)}>
                                                دیدن بیشتر
                                            </p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.front_car_text}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.behind_car_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>
                                                عقب ماشین
                                            </p>
                                            <p className='viewmore'
                                                onClick={() => handleOpenModal('behind_car_image', 'behind_car_text')}>
                                                دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.behind_car_text}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.right_side_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>
                                                سمت راست
                                            </p>
                                            <p className='viewmore' onClick={() => handleOpenModal('right_side_image', 'right_side_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.right_side_text}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.left_side_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>
                                                سمت چپ
                                            </p>
                                            <p className='viewmore' onClick={() => handleOpenModal('left_side_image', 'left_side_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.left_side_text}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.car_km_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>
                                                کیلومتر ماشین
                                            </p>
                                            <p className='viewmore' onClick={() => handleOpenModal('car_km_image', 'car_km_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.car_km_text}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name={`customer_secend_form.engine_door_open_image`}
                                            setImgModal={setImgModal}
                                            formik={formik}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>
                                                درب موتور باز
                                            </p>
                                            <p className='viewmore' onClick={() => handleOpenModal('engine_door_open_image', 'engine_door_open_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{formik.values.customer_secend_form.engine_door_open_text}</p>
                                </Col>
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
                                        items={transformedCarTips}
                                        name="tip"
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.tip && formik.touched.tip && (
                                        <span className='error'>{formik.errors.tip}</span>
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} lg={8} xl={9} className='part-machine-container'>
                                {machineParts.length > 0 && machineParts.map(part => (
                                    <Col xs={12} sm={6} lg={4} className='part-machine-item' key={part.id}>
                                        <PartMachine
                                            part={part}
                                            onCheckboxChange={handleCheckboxChange}
                                            onDescriptionChange={handleDescriptionChange}
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





// متعلقات خودرو//
{/* <div className='p-form2-row8'>
                            <p className='title-item'>متعلقات خودرو</p>
                            <div className='belongings-wrapper'>
                                <Col xs={12} md={6} xl={4} >
                                    <div className='belongings'>
                                        <span className='title-item-form '>متعلقات بدنه</span>
                                        <div className='belongings-item-container belongings1'>
                                            <Col xs={12} sm={6}>
                                                {
                                                    ["رکاب راست وچپ",
                                                        "گارد عقب وجلو",
                                                        "رینگ اسپرت",
                                                        "پروژکتور",
                                                        "آنتن",
                                                        "پلاک جلو",
                                                        "پلاک عقب"].map(item => (
                                                            <InputCheckBox
                                                                key={item}
                                                                value={item}
                                                                onChange={() => chnageCheckboxBodyAccessories(item)}
                                                            
                                                            />
                                                        ))
                                                }
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} xl={5}>
                                    <div className='belongings'>
                                        <span className='title-item-form '>متعلقات داخلی</span>
                                        <div className='belongings-item-container belonging2'>
                                            <Col xs={12} sm={4} md={6}>
                                                {
                                                    [
                                                        "پخش صوت",
                                                        "کفپوش",
                                                        "آچار چرخ",
                                                        "مثلث خطر",
                                                        "چرخ زاپاس",
                                                        "جاسیگاری",
                                                        "دزدگیر",
                                                        "فندک",
                                                        "قالپاق",
                                                        "فلش",
                                                        "جک",
                                                        "زه خودرو"
                                                    ].map(item => (
                                                        <InputCheckBox
                                                            key={item}
                                                            value={item}
                                                            onChange={() => chnageCheckboxInteriorAccessories(item)}
                                                        // checked={formik.values.Car_accessories.Interior_accessories.includes(item)}
                                                        />
                                                    ))
                                                }
                                            </Col>
                                        </div>
                                    </div>
                                </Col >
                                <Col className='mt-4 mt-md-0' xs={12} md={4} xl={3} >
                                    <div className='belongings belongings-input d-flex flex-column'>
                                        <span className='title-item-form '>سایر متعلقات</span>
                                        <input
                                            type="text"
                                            className='input-belongings'
                                            name="customer_secend_form.other_accessories}"
                                            value={formik.values.customer_secend_form.other_accessories}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </Col>
                            </div>
                            <div className='mt-4 mt-md-5'>
                                <InputCheckBox
                                    value={"همه موارد"}
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </div>
                        </div>  */}