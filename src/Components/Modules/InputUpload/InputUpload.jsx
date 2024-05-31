import React, { useState } from 'react';
import './InputUpload.css';

export default function InputUpload({ label }) {
    const [imageUpload, setImageUpload] = useState("");

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImageUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className='uploadInput-container'>
            <p className="uploadInput-title mb-2">
                {label}
            </p>
            <div
                className="uploadInput-wrapper"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="uploadInput-content">
                    <input
                        type="file"
                        id="uploadInput"
                        className='uploadInput'
                        onChange={e => setImageUpload(e.target.files[0])}
                    />
                    {
                        imageUpload ?
                            <img
                                src={`${URL.createObjectURL(imageUpload)}`}
                                alt="upload-image"
                                className='img-input'
                            /> :
                            <div className="drag-drop-text">drag and drop<br />or</div>
                    }

                    <label htmlFor="uploadInput" className='label-uploadInput mt-2'>Upload</label>
                </div>
            </div>
        </div>
    );
}
