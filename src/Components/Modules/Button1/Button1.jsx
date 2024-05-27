import React from 'react'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Button1({ onClick }) {
    return (
        <>
            <button className='btn-1-wrapper' onClick={onClick}>
                <div className='btn-1'>
                    ادامه
                </div>
                <div className='btn-arrow-wrapper'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            </button>

        </>
    )
}
