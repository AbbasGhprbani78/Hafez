import React from 'react'
import './DropDown.css'
export default function DropDown({ lable, styled, items, onChange, name, defaultValue }) {

    return (
        <>
            <div className={`dropdown-container ${styled}`}>
                {
                    lable &&
                    <label className='label-input mb-2'>{lable}</label>
                }
                <div className="dropdown-wrapper">
                    <select className='dropdown' onChange={onChange} name={name} value={defaultValue}>
                        <option value={-1} className='dropdown-item'></option>
                        {items?.map((item, i) => (
                            <option value={item} key={i}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}
