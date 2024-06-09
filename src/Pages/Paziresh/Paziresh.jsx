import React from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import Header from '../../Components/Modules/Header/Header'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Templates/paziresh/Pform1/Pform1'
import Pform2 from '../../Components/Templates/paziresh/Pform2/Pform2'
export default function Paziresh() {
    return (
        <>
            <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                    <Header />
                    <div className='my-4'>
                        <ProgressBar />
                        <Pform2 />
                    </div>
                </div>
            </div>
        </>
    )
}
