import React from 'react';
import './PartMachine.css';
import InputCheckBox from '../../../../Modules/InputChekBox/InputCheckBox';


export default function PartMachine({ part, onCheckboxChange }) {
    return (
        <div className='partmachine-wrapper'>
            <span className='title-partmachine'>{part.name}</span>
            <div className='check-boxes-wrapper'>
                {part.belongings.map(belonging => (
                    <InputCheckBox
                        key={belonging.name}
                        value={belonging.name}
                        isdescription={""}
                        onChange={(isChecked) => onCheckboxChange(belonging.name, isChecked)}
                    />
                ))}
            </div>
        </div>
    );
}
