import React from 'react'
import './DropDown.css'
export default function DropDown({ haslable }) {
    return (
        <>
            <div className="dropdown-container">
                {
                    haslable &&
                    <label className='label-input mb-2'>نوع خودرو</label>
                }
                <div className="dropdown-wrapper">
                    <select className='dropdown'>
                        <option className='dropdown-item'></option>
                        <option className='dropdown-item'>test 1</option>
                        <option className='dropdown-item'>test 1</option>
                        <option className='dropdown-item'>test 1</option>
                    </select>
                </div>
            </div>
        </>
    )
}
