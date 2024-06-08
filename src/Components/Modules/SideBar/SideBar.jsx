import React, { useState } from 'react'
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAlignRight, faNewspaper, faScrewdriverWrench, faLayerGroup, faBoxArchive, faChartPie, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
export default function SideBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar-container ${isOpen ? 'active-sidebar' : null} `}>
            <ul className="sidebarlist">
                <li className="sidebar-item first-icon-sidebar" onClick={toggleDrawer}>
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
                <NavLink to={"/t"} className="sidebar-item navlink">
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
                <li className="sidebar-item navlink logout-sidebar">
                    <div className="icon-sidebar-wrapper">
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </div>
                    <p className="sidebar-item-text">خروج</p>
                </li>
            </ul>
        </div>
    )
}
