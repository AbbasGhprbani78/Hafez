import React, { useEffect } from 'react';
import './DropDown.css';

export default function DropDown({ lable, styled, items, onChange, name }) {
    const handleChange = (event) => {
        const value = event.target.value;
        onChange(name, value);
    };

    useEffect(() => {
        if (items && items.length > 0) {
            onChange(name, items[0]?.value); 
        }
    }, [items, name, onChange]);

    return (
        <div className={`dropdown-container ${styled}`}>
            {lable && <label className='label-input mb-2'>{lable}</label>}
            <div className="dropdown-wrapper">
                <select className='dropdown' onChange={handleChange} name={name} defaultValue={items[0]?.value}>
                    {items?.map((item, i) => (
                        <option value={item.value} key={i}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
