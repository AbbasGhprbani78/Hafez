
import './DropDown.css'
export default function DropDown({ lable, styled, items, onChange, name, defaultValue }) {

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        onChange(name, selectedValue);  
    };

    return (
        <>
            <div className={`dropdown-container ${styled}`}>
                {lable && <label className='label-input mb-2'>{lable}</label>}
                <div className="dropdown-wrapper">
                    <select className='dropdown' onChange={handleChange} name={name} value={defaultValue}>
                        {items?.map((item, i) => (
                            <option value={item.value} key={i}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
