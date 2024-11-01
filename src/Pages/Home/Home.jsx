import React from 'react';
import './Home.css';
import SideBar from '../../Components/Modules/SideBar/SideBar'
import Header from '../../Components/Modules/Header/Header'
import TypeActivity from '../../Pages/Login/TypeActivity/TypeActivity'
export default function Home() {

    return (
        <>
            <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                    <Header />
                    <div className="home-container">
                        <div className="home-item div1">1</div>
                        <div className="home-item div2">2</div>
                        <div className="home-item div3">3</div>
                        <div className="home-item div4">4</div>
                        <div className="home-item div5">5</div>
                        <div className="home-item div6">6</div>
                    </div>
                </div>
            </div>
            {/* <TypeActivity /> */}
        </>
    );
}
