import React from 'react'
import './Button2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Button2() {
    return (
        <button className='btn-2'>
            پذیرش جدید
            <FontAwesomeIcon icon={faPlus} className='plus-btn-2' />
        </button>
    )
}
