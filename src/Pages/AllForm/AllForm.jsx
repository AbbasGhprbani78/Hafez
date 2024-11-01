import React, { useState, useEffect } from 'react';
import './AllForm.css';
import axios from 'axios';

export default function AllForm() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [AllForms, setAllForms] = useState([]);


    useEffect(() => {
        const getAllForms = async () => {
            try {
                const response = await axios.get(`${apiUrl}/app/get-full-forms/`);
                if (response.status === 200) {
                    setAllForms(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllForms();
    }, []);


    return (
        <div>
        </div>
    );
}
