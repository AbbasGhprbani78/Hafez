
import './MapCar.css';

export default function MapCar({ selectPart, selectParts,fillForm }) {

    const handleItemClick = (number) => {
        selectPart(number);
    };

    const isActive = (number) => {
        const isPartSelected = selectParts?.some(part => part.value_number == number);
        return isPartSelected 
    };


    return (
        <div className="grid-container">
            <div className="wrapper">
                <div className='d-flex justify-content-between'>
                    <div
                        className={`item item1 ${isActive(1) ? "activepart" : ''}`}
                        onClick={() => handleItemClick(1)}
                    >
                        1<div className='path path-1'></div>
                    </div>
                    <div
                        className={`item item2 ${isActive(2) ? "activepart" : ''}`}
                        onClick={() => handleItemClick(2)}
                    >
                        2
                    </div>
                    <div
                        className={`item item3 ${isActive(3) ? "activepart" : ''}`}
                        onClick={() => handleItemClick(3)}
                    >
                        3
                    </div>
                    <div
                        className={`item item4 ${isActive(4) ? "activepart" : ''}`}
                        onClick={() => handleItemClick(4)}
                    >
                        4<div className='path path-2'></div>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div
                        className={`item item5 ${isActive(5) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(5)}
                    >
                        5
                    </div>
                    <div
                        className={`item item6 ${isActive(6) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(6)}
                    >
                        6
                    </div>
                    <div
                        className={`item item7 ${isActive(7) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(7)}
                    >
                        7
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div
                        className={`item item8 ${isActive(8) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(8)}
                    >
                        8<div className='path path-3'></div>
                    </div>
                    <div
                        className={`item item9 ${isActive(9) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(9)}
                    >
                        9
                    </div>
                    <div
                        className={`item item10 ${isActive(10) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(10)}
                    >
                        10
                    </div>
                    <div
                        className={`item item11 ${isActive(11) ? 'activepart' : ''}`}
                        onClick={() => handleItemClick(11)}
                    >
                        11<div className='path path-4'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
