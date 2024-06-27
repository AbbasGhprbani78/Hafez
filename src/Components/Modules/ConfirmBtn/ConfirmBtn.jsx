import React from 'react'
import './ConfirmBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
export default function ConfirmBtn({ type, isSubmitting }) {
    return (
        <button className='btn-confirm' type={type}>
            تایید
            <FontAwesomeIcon icon={faCheck} className='ckeckicon ' />
        </button>
    )
}
