import React, { useState, useEffect } from 'react';
import './InputUpload.css';
export default function InputUloadPform2({ label, name, setImgModal, formik }) {
    const [imageUpload, setImageUpload] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setImgModal(file)
            setImageUpload(file);
            setPreviewUrl(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                formik.setFieldValue(`car_parts[${name}].image`, base64String);
                onChange(name, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageUpload(file);
            setImgModal(file)
            setPreviewUrl(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                formik.setFieldValue(`car_parts[${name}].image`, base64String);
                (namonChangee, base64String);
            };
            reader.readAsDataURL(file);
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
                        id={name}
                        className='uploadInput'
                        onChange={handleChange}
                    />
                    {
                        imageUpload ?
                            <img
                                src={previewUrl}
                                alt="upload-preview"
                                className='img-input'
                            /> :
                            <div className="drag-drop-text">drag and drop<br />or</div>
                    }

                    <label htmlFor={name} className='label-uploadInput mt-2'>آپلود</label>
                </div>
            </div>
        </div>
    )
}
