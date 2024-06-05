import React from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import Header from '../../Components/Modules/Header/Header'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Modules/paziresh/Pform1/Pform1'
export default function Paziresh() {
    return (
        <>
            <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                    <Header />
                    <div className='my-4'>
                        <ProgressBar />
                        <Pform1 />
                    </div>
                </div>
            </div>
        </>
    )
}
