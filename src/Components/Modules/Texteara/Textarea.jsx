import React from 'react'
import './Textarea.css'
export default function Textarea({ styled }) {
    return (
        <div className='textarea-container'>
            <label className='label-input mb-2'>آدرس</label>
            <textarea className={`textarea ${styled}`}>
            </textarea>
        </div>
    )
}
