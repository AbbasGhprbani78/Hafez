import React, { useState } from 'react'
import './InputCheckBox.css';
export default function InputCheckBoxPartMachine({ value, onChange, onDescriptionChange }) {
    const [checked, setChecked] = useState(false);
    const [description, setDescription] = useState('');

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onChange(isChecked);
        if (!isChecked) {
            setDescription('');
            onDescriptionChange('');
        }
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        onDescriptionChange(newDescription);
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
            {checked && (
                <div className='wrap-checkbox-dec'>
                    <textarea
                        className='wrap-checkbox textarea'
                        placeholder='توضیحات'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            )}
        </>
    );
}
