import React, { useState, useEffect, useContext } from 'react';
import './AllForm.css';
import axios from 'axios';
import { MyContext } from '../../context/context';
import { useNavigate } from 'react-router-dom'

export default function AllForm() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [allForms, setAllForms] = useState([]);
    const { setDataForm, setIdForm, setEditMode } = useContext(MyContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllForms = async () => {
            try {
                const response = await axios.get(`${apiUrl}/app/get-full-forms/`);
                if (response.status === 200) {
                    console.log(response.data)
                    setAllForms(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllForms();
    }, []);


    const goToFormHnadler = (id, form) => {
        setEditMode(true)
        setIdForm(id)
        setDataForm(form)
        navigate("/paziresh")
    }


    return (
        <div>
            {
                allForms.length > 0 &&
                allForms.map(item => (

                    <p onClick={() => goToFormHnadler(item.customer_form.id, item)}>{item.customer_form.id}</p>
                ))
            }
        </div>
    );
}
