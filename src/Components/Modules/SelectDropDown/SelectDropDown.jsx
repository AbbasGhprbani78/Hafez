import React, { useState, useRef, useEffect } from 'react';
import './SelectDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SelectDropDown({ icon, label, items, name, setother, formik }) {
    const [options] = useState(items);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);

    // Formik value for this field
    const inputValue = formik.values[name];

    const handleInputChange = (e) => {
        const value = e.target.value;
        formik.setFieldValue(name, value);
        setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        formik.setFieldValue(name, option);
        if (option === 'سایر') {
            formik.setFieldValue(name, option);
            setother(true);
        } else {
            setother(false);
            formik.setFieldValue(name, option);
        }
        setShowOptions(false);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='select-car-wrapper' ref={dropdownRef}>
            <label htmlFor="myInput" className='label-input mb-2'>{label}</label>
            <div className='select-car'>
                <input
                    type="text"
                    id="myInput"
                    name={name}
                    className='input-cars'
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    autoComplete='off'
                />
                <FontAwesomeIcon icon={icon} className='select-car-icon' />
                {showOptions && (
                    <ul className='list-cars'>
                        {filteredOptions.length > 0 ? (
                            <>
                                {filteredOptions.map((item, i) => (
                                    <li key={i} className='car-item' onClick={() => handleOptionClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </>
                        ) : (
                            <li className='car-item'>
                                موردی یافت نشد
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
