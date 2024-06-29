import React, { useState, useRef, useEffect } from 'react';
import './SelectDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormikContext } from 'formik';

export default function SelectDropDown({ icon, label, items, name, setother }) {

    const { setFieldValue } = useFormikContext();
    const [options] = useState(items);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        setInputValue(option);
        setFieldValue(name, option);
        setShowOptions(false);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
        setother(false)
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
                        {
                            filteredOptions.length > 0 ?
                                <>
                                    {
                                        filteredOptions.map((item, i) => (
                                            <li key={i} className='car-item' onClick={() => handleOptionClick(item)}>
                                                {item}
                                            </li>
                                        ))
                                    }
                                    <li className='car-item' onClick={() => {
                                        setShowOptions(false)
                                        setother(true)
                                        setFieldValue(name, "")
                                        setInputValue("")
                                    }
                                    } >
                                        سایر
                                    </li>
                                </>

                                :
                                <li className='car-item'>
                                    موردی یافت نشد
                                </li>
                        }
                    </ul>
                )}
            </div>
        </div>
    );
}
