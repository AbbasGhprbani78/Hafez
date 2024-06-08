import React from 'react'
import './InputCheckBox.css'
export default function InputCheckBox({ text, marginRight, onChange, isPermition, value }) {
    return (
        <div className={`checkbox-container mx-2 ${marginRight}`}>
            <input
                type="checkbox"
                className='check-input'
                value={value}
            />
            <label htmlFor="" className='lable-check'>{value}</label>
        </div>
    )
}
