import React, { useState, useRef, useEffect } from 'react'
import './CodeCar.css'
import { useFormikContext } from 'formik';
export default function CodeCar({ name, value }) {
    const [inputs, setInputs] = useState(["", "", "", ""]);
    const finalPlates = inputs.join("")
    const { setFieldValue } = useFormikContext();
    useEffect(() => {
        setFieldValue(name, finalPlates)
    }, [inputs])
    const inputRefs = useRef([]);

    const validateInput = (index, value) => {
        switch (index) {
            case 0:
                return /^\d{0,2}$/.test(value);
            case 1:
                return /^[\u0600-\u06FF]?$/.test(value);
            case 2:
                return /^\d{0,3}$/.test(value);
            case 3:
                return /^\d{0,2}$/.test(value);
            default:
                return true;
        }
    };

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        if (validateInput(index, value)) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);

            if ((index === 0 && value.length === 2) ||
                (index === 1 && value.length === 1) ||
                (index === 2 && value.length === 3) ||
                (index === 3 && value.length === 2)) {
                if (index < inputRefs.current.length - 1) {
                    inputRefs.current[index + 1].focus();
                }
            }
        }
    };
    return (


        <div className='inputs-wrapper' style={{ direction: "ltr" }}>
            <div className='d-flex align-items-center justify-content-between codecar-itemes'>
                <div className='d-flex flex-column align-items-center'>
                    <input
                        className='input-carector'
                        type="text"
                        value={inputs[0]}
                        onChange={(e) => handleInputChange(0, e)}
                        ref={el => inputRefs.current[0] = el}
                    />
                    <span className='text-carector'>عدد 2 تایی</span>
                </div>

                <div className='d-flex flex-column align-items-center'>
                    <input
                        className='input-carector'
                        type="text"
                        value={inputs[1]}
                        onChange={(e) => handleInputChange(1, e)}
                        ref={el => inputRefs.current[1] = el}
                    />
                    <span className='text-carector'>حرف</span>
                </div>

                <div className='d-flex flex-column align-items-center'>
                    <input
                        className='input-carector'
                        type="text"
                        value={inputs[2]}
                        onChange={(e) => handleInputChange(2, e)}
                        ref={el => inputRefs.current[2] = el}
                    />
                    <span className='text-carector'>عدد 3 تایی</span>
                </div>

                <div className='d-flex flex-column align-items-center'>
                    <input
                        className='input-carector'
                        type="text"
                        value={inputs[3]}
                        placeholder='ایران'
                        onChange={(e) => handleInputChange(3, e)}
                        ref={el => inputRefs.current[3] = el}
                    />
                    <span className='text-carector' >عدد 2 تایی</span>
                </div>
            </div>
            <p className='code-car title-item-form '> شماره پلاک</p>
        </div>
    )
}


