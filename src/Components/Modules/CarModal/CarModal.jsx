import React from 'react'
import './CarModel.css'
export default function CarModal() {
    return (
        <div className='carModal-container'>
            <div className="carModal-content">
                <div className='modal-image'>
                    {/* <img src="" alt="image" /> */}
                </div>
                <textarea className='modal-textarea' placeholder='توضیحات'>

                </textarea>
                <button className='btn-modalcar mt-3'>ثبت</button>
            </div>
        </div>
    )
}
