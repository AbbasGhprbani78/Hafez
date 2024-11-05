import React from 'react'
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faAlignRight,
    faNewspaper,
    faScrewdriverWrench,
    faLayerGroup,
    faBoxArchive,
    faChartPie,
    faRightToBracket,
    faListCheck
}
    from '@fortawesome/free-solid-svg-icons';

import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../../context/context';
export default function SideBar() {

    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem('access')
        localStorage.removeItem("refresh")
        navigate("/login")
    }

    const { toggleOpen, isOpen } = useContext(MyContext)

    return (
        <div className={`sidebar-container ${isOpen ? 'active-sidebar' : null} `}>
            <ul className="sidebarlist">
                <li className="sidebar-item first-icon-sidebar" onClick={toggleOpen}>
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faAlignRight} />
                    </div>
                    <p className="sidebar-item-text"></p>
                </li>
                <NavLink to={"/"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <p className="sidebar-item-text">خانه</p>
                </NavLink>

                <NavLink to={"/paziresh"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <p className="sidebar-item-text">پذیرش</p>
                </NavLink>
                <NavLink to={"/allform"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faScrewdriverWrench} />
                    </div>
                    <p className="sidebar-item-text">تعمیرات</p>
                </NavLink>
                <NavLink to={"/h"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faLayerGroup} />
                    </div>
                    <p className="sidebar-item-text">حسابداری</p>
                </NavLink>
                <NavLink to={"/g"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faChartPie} />
                    </div>
                    <p className="sidebar-item-text">گزارشات</p>
                </NavLink>
                <NavLink to={"/a"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faBoxArchive} />
                    </div>
                    <p className="sidebar-item-text">انبار</p>
                </NavLink>
                <NavLink to={"/draft"} className="sidebar-item navlink">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <p className="sidebar-item-text">فرم های ناتمام</p>
                </NavLink>
                <li className="sidebar-item navlink logout-sidebar" onClick={logoutHandler}>
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </div>
                    <p className="sidebar-item-text">خروج</p>
                </li>
            </ul>
        </div >
    )
}
