import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button2 from '../Button2/Button2';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
export default function Header() {
    return (
        <>
            <header className='header'>
                <div className="header-btn-wrapper">
                    <Button2 />
                </div>
                <div className='search-wrapper'>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder='جستوجو'
                        className='search-input'
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                </div>
            </header>
        </>
    )
}
