import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ResponsiveExample from '../Offcanvas/OffcanvasMenu'
export default function Header({ title, disabledButton = false }) {
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
            <button className={styles.btn_2}>
              پذیرش جدید
              <FontAwesomeIcon icon={faPlus} className={styles.plus_btn_2} />
            </button>
          </div>}

        </div>
        <span className={styles.title_bottom}>{title}</span>
      </header>
    </>
  );
}


{
  /* <FontAwesomeIcon icon={faBars} />; */
}
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
{
  /* <div className={styles.search_wrapper}>
          <input
            type="text"
            name=""
            id=""
            placeholder="جستوجو"
            className={styles.search_input}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.search_icon}
          />
        </div> */
}

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
