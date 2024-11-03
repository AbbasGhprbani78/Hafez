import { useState, useRef, useEffect } from 'react';
import './SelectDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SelectDropDown({ icon, label, items, name, setother, value, onChange, material }) {
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [displayedValue, setDisplayedValue] = useState(value);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setOptions(items);
        setFilteredOptions(items);

        // Check if 'material' exists and match it with the appropriate item
        if (material) {
            const matchedItem = items.find(item => item.value_id === material);
            if (matchedItem) {
                setDisplayedValue(matchedItem.value);
            }
        }
    }, [items, material]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setDisplayedValue(value);
        setFilteredOptions(options.filter(option => option.value.toLowerCase().includes(value.toLowerCase())));
        setShowOptions(true);
    };

    const handleOptionClick = (value, id) => {
        setDisplayedValue(value);
        setother(value === 'سایر');
        onChange(name, id);
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
                    value={displayedValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    autoComplete='off'
                />
                <FontAwesomeIcon icon={icon} className='select-car-icon' />
                {showOptions && (
                    <ul className='list-cars'>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, i) => (
                                <li key={i} className='car-item' onClick={() => handleOptionClick(item.value, item.value_id)}>
                                    {item.value}
                                </li>
                            ))
                        ) : (
                            <li className='car-item'>موردی یافت نشد</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
