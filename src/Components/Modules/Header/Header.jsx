import React, { useEffect, useState } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button2 from '../Button2/Button2';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Header() {

    const [fixtop, setFixTop] = useState(false)

    // useEffect(() => {
    //     const fixHeaderTotop = () => {
    //         const currentScroll = window.scrollY
    //         if (currentScroll > 60) {
    //             setFixTop(true)
    //         } else {
    //             setFixTop(false)
    //         }
    //     }
    //     window.addEventListener("scroll", fixHeaderTotop)
    //     return () => window.removeEventListener("scroll", fixHeaderTotop)
    // }, [])
    return (
        <>
            <header className={`header ${fixtop ? "fixheader" : ""}`}>
                <div className="header-btn-wrapper">
                    <Button2
                        icon={faPlus}
                        text={"پذیرش جدید"} />
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
