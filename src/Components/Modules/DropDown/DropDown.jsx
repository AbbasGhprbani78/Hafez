import React from 'react'
import './DropDown.css'
export default function DropDown({ haslable, styled }) {

    return (
        <>
            <div className={`dropdown-container ${styled}`}>
                {
                    haslable &&
                    <label className='label-input mb-2'>نوع خودرو</label>
                }
                <div className="dropdown-wrapper">
                    <select className='dropdown'>
                        <option value={-1} className='dropdown-item'></option>
                        <option className='dropdown-item'>test 1</option>
                        <option className='dropdown-item'>test 1</option>
                        <option className='dropdown-item'>test 1</option>
                    </select>
                </div>
            </div>
        </>
    )
}
