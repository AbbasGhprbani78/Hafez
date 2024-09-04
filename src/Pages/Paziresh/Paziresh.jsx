import React, { useState } from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Templates/paziresh/Pform1/Pform1'
import Pform2 from '../../Components/Templates/paziresh/Pform2/Pform2'
import Pform3 from '../../Components/Templates/paziresh/Pform3/Pform3'
import './Paziresh.css'
export default function Paziresh() {
    const [content, setContent] = useState("اطلاعات اولیه مشتری :")
    const [currentTab, setCurrentTab] = useState(1);

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
                                updateFormData={(data) => handleFormDataUpdate('tab1', data)}
                                nextTab={handleNextTab}
                            />

                        }
                        {
                            currentTab === 2 &&
                            <Pform2
                                formData={formData.tab1}
                                updateFormData={(data) => handleFormDataUpdate('tab2', data)}
                                nextTab={handleNextTab}
                            />

                        }
                        {
                            currentTab === 3 &&
                            <Pform3
                                formData={formData.tab1}
                                updateFormData={(data) => handleFormDataUpdate('tab3', data)}
                                nextTab={handleNextTab}
                            />

                        }

                    </div>
                </div>
            </div>
        </>
    )
}



// const handleSubmit = async () => {
//     const formDataToSend = new FormData();

//     // Convert the collected form data into FormData format
//     Object.keys(formData).forEach((tab) => {
//         Object.entries(formData[tab]).forEach(([key, value]) => {
//             formDataToSend.append(key, value);
//         });
//     });

//     try {
//         // Example: Sending form data to an API endpoint
//         const response = await fetch('/api/submit', {
//             method: 'POST',
//             body: formDataToSend, // Send as FormData
//         });

//         if (!response.ok) {
//             throw new Error('Failed to submit data');
//         }

//         // Handle successful submission
//         alert('Data submitted successfully!');
//     } catch (error) {
//         console.error('Error submitting data:', error);
//         alert('Error submitting data');
//     }
// };