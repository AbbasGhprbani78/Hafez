import React, { useState } from 'react';
import './ClearProgress.css';

export default function ClearProgress({ name, value, onChange }) {
    const [inputValue, setInputValue] = useState(0);


    return (
        <div className='range-container'>
            <input
                className='range-input'
                type="range"
                value={value}
                onChange={onChange}
                min="0"
                max="100"
                step="1"
                name={name}
            />
            <div className="numbers">
                <span className="number">0%</span>
                <span className="number">25%</span>
                <span className="number">50%</span>
                <span className="number">75%</span>
                <span className="number">100%</span>
            </div>
            <div className="symbols">
                <span className="symbol"></span>
                <span className="symbol"></span>
                <span className="symbol"></span>
                <span className="symbol"></span>
                <span className="symbol"></span>
            </div>
        </div>
    );
}
