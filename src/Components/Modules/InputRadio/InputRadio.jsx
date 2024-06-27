import React from 'react';
import './InputRadio.css';

export default function InputRadio({ text, marginRight, onChange, value, checked, name }) {
    return (
        <>
            <div className={`radio-container mx-2 ${marginRight}`}>
                <input
                    type="radio"
                    className='radio-input'
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />
                <label htmlFor="" className='lable-radio'>{text}</label>
            </div>
        </>
    );
}
