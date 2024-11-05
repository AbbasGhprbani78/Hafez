import React, { useState } from 'react'
import './Draft.css'
import { useEffect } from 'react'
import { MyContext } from '../../context/context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Draft() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setDataForm, setIdForm, setEditMode } = useContext(MyContext)
    const [unfinishedForms, setUnfinishedForms] = useState([])
    const navigate = useNavigate()

    const getAllDataForm = async (id) => {
        try {
            const res = await axios.get(`${apiUrl}/app/get-form/${id}`)
            if (res.status === 200) {
                setDataForm(res.data)
                setEditMode(true)
                navigate("/paziresh")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const gotoUnfinishedHandler = (id) => {
        setIdForm(id)
        getAllDataForm(id)
    }

    useEffect(() => {
        const getAllunfinishedForm = async () => {
            try {
                const res = await axios.get(`${apiUrl}/app/pending-forms/`)
                if (res.status === 200) {
                    setUnfinishedForms(res.data.forms)
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllunfinishedForm()
    }, [])


    return (
        <div>
            {
                unfinishedForms.length > 0 &&
                unfinishedForms.map(item => (
                    <p
                        key={item.id}
                        className='px-5'
                        onClick={() => gotoUnfinishedHandler(item.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {item.id}
                    </p>
                ))
            }
        </div>
    )
}
