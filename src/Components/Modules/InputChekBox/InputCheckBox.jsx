import React from 'react'
import './InputCheckBox.css'
export default function InputCheckBox({ marginRight, onChange, checked, value }) {
    return (
        <>
            <div className={`checkbox-container mx-2 ${marginRight}`}>
                <input
                    type="checkbox"
                    className='check-input'
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <label htmlFor="" className='lable-check'>{value}</label>

            </div>

        </>

    )
}
