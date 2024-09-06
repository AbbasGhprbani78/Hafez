import React from 'react';
import './CarModel.css';

export default function CarModal({ opneModal, setOpenModal, imgImModal, modalText, setModalText, handleSaveText }) {
    const imgUrl = imgImModal instanceof Blob ? URL.createObjectURL(imgImModal) : '';

    return (
        <div className={`carModal-container ${opneModal ? "activeModalCar" : ""}`}>
            <div className='closeCarModal' onClick={() => setOpenModal(false)}></div>
            <div className="carModal-content">
                <div className='modal-image'>
                    <img src={imgUrl} alt="image" />
                </div>
                <textarea
                    className='modal-textarea'
                    placeholder='توضیحات'
                    value={modalText}
                    onChange={(e) => setModalText(e.target.value)}
                />
                <button className='btn-modalcar mt-3' onClick={handleSaveText}>ثبت</button>
            </div>
        </div>
    );
}
