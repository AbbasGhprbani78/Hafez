import React from 'react'
import './MapCar.css'
export default function MapCar() {
    return (
        <div className="grid-container">
            <div className="wrapper">
                <div className='d-flex justify-content-between'>
                    <div className="item item1">
                        1
                        <div className='path path-1'></div>
                    </div>
                    <div className="item item2">2</div>
                    <div className="item item3">3</div>
                    <div className="item item4">
                        4
                        <div className='path path-2'></div>
                    </div>
                </div>
                <div className='d-flex  justify-content-between'>
                    <div className="item item5">5</div>
                    <div className="item item6">6</div>
                    <div className="item item7">7</div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className="item item8">
                        8
                        <div className='path path-3'></div>
                    </div>
                    <div className="item item9">9</div>
                    <div className="item item10">10</div>
                    <div className="item item11">
                        11
                        <div className='path  path-4'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
