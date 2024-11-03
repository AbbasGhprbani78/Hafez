import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep }) => {

    return (
        <div className="pragress-wrapper d-flex justify-content-between" style={{ direction: "ltr" }}>
            <div className="pragress-Container">
                <div className="progress" style={{ width: `${(currentStep - 1) / 3 * 100}%` }}></div>

                <div style={{ position: "relative", }} className={`circle ${currentStep >= 1 ? 'active' : ''}`}>
                    1
                    <p className='item-prog-text' style={{ paddingTop: "15px" }}>اطلاعات مشتری</p>
                </div>
                <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>
                    2
                    <p className='item-prog-text'>اطلاعات خودرو</p>
                </div>
                <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>
                    3
                    <p className='item-prog-text'>اظهارات مشتری</p>
                </div>
                <div className={`circle ${currentStep >= 4 ? 'active' : ''}`}>
                    4
                    <p className='item-prog-text'>فرم تایید</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
