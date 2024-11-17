import React from "react";
import styles from "./Repairs.module.css";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import AboutCar from "../../Components/Templates/Repairs/AboutCar/AboutCar";
import Occultation from "../../Components/Templates/Repairs/Occulatation/Occultation";
export default function Repairs() {
  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content">
        <div className="headerP">
          <p className="headerPtext">کارت تعمیر</p>
        </div>
        <div className="my-4">
          <AboutCar />
          <Occultation />
        </div>
      </div>
    </div>
  );
}
