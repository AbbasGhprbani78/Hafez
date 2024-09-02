import React from 'react'
import './InputCheckBox.css'
export default function InputCheckBox({ marginRight, onChange, isPermition, value, isdescription }) {
    return (
        <>
            <div className={`checkbox-container mx-2 ${marginRight}`}>
                <input
                    type="checkbox"
                    className='check-input'
                    value={value}
                />
                <label htmlFor="" className='lable-check'>{value}</label>

            </div>
            {
                isdescription &&
                <div className='wrap-checkbox-dec'>
                    <textarea className='wrap-checkbox textarea' placeholder='توضیحات'></textarea>
                </div>
            }

        </>

    )
}
