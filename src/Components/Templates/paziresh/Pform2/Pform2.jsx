import { useEffect, useState } from 'react'
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
import axios from 'axios'
import InputCheckBoxAccessories from '../../../Modules/InputChekBox/InputCheckBoxAccessories'
import { validateFields } from '../../../../utils/ValidationForm2'
import { toFarsiNumber, toEnglishNumber } from '../../../../utils/helper'

export default function Pform2({ nextTab, prevTab, setContent, coustomer }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [otherCar, setotherCar] = useState(false)
    const [otherColor, setotherColor] = useState(false)
    const [allCar, setAllCar] = useState([]);
    const [allColor, setAllColor] = useState([]);
    const { isOpen, dataForm, idForm, editMode } = useContext(MyContext)
    const [opneModal, setOpenModal] = useState(false)
    const [imgImModal, setImgModal] = useState("")
    const [modalText, setModalText] = useState('');
    const [currentTextField, setCurrentTextField] = useState('');
    const [allTips, setAllTips] = useState([])
    const [carParts, setCarPart] = useState([])
    const [machineParts, setMachineParts] = useState([])
    const [allAccessories, setAllAccessories] = useState([])
    const [checkAll, setCheckAll] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    const [form2, setForm2] = useState(
        {
            customer_secend_form: {
                customer: editMode ? idForm : coustomer,
                material: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.material : "",
                other_car: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.other_car : "",
                chassis_number: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.chassis_number : "",
                color: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.color : "",
                other_color: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.other_color : "",
                car_operation: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.car_operation : "",
                license_plate_number: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.license_plate_number : "",
                amount_fuel: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.amount_fuel : "",
                amount_cng: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.amount_cng : "",
                tire_wear_rate: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.tire_wear_rate : "",
                number_punctured_tires: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.number_punctured_tires : "",
                condition_spare_tire: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.condition_spare_tire : false,
                erosion_rate: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.erosion_rate : "",
                car_cleanliness: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.car_cleanliness : 0,
                front_car_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.front_car_image : "",
                front_car_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.front_car_text : "",
                behind_car_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.behind_car_image : "",
                behind_car_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.behind_car_text : "",
                right_side_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.right_side_image : "",
                right_side_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.right_side_text : "",
                left_side_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.left_side_image : "",
                left_side_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.left_side_text : "",
                car_km_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.car_km_image : "",
                car_km_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.car_km_text : "",
                engine_door_open_image: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.engine_door_open_image : "",
                engine_door_open_text: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.engine_door_open_text : "",
                other_accessories: editMode && dataForm.customer_form_two ? dataForm.customer_form_two.other_accessories : ""
            },
            fill_form: [],
            accessories: []
        }
    )

    const handleCheckboxChange = (belongingId, isChecked, valuenumber) => {
        console.log("hello")
        setForm2(prevForm => {
            const updatedForm = Array.isArray(prevForm.fill_form) ? [...prevForm.fill_form] : [];

            if (isChecked) {
                const exists = updatedForm.some(item => item.parts === belongingId);
                if (!exists) {
                    updatedForm.push({ parts: belongingId, description: '', value_number: valuenumber });
                }
            } else {
                const index = updatedForm.findIndex(item => item.parts === belongingId);
                if (index !== -1) {
                    updatedForm.splice(index, 1);
                }
            }

            return {
                ...prevForm,
                fill_form: updatedForm
            };
        });
    };

    const handleDescriptionChange = (belongingId, newDescription) => {
        setForm2(prevForm => {
            const updatedForm = prevForm.fill_form.map(item => {
                if (item.parts === belongingId) {
                    return { ...item, description: newDescription };
                }
                return item;
            });

            return {
                ...prevForm,
                fill_form: updatedForm
            };
        });
    };

    const onCheckboxChangeAccessory = (belongingId, isChecked) => {
        setForm2(prevForm => {
            const updatedForm = [...prevForm.accessories];
            const exists = updatedForm.some(item => item.parts === belongingId);

            if (isChecked && !exists) {
                updatedForm.push({ parts: belongingId, description: '' });
            } else if (!isChecked) {
                const index = updatedForm.findIndex(item => item.parts === belongingId);
                if (index !== -1) {
                    updatedForm.splice(index, 1);
                }
            }
            return {
                ...prevForm,
                accessories: updatedForm
            };
        });
    };

    const onDescriptionChangeAccessory = (belongingId, newDescription) => {
        setForm2(prevForm => {
            const updatedForm = prevForm.accessories.map(item => {
                if (item.parts === belongingId) {
                    return { ...item, description: newDescription };
                }
                return item;
            });

            return {
                ...prevForm,
                accessories: updatedForm
            };
        });
    }

    const handleDropdownChange = (name, value) => {
        const mainTip = allTips.filter(item => item.car_tip_id == value)
        setCarPart(mainTip[0]?.body_condition);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const englishValue = toEnglishNumber(value);

        setForm2(prevState => ({
            ...prevState,
            customer_secend_form: {
                ...prevState.customer_secend_form,
                [name]: englishValue,
            },
        }));
    };

    const handleSelectChange = (name, id) => {
        console.log(name, id)
        setForm2(prevState => ({
            ...prevState,
            customer_secend_form: {
                ...prevState.customer_secend_form,
                [name]: id
            }
        }));
    };

    const handleLicensePlateChange = (value) => {
        setForm2((prev) => {
            const updatedForm = {
                ...prev,
                customer_secend_form: {
                    ...prev.customer_secend_form,
                    license_plate_number: value
                }
            };
            return updatedForm;
        });
    };

    const selectPart = (number) => {
        const mainpart = carParts.find(part => part.value_number == number);
        if (mainpart) {
            setMachineParts(prevParts => {
                const isAlreadySelected = prevParts.some(part => part.value_number == mainpart.value_number);
                const newParts = isAlreadySelected
                    ? prevParts.filter(part => part.value_number != mainpart.value_number)
                    : [...prevParts, mainpart];

                setForm2(prevForm => {
                    const updatedFillForm = prevForm.fill_form;
                    if (isAlreadySelected) {
                        const newFillForm = updatedFillForm.filter(item => Number(item.value_number) !== number);
                        return {
                            ...prevForm,
                            fill_form: newFillForm
                        };
                    } else {
                        return {
                            ...prevForm,
                            fill_form: [...updatedFillForm, { parts: mainpart.parts, description: '', value_number: number }]
                        };
                    }
                });

                return newParts;
            });
        }
    };


    const handleOpenModal = (imageField, textField) => {
        const textValue = form2.customer_secend_form[textField];
        const imageValue = form2.customer_secend_form[imageField];
        setModalText(textValue);
        setImgModal(imageValue);
        setCurrentTextField(textField);
        setOpenModal(true);
    };

    const handleSaveText = () => {
        setForm2(prev => ({
            ...prev,
            customer_secend_form: {
                ...prev.customer_secend_form,
                [currentTextField]: modalText
            }
        }));
        setOpenModal(false);
        setModalText("");
    };

    const transformedCarTips = allTips?.map(item => ({
        value: item.car_tip_id,
        name: item.car_tip
    }));

    const handleCheckAll = (isChecked) => {
        setCheckAll(isChecked);
        if (isChecked) {
            const bodyAccessories = allAccessories[0]?.children.map(item => ({ parts: item.id, description: '' })) || [];
            const interiorAccessories = allAccessories[1]?.children.map(item => ({ parts: item.id, description: '' })) || [];

            setForm2(prevForm => ({
                ...prevForm,
                accessories: [...bodyAccessories, ...interiorAccessories]
            }));
        } else {
            setForm2(prevForm => ({
                ...prevForm,
                accessories: []
            }));
        }
    };

    const getAllParts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/app/parts-detail/`);
            if (res.status === 200) {
                setAllTips(res.data.car_tips)
                setAllAccessories(res.data.car_tips[0].car_accessories)
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validateFields(form2, otherCar, otherColor);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        let sanitizedForm = { ...form2 };
        const imageFields = [
            'front_car_image',
            'behind_car_image',
            'right_side_image',
            'left_side_image',
            'car_km_image',
            'engine_door_open_image'
        ];

        imageFields.forEach(field => {
            if (sanitizedForm.customer_secend_form[field]?.startsWith('/media')) {
                delete sanitizedForm.customer_secend_form[field];
            }
        });

        try {
            setLoading(true);
            let response;
            if (editMode && dataForm.customer_form_two.id) {
                response = await axios.put(`${apiUrl}/app/fill-customer-and-parts/${dataForm.customer_form_two.id}`, sanitizedForm);
            } else {
                response = await axios.post(`${apiUrl}/app/fill-customer-and-parts/`, form2);
            }

            if (response.status === 201 || response.status === 200) {
                nextTab();
            }

            setLoading(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        getMaterial()
        getAllParts()
        setContent("اطلاعات اولیه خودرو :")
    }, [])

    useEffect(() => {
        if (dataForm?.customer_form_two?.other_car) {
            setotherCar(true);
        }
        if (dataForm.customer_form_two?.other_color) {
            setotherColor(true);
        }
    }, [dataForm]);


    useEffect(() => {
        if (dataForm?.customer_form_two?.accessories_form) {
            const newFillForm = dataForm.customer_form_two.accessories_form.map(item => ({
                parts: item.parts_id || "",
                description: item.descriptions || "",
            }));
            setForm2(prevForm2 => ({
                ...prevForm2,
                accessories: newFillForm
            }));
        }

        const matchedParts = carParts.filter(part =>
            dataForm?.customer_form_two?.fill_form?.some(item => item.parts_value_number == part.value_number)
        );

        setMachineParts(matchedParts);

        const newFillForm = dataForm?.customer_form_two?.fill_form?.map(item => ({
            parts: item.parts_id || "",
            description: item.descriptions || "",
            value_number: item.parts_value_number || ""
        }));

        setForm2(prevForm2 => ({
            ...prevForm2,
            fill_form: newFillForm
        }));

    }, [dataForm, carParts])

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
                <form onSubmit={handleSubmit}>
                    <div className='p-form2-content'>
                        <div className='p-form2-row'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"نوع خودرو"}
                                    items={allCar}
                                    name="material"
                                    setother={setotherCar}
                                    value={form2.customer_secend_form?.material}
                                    onChange={handleSelectChange}
                                    material={dataForm.customer_form_two?.material}
                                />
                                {errors.material && <span className='error'>{errors.material}</span>}
                            </Col>
                            {otherCar && (
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="other_car"
                                        value={form2.customer_secend_form.other_car}
                                        onChange={handleInputChange}
                                    />
                                    {errors.other_car && <span className='error'>{errors.other_car}</span>}
                                </Col>
                            )}
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="شماره شاسی"
                                    styled={"widthinput"}
                                    placeholder="شماره شاسی"
                                    icon={faHashtag}
                                    name="chassis_number"
                                    value={form2.customer_secend_form.chassis_number}
                                    onChange={handleInputChange}
                                />

                                {errors.chassis_number && <span className='error'>{errors.chassis_number}</span>}
                            </Col>
                        </div>
                        <div className='p-form2-row mt-md-4'>
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <SelectDropDown
                                    icon={faAngleDown}
                                    label={"رنگ"}
                                    items={allColor}
                                    name="color"
                                    setother={setotherColor}
                                    value={form2.customer_secend_form?.color}
                                    onChange={handleSelectChange}
                                    material={dataForm.customer_form_two?.color}
                                />
                                {errors.color && <span className='error'>{errors.color}</span>}
                            </Col>
                            {otherColor && (
                                <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                    <Input
                                        label="سایر"
                                        styled={"widthinput"}
                                        placeholder="سایر"
                                        name="other_color"
                                        value={form2.customer_secend_form.other_color}
                                        onChange={handleInputChange}
                                    />
                                    {errors.other_color && <span className='error'>{errors.other_color}</span>}
                                </Col>
                            )}
                            <Col className='mb-4 mb-md-0' xs={12} md={4}>
                                <Input
                                    label="کارکرد خودرو"
                                    styled={"widthinput"}
                                    placeholder="Km"
                                    icon={faGauge}
                                    name="car_operation"
                                    value={toFarsiNumber(form2.customer_secend_form.car_operation)}
                                    onChange={handleInputChange}
                                />

                                {errors.car_operation && <span className='error'>{errors.car_operation}</span>}
                            </Col>
                        </div>
                        <div className='p-form2-row2'>
                            <Col xs={12} lg={5}>
                                <CodeCar
                                    name="license_plate_number"
                                    value={form2.customer_secend_form.license_plate_number}
                                    setFieldValue={handleLicensePlateChange}
                                />
                                {errors.license_plate_number && <span className='error'>{errors.license_plate_number}</span>}
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
                                                            text={`${toFarsiNumber(value)}%`}
                                                            value={value}
                                                            checked={form2.customer_secend_form.amount_fuel == value}
                                                            onChange={() => setForm2(prev => ({
                                                                ...prev,
                                                                customer_secend_form: {
                                                                    ...prev.customer_secend_form,
                                                                    amount_fuel: value
                                                                }
                                                            }))}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {errors.amount_fuel && <span className='error'>{errors.amount_fuel}</span>}
                                    <div className="amount-cng-wrapper my-4">
                                        <span className='amount-cng-text title-item-form'>میزان CNG</span>
                                        <div className='amount-cng-content'>
                                            <span className='f-text'>F</span>
                                            <div className='radio-fuel-wrapper'>
                                                {[100, 75, 50, 25].map((value) => (
                                                    <div className='radio-fuel-item' key={value}>
                                                        <InputRadio
                                                            text={`${toFarsiNumber(value)}%`}
                                                            value={value}
                                                            checked={form2.customer_secend_form.amount_cng == value}
                                                            onChange={() => setForm2(prev => ({
                                                                ...prev,
                                                                customer_secend_form: {
                                                                    ...prev.customer_secend_form,
                                                                    amount_cng: value
                                                                }
                                                            }))}
                                                            marginRight="input-amount"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className='f-text'>E</span>
                                        </div>
                                    </div>
                                    {errors.amount_cng && <span className='error'>{errors.amount_cng}</span>}
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row3'>
                            <Col xs={12} md={7} lg={5}>
                                <div className='tire-wear-wrapper '>
                                    <span className='title-item-form'>میزان فرسایش لاستیک ها</span>
                                    <div className="tire-wear-content">
                                        {[90, 70, 50, 30, 10].map((value) => (
                                            <InputRadio
                                                key={value}
                                                text={`${toFarsiNumber(value)}%`}
                                                value={value}
                                                checked={form2.customer_secend_form.tire_wear_rate == value}
                                                onChange={() => setForm2(prev => ({
                                                    ...prev,
                                                    customer_secend_form: {
                                                        ...prev.customer_secend_form,
                                                        tire_wear_rate: value
                                                    }
                                                }))}
                                                marginRight={"input-erosion"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {errors.tire_wear_rate && <span className='error'>{errors.tire_wear_rate}</span>}
                            </Col>
                            <Col xs={12} md={5} lg={7}>
                                <div className='numbers-tire'>
                                    <Input
                                        label={"تعداد لاستیک پنچر"}
                                        styled={"inputtire"}
                                        placeholder="از ۰ تا ۴"
                                        name="number_punctured_tires"
                                        value={toFarsiNumber(form2.customer_secend_form.number_punctured_tires)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const englishNumber = toEnglishNumber(value);
                                            handleInputChange(e, englishNumber);
                                        }}
                                    />
                                    {errors.number_punctured_tires && <span className='error'>{errors.number_punctured_tires}</span>}
                                </div>
                            </Col>
                        </div>
                        <div className='p-form2-row4'>
                            <div className="spare-tire-wrapper">
                                <p className='spare-tire-text title-item-form'>وضعیت لاستیک زاپاس</p>
                                <div className="spare-tire-content">
                                    {[true, false].map((value) => (
                                        <InputRadio
                                            key={value}
                                            text={value == true ? 'دارد' : 'ندارد'}
                                            value={value}
                                            checked={form2.customer_secend_form.condition_spare_tire == value}
                                            onChange={() => setForm2(prev => ({
                                                ...prev,
                                                customer_secend_form: {
                                                    ...prev.customer_secend_form,
                                                    condition_spare_tire: value
                                                }
                                            }))}
                                            marginRight={"input-spare"}
                                        />
                                    ))}
                                </div>
                                {errors.condition_spare_tire && <span className='error'>{errors.condition_spare_tire}</span>}
                            </div>
                            <div className="erosion-rate-wrapper">
                                <p className="title-item-form">میزان فرسایش</p>
                                <div className="erosion-rate-content">
                                    {[90, 70, 50, 30, 10].map((value) => (
                                        <InputRadio
                                            key={value}
                                            text={`${toFarsiNumber(value)}%`}
                                            value={value}
                                            checked={form2.customer_secend_form.erosion_rate == value}
                                            onChange={() => setForm2(prev => ({
                                                ...prev,
                                                customer_secend_form: {
                                                    ...prev.customer_secend_form,
                                                    erosion_rate: value
                                                }
                                            }))}
                                            marginRight={"input-erosion"}
                                        />
                                    ))}
                                </div>
                                {errors.erosion_rate && <span className='error'>{errors.erosion_rate}</span>}
                            </div>
                        </div>
                        <div className="p-form2-row5">
                            <div className="title-item-form">تمیزی خودرو</div>
                            <div className='mx-sm-5'>
                                <ClearProgress
                                    name="car_cleanliness"
                                    value={form2.customer_secend_form.car_cleanliness}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="p-form2-row6">
                            <p className='title-item'>وضعیت ظاهری خودرو/بدنه</p>
                            <div className='vehicle-condition-wrapper'>
                                {/* Front car */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="front_car_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.front_car_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>جلو ماشین</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('front_car_image', 'front_car_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.front_car_text}</p>
                                </Col>

                                {/* Behind car */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="behind_car_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.behind_car_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>عقب ماشین</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('behind_car_image', 'behind_car_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.behind_car_text}</p>
                                </Col>

                                {/* Right side */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="right_side_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.right_side_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>سمت راست</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('right_side_image', 'right_side_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.right_side_text}</p>
                                </Col>

                                {/* Left side */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="left_side_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.left_side_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>سمت چپ</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('left_side_image', 'left_side_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.left_side_text}</p>
                                </Col>

                                {/* Car kilometers */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="car_km_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.car_km_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>کیلومتر ماشین</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('car_km_image', 'car_km_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.car_km_text}</p>
                                </Col>

                                {/* Engine door */}
                                <Col xs={12} sm={6} md={4} className='mt-4 vehicle-condition-item-content'>
                                    <div className='vehicle-condition-item'>
                                        <InputUloadPform2
                                            name="engine_door_open_image"
                                            setForm2={setForm2}
                                            src={form2.customer_secend_form.engine_door_open_image}
                                        />
                                        <div className='detail-vehicle-condition-item'>
                                            <p className='vehicle-item-text'>درب موتور باز</p>
                                            <p className='viewmore' onClick={() => handleOpenModal('engine_door_open_image', 'engine_door_open_text')}>دیدن بیشتر</p>
                                        </div>
                                    </div>
                                    <p className='saved-text'>{form2.customer_secend_form.engine_door_open_text}</p>
                                </Col>
                            </div>
                        </div>
                        <div className="p-form2-row7">
                            <Col xs={12} lg={4} xl={3}>
                                <div className='map-drop_wrapper'>
                                    <MapCar
                                        selectPart={selectPart}
                                        selectParts={machineParts}
                                        fillForm={dataForm?.customer_form_two?.fill_form}
                                    />
                                    <DropDown
                                        styled="dropwidth3"
                                        lable="انتخاب تیپ خودرو"
                                        items={transformedCarTips}
                                        name="tip"
                                        onChange={(name, value) => handleDropdownChange(name, value)}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={8} xl={9} className='part-machine-container'>
                                {machineParts.length > 0 && machineParts.map(part => (
                                    <Col xs={12} sm={6} lg={4} className='part-machine-item' key={part.id}>
                                        <PartMachine
                                            part={part}
                                            onCheckboxChange={handleCheckboxChange}
                                            onDescriptionChange={handleDescriptionChange}
                                            fillForm={form2.fill_form}
                                        />
                                    </Col>
                                ))}
                            </Col>
                        </div>
                        {errors.fill_form && <p className='error mt-2'>{errors.fill_form}</p>}
                        <div className='p-form2-row8'>
                            <p className='title-item'>متعلقات خودرو</p>
                            <div className='belongings-wrapper'>
                                <Col xs={12} md={6} xl={5}>
                                    <div className='belongings'>
                                        <span className='title-item-form'>متعلقات بدنه</span>
                                        <div className='belongings-item-container belongings-body'>
                                            {allAccessories[0]?.children.map(item => (
                                                <Col xs={12} md={6} key={item.id}>
                                                    <InputCheckBoxAccessories
                                                        value={item.id}
                                                        onChange={(isChecked) => onCheckboxChangeAccessory(item.id, isChecked)}
                                                        onDescriptionChange={(description) => onDescriptionChangeAccessory(item.id, description)}
                                                        name={item.name}
                                                        checked={checkAll}
                                                        accessoriesFill={form2.accessories}
                                                        allAccessories={allAccessories}
                                                    />
                                                </Col>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} xl={5}>
                                    <div className='belongings'>
                                        <span className='title-item-form'>متعلقات داخلی</span>
                                        <div className='belongings-item-container belongings-interior'>
                                            {allAccessories && allAccessories[1]?.children.map(item => (
                                                <Col xs={12} md={6} key={item.id}>
                                                    <InputCheckBoxAccessories
                                                        value={item.id}
                                                        onChange={(isChecked) => onCheckboxChangeAccessory(item.id, isChecked)}
                                                        onDescriptionChange={(description) => onDescriptionChangeAccessory(item.id, description)}
                                                        name={item.name}
                                                        checked={checkAll}
                                                        accessoriesFill={form2.accessories}
                                                        allAccessories={allAccessories}
                                                    />
                                                </Col>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                                <Col className='mt-4 mt-lg-0' xs={12} md={4} xl={2}>
                                    <div className='belongings belongings-input d-flex flex-column'>
                                        <span className='other-belongs-title'>سایر متعلقات</span>
                                        <input
                                            type="text"
                                            className='input-belongings'
                                            name="other_accessories"
                                            value={form2.customer_secend_form.other_accessories}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Col>
                            </div>
                            <div className='mt-4 mt-md-5'>
                                <InputCheckBox
                                    text="همه موارد"
                                    value="همه موارد"
                                    checked={checkAll}
                                    onChange={(e) => handleCheckAll(e.target.checked)}
                                />
                            </div>
                        </div>
                        {errors.accessories && <span className='error'>{errors.accessories}</span>}
                        <div className='p-form-actions'>
                            <div className='p-form-actions'>
                                <EditBtn />
                                <ConfirmBtn type="submit" isSubmitting={loading} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

