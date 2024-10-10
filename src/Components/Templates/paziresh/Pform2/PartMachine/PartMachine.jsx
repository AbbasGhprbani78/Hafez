import './PartMachine.css';
import InputCheckBoxPartMachine from '../../../../Modules/InputChekBox/InputCheckBoxPartMachine';

export default function PartMachine({ part, onCheckboxChange, onDescriptionChange }) {

    return (
        <div className='partmachine-wrapper'>
            <span className='title-partmachine'>{part.name}</span>
            <div className='check-boxes-wrapper'>
                {part.children.map(belonging => (
                    <InputCheckBoxPartMachine
                        key={belonging.name}
                        value={belonging.id}
                        name={belonging.name}
                        onChange={(isChecked) => onCheckboxChange(belonging.id, isChecked, belonging.value_number)}
                        onDescriptionChange={(description) => onDescriptionChange(belonging.id, description)}
                    
                    />
                ))}
            </div>
        </div>
    );
}
