import React from 'react'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Button1({ type, isSubmitting }) {
    return (
        <>
            <button
                className={`btn-1-wrapper ${isSubmitting ? "disbtn" : ""}`}
                type={type}
                disabled={isSubmitting}
            >
                <div className='btn-1'>
                    {isSubmitting ? "صبر کنید" : "ادامه"}
                </div>
                <div className='btn-arrow-wrapper'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            </button>

        </>
    )
}
