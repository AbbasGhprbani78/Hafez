import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ setContent }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
    };

    const handlePrev = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };


    useEffect(() => {
        if (currentStep === 1) {
            setContent("اطلاعات اولیه مشتری :")
        }
        else if (currentStep === 2) {
            setContent("اطلاعات اولیه خودرو")
        }
    }, [currentStep])

    return (
        <div className="pragress-wrapper d-flex justify-content-between" style={{ direction: "ltr" }}>
            <div className="pragress-Container">
                <div className="progress" style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
                <div style={{ position: "relative" }} className={`circle ${currentStep >= 1 ? 'active' : ''}`}>
                    1
                    <p className='item-prog-text'>اطلاعات مشتری</p>
                </div>
                <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>
                    2
                    <p className='item-prog-text'>اطلاعات خودرو</p>
                </div>
                <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>
                    3
                    <p className='item-prog-text'>اظهارات مشتری</p>
                </div>
            </div>


            {/* <button className="btn" id="Prev" onClick={handlePrev} disabled={currentStep === 1}>
                Prev
            </button>
            <button className="btn" id="Next" onClick={handleNext} disabled={currentStep === 4}>
                Next
            </button> */}
        </div>
    );
};

export default ProgressBar;
