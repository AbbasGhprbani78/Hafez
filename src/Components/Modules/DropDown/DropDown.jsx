import React from 'react'
import './DropDown.css'
export default function DropDown({ haslable, styled, items, onChange, name }) {

    return (
        <>
            <div className={`dropdown-container ${styled}`}>
                {
                    haslable &&
                    <label className='label-input mb-2'>نوع خودرو</label>
                }
                <div className="dropdown-wrapper">
                    <select className='dropdown' onChange={onChange} name={name}>
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
