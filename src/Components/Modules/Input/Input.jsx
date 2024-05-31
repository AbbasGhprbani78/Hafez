import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.css';

const Input = forwardRef(({ name, label, icon, placeholder, type, styleInput, ...rest }, ref) => (
    <div className={`input-container ${styleInput}`}>
        <label htmlFor={name} className='label-input mb-2'>{label}</label>
        <div className="input-content-wrapper">
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className='input-form'
                ref={ref}
                {...rest}
                autoComplete='off'
            />
            <FontAwesomeIcon icon={icon} className='icon-input' />
        </div>
    </div>
));

export default Input;
