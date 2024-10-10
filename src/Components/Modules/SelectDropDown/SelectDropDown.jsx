import { useState, useRef, useEffect } from 'react';
import './SelectDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export default function SelectDropDown({ icon, label, items, name, setother, formik, chnageType, setAllTips }) {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [options, setOptions] = useState();
    const [filteredOptions, setFilteredOptions] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const [displayedValue, setDisplayedValue] = useState('');
    const dropdownRef = useRef(null);




    const handleInputChange = (e) => {
        const value = e.target.value;
        setDisplayedValue(value);
        setFilteredOptions(options.filter(option => option.value.toLowerCase().includes(value.toLowerCase())));
        setShowOptions(true);
    };

    const handleOptionClick = async (id, value) => {
        formik.setFieldValue(name, id);
        setDisplayedValue(value);

        if (value === 'سایر') {
            setother(true);
        } else {
            setother(false);
        }

        setShowOptions(false);

        if (chnageType) {
            try {
                const res = await axios.get(`${apiUrl}/app/parts-detail/${id}`);
                if (res.status === 200) {
                    setAllTips(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        }


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


    useEffect(() => {
        setOptions(items);
        setFilteredOptions(items);
    }, [items]);

    return (
        <div className='select-car-wrapper' ref={dropdownRef}>
            <label htmlFor="myInput" className='label-input mb-2'>{label}</label>
            <div className='select-car'>
                <input
                    type="text"
                    id="myInput"
                    name={name}
                    className='input-cars'
                    value={displayedValue}
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
                                    <li key={i} className='car-item' onClick={() => handleOptionClick(item.value_id, item.value)}>
                                        {item.value}
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
