import React from 'react'
import './Button2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button2({ text, icon, styleConfirm }) {
    return (
        <button className={`btn-2 ${styleConfirm}`}>
            {text}
            <FontAwesomeIcon icon={icon} className='plus-btn-2' />
        </button>
    )
}
