import React, { useEffect, useState } from 'react';
import './CarModel.css';

export default function CarModal({
    opneModal,
    setOpenModal,
    imgImModal,
    modalText,
    setModalText,
    handleSaveText,
    editMode,
    chnageImage
}) {

    console.log(imgImModal)
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const imgsrc = imgImModal ? (
        editMode && !chnageImage ? `${apiUrl}${imgImModal}` :
            editMode && chnageImage ? URL.createObjectURL(imgImModal) :
                URL.createObjectURL(imgImModal)
    ) : '';


    return (
        <div className={`carModal-container ${opneModal ? "activeModalCar" : ""}`}>
            <div className='closeCarModal' onClick={() => setOpenModal(false)}></div>
            <div className="carModal-content">
                <div className='modal-image'>
                    {imgsrc ? (
                        <img src={imgsrc} alt="Uploaded Preview" />
                    ) : (
                        <div className='text-center d-flex align-items-center justify-content-center h-100'>
                            عکسی جهت نمایش وجود ندارد
                        </div>
                    )}
                </div>
                <textarea
                    className='modal-textarea'
                    placeholder='توضیحات'
                    value={modalText || ''}
                    onChange={(e) => setModalText(e.target.value)}
                />
                <button className='btn-modalcar mt-3' onClick={handleSaveText}>
                    ثبت
                </button>
            </div>
        </div>
    );
}
