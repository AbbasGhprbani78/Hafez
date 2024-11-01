import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.css';

const Input = ({ name, label, icon, placeholder, type, styleInput, value, onChange, styled }) => {



    return (
        <div className={`input-container ${styleInput} ${styled}`}>
            <label htmlFor={name} className='label-input mb-2'>{label}</label>
            <div className="input-content-wrapper">
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className='input-form'
                    autoComplete='off'
                    maxLength={40}
                />
                {icon && <FontAwesomeIcon icon={icon} className='icon-input' />}
            </div>
        </div>
    );
};

export default Input;
