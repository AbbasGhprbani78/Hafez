import React from 'react';
import './Input2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Input2({ icon, placeholder, name, value, onChange }) {



    return (
        <div className='input2-container mt-2'>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type="text"
                className="input2-form"
                placeholder={placeholder}
                autoComplete='off'
                maxLength={40}
            />
            <FontAwesomeIcon icon={icon} className='icon-input' />
        </div>
    )
}
