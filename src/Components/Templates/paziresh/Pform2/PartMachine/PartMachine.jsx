import React from 'react'
import './PartMachine.css'
import InputCheckBox from '../../../../Modules/InputChekBox/InputCheckBox'
export default function PartMachine({ title }) {

    return (
        <div className='partmachine-wrapper'>
            <span className='title-partmachine'>{title}</span>
            <div className='check-boxes-wrappper'>
                <InputCheckBox
                    value={"درب موتور"}
                    isdescription={""}
                />
                <InputCheckBox
                    value={"درب موتور"}
                    isdescription={""}
                />
                <InputCheckBox
                    value={"درب موتور"}
                    isdescription={""}
                />
                <InputCheckBox
                    value={"درب موتور"}
                    isdescription={""}
                />
                <InputCheckBox
                    value={"درب موتور"}
                    isdescription={""}
                />
            </div>
        </div>
    )
}
