import React, { useState } from 'react';
import './InputCheckBox.css';

export default function InputCheckBox({ value, onChange, isdescription }) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onChange(isChecked);
    };

    return (
        <>
            <div className='checkbox-container mx-2'>
                <input
                    type="checkbox"
                    className='check-input'
                    value={value}
                    onChange={handleChange}
                    checked={checked}
                />
                <label className='label-check'>{value}</label>
            </div>
            {isdescription && (
                <div className='wrap-checkbox-dec'>
                    <textarea className='wrap-checkbox textarea' placeholder='توضیحات'></textarea>
                </div>
            )}
        </>
    );
}
