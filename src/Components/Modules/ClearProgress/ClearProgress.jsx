import React from 'react';
import './ClearProgress.css';
import { toFarsiNumber } from '../../../utils/helper';

export default function ClearProgress({ name, value, onChange }) {
  
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
                <span className="number">{toFarsiNumber(0)}%</span>
                <span className="number">{toFarsiNumber(25)}%</span>
                <span className="number">{toFarsiNumber(50)}%</span>
                <span className="number">{toFarsiNumber(75)}%</span>
                <span className="number">{toFarsiNumber(100)}%</span>
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
