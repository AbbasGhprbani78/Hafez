import { useState } from 'react';
import './InputUpload.css';
import { useEffect } from 'react';

export default function InputUloadPform2({
    label,
    name,
    setForm2,
    src,
}) {
    const [defaultImg, setDefaultImg] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            setDefaultImg(URL.createObjectURL(file));
            handleFileUpload(file);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setDefaultImg(URL.createObjectURL(file));
            handleFileUpload(file);
        }
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm2((prevForm) => ({
                ...prevForm,
                customer_secend_form: {
                    ...prevForm.customer_secend_form,
                    [name]: reader.result,
                },
            }));
        };
        reader.readAsDataURL(file);
    };



    return (
        <div className='uploadInput-container'>
            <p className="uploadInput-title mb-2">{label}</p>
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
                        accept="image/*"
                    />
                    {
                        defaultImg || src ? (
                            <img
                                src={defaultImg ? defaultImg : (src ? `${apiUrl}${src}` : "")}
                                alt="upload-preview"
                                className='img-input'
                            />
                        ) : (
                            <div className="drag-drop-text">drag and drop<br />or</div>
                        )
                    }

                    <label htmlFor={name} className='label-uploadInput mt-2'>آپلود</label>
                </div>
            </div>
        </div>
    );
}
