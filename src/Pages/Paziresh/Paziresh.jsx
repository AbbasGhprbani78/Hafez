import React, { useState } from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Templates/paziresh/Pform1/Pform1'
import Pform2 from '../../Components/Templates/paziresh/Pform2/Pform2'
import Pform3 from '../../Components/Templates/paziresh/Pform3/Pform3'
import './Paziresh.css'
export default function Paziresh() {
    const [content, setContent] = useState("اطلاعات اولیه مشتری :")
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
                        <Pform3 />
                    </div>
                </div>
            </div>
        </>
    )
}
