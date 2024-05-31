import React from 'react'
import './InputRadio.css'
export default function InputRadio({ text, marginRight, onChange, isPermition, value }) {


    return (
        <>
            <div className={`radio-container mx-2 ${marginRight}`}>
                <input
                    type="radio"
                    name="" id=""
                    className='radio-input'
                    value={value}
                    onChange={() => onChange(value)}
                    checked={value === isPermition}
                />
                <label htmlFor="" className='lable-radio'>{text}</label>
            </div>
        </>
    )
}
