import React from 'react';
import './Home.css';
import SideBar from '../../Components/Modules/SideBar/SideBar';
import Header from '../../Components/Modules/Header/Header';
import TypeActivity from '../Login/TypeActivity/TypeActivity';
export default function Home() {
    return (
        <>
            {/* <div className="content-conatiner">
                <SideBar />
                <div className='space-content'>
                    <Header />
                    <div class="home-container">
                        <div class="home-item div1">1</div>
                        <div class="home-item div2">2</div>
                        <div class="home-item div3">3</div>
                        <div class="home-item div4">4</div>
                        <div class="home-item div5">5</div>
                        <div class="home-item div6">6</div>
                    </div>
                </div>
            </div> */}
            <TypeActivity />
        </>
    );
}

