import React from 'react';
import './PartMachine.css';
import InputCheckBoxPartMachine from '../../../../Modules/InputChekBox/InputCheckBoxPartMachine';


export default function PartMachine({ part, onCheckboxChange, onDescriptionChange }) {
    return (
        <div className='partmachine-wrapper'>
            <span className='title-partmachine'>{part.name}</span>
            <div className='check-boxes-wrapper'>
                {part.belongings.map(belonging => (
                    <InputCheckBoxPartMachine
                        key={belonging.name}
                        value={belonging.name}
                        onChange={(isChecked) => onCheckboxChange(belonging.name, isChecked)}
                        onDescriptionChange={(description) => onDescriptionChange(part.number, belonging.name, description)}
                    />
                ))}
            </div>
        </div>
    );
}
