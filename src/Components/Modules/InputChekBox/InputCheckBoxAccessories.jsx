import { useState, useEffect } from 'react';

export default function InputCheckBoxAccessories({
    value,
    onChange,
    onDescriptionChange,
    name,
    checked,
    accessoriesFill,
    allAccessories
}) {

    const [isChecked, setIsChecked] = useState(checked);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const accessoriesItem = accessoriesFill?.find(item => item.parts == value);
        if (accessoriesItem) {
            setIsChecked(true);
            setDescription(accessoriesItem.description || '');
            onChange(true);
            onDescriptionChange(accessoriesItem.description || '');
        }
    }, [allAccessories]);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);


    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        onChange(isChecked);
        if (!isChecked) {
            setDescription('');
            onDescriptionChange('');
        }
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        onDescriptionChange(newDescription);
    };

    return (
        <>
            <div className='checkbox-container mx-2'>
                <input
                    type="checkbox"
                    className='check-input'
                    value={value}
                    onChange={handleChange}
                    checked={isChecked}
                />
                <label className='label-check'>{name}</label>
            </div>
            {isChecked && (
                <div className='wrap-checkbox-dec'>
                    <textarea
                        className='wrap-checkbox textarea'
                        placeholder='توضیحات'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            )}
        </>
    );
}


// useEffect(() => {
//     if (selectedAll !== checked) {
//         setChecked(selectedAll);
//         if (!selectedAll) {
//             setDescription('');
//             onDescriptionChange('');
//         }
//     }
// }, [selectedAll, checked, onDescriptionChange]);
