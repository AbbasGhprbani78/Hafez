import React from 'react'
import './EditBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function EditBtn() {
    return (
        <button className='btn-edit'>
            ویرایش
            <FontAwesomeIcon icon={faPen} className='penicon' />
        </button>
    )
}
