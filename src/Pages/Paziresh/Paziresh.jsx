import React, { useState } from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Templates/paziresh/Pform1/Pform1'
import Pform2 from '../../Components/Templates/paziresh/Pform2/Pform2'
import Pform3 from '../../Components/Templates/paziresh/Pform3/Pform3'
import './Paziresh.css'
import axios from 'axios'
export default function Paziresh() {
    const [content, setContent] = useState("اطلاعات اولیه مشتری :")
    const [currentTab, setCurrentTab] = useState(2);
    const [form, setForm] = useState('')

    const [formData, setFormData] = useState({
        tab1: {},
        tab2: {},
        tab3: {}
    });



    const handleFormDataUpdate = (tab, data) => {
        setFormData(prevData => ({
            ...prevData,
            [tab]: data
        }));
    };


    const handleNextTab = () => {
        setCurrentTab(prevTab => prevTab + 1);
    };

    const handlePrevTab = () => {
        setCurrentTab(prevTab => prevTab - 1);
    }

    const handleSubmit = async () => {
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((tab) => {
            Object.entries(formData[tab]).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
        });

        try {

            const response = axios.post("api/submit/", formDataToSend)

            if (response.status === 200) {
                console.log(response.data)
            }


            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data');
        }
    };


    return (
        <>
            <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                    <div className='headerP'>
                        <p className='headerPtext'>
                            {content}
                        </p>
                    </div>
                    <div className='my-4'>
                        <ProgressBar setContent={setContent} />
                        {
                            currentTab === 1 &&
                            <Pform1
                                formData={formData.tab1}
                                updateFormData={(data, form) => {
                                    handleFormDataUpdate('tab1', data)
                                    setForm(form)
                                }}
                                nextTab={handleNextTab}
                                form={form}
                            />

                        }
                        {
                            currentTab === 2 &&
                            <Pform2
                                formData={formData.tab1}
                                updateFormData={(data) => handleFormDataUpdate('tab2', data)}
                                nextTab={handleNextTab}
                                prevTab={handlePrevTab}
                            />

                        }
                        {
                            currentTab === 3 &&
                            <Pform3
                                formData={formData.tab1}
                                updateFormData={(data) => handleFormDataUpdate('tab3', data)}
                                nextTab={handleNextTab}
                                prevTab={handlePrevTab}
                            />

                        }

                    </div>
                </div>
            </div>
        </>
    )
}



