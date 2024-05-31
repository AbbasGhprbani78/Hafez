import React, { forwardRef } from 'react';
import './Input2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Input2({ icon, placeholder }) {
    return (
        <div className='input2-container mt-2'>
            <input
                type="text"
                className="input2-form"
                placeholder={placeholder}
                autoComplete='off'
            />
            <FontAwesomeIcon icon={icon} className='icon-input' />
        </div>
    )
}
