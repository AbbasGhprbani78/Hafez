import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ResponsiveExample from '../Offcanvas/OffcanvasMenu'
import Button2 from "../Button2/Button2";
export default function Header({ title, disabledButton = false, handleClick }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  return (
    <>
      <ResponsiveExample
        show={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
      <header className={`${styles.header}`} style={{ width: "100%" }}>
        <div className={styles.header_content}>
          <div
            className={styles.wrap_icon}
            onClick={() => setIsShowSideBar(true)}
          >
            <FontAwesomeIcon icon={faAlignRight} className={styles.icon_m} />
          </div>
          <span className={styles.title_page}>{title}</span>
          <div className={styles.logo_wrapper}>
            <img src="/image/1.svg" alt="logo" />
          </div>
          {disabledButton ? <></> : <div className={styles.header_btn_wrapper}>
            <Button2 style="search_btn" onClick={handleClick} icon={faPlus} >{"پذیرش جدید"}</Button2>
          </div>}
        </div>
        <span className={styles.title_bottom}>{title}</span>
      </header>
    </>
  );
}

