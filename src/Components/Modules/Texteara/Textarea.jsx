import React from 'react'
import './Textarea.css'

export default function Textarea({ styled, value, onChange, name }) {
    return (
        <div className='textarea-container'>
            <label className='label-input mb-2'>آدرس</label>
            <textarea
                className={`textarea ${styled}`}
                value={value}
                onChange={onChange}
                name={name}
            />
        </div>
    )
}
