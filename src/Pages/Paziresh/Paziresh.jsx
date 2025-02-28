import { useState } from 'react'
import SideBar from '../../Components/Modules/SideBar/SideBar'
import ProgressBar from '../../Components/Modules/ProgressBar/ProgressBar'
import Pform1 from '../../Components/Templates/paziresh/Pform1/Pform1'
import Pform2 from '../../Components/Templates/paziresh/Pform2/Pform2'
import Pform3 from '../../Components/Templates/paziresh/Pform3/Pform3'
import Pform4 from '../../Components/Templates/paziresh/Pform4/Pform4'
import Header from '../../Components/Modules/Header/Header'

export default function Paziresh() {
    const [content, setContent] = useState("اطلاعات اولیه مشتری :")
    const [currentTab, setCurrentTab] = useState(3);
    const [coustomer, setCoustomer] = useState("")


    const handleNextTab = () => {
        if (currentTab === 4) {
            return false
        } else {
            setCurrentTab(prevTab => prevTab + 1);
        }
    };

    const handlePrevTab = () => {
        if (currentTab === 1) {
            return false
        } else {
            setCurrentTab(prevTab => prevTab - 1);
        }
    }

    return (
        <>
            <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                 <Header title={content}/>
                    <div className='my-4'>
                        <ProgressBar currentStep={currentTab} />
                        {
                            currentTab === 1 &&
                            <Pform1
                                nextTab={handleNextTab}
                                setContent={setContent}
                                setCoustomer={setCoustomer}
                            />

                        }
                        {
                            currentTab === 2 &&
                            <Pform2
                                nextTab={handleNextTab}
                                prevTab={handlePrevTab}
                                setContent={setContent}
                                coustomer={coustomer}
                            />

                        }
                        {
                            currentTab === 3 &&
                            <Pform3
                                nextTab={handleNextTab}
                                prevTab={handlePrevTab}
                                setContent={setContent}
                                coustomer={coustomer}
                            />

                        }
                        {
                            currentTab===4&&
                            <Pform4 prevTab={handlePrevTab} />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}



