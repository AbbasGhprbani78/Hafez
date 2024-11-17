import React, { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const [fixtop, setFixTop] = useState(false);
  return (
    <>
      <header className={`${styles.header} ${fixtop ? styles.fixheader : ""}`}>
        <div className={styles.header_btn_wrapper}>
          <button className={styles.btn_2}>
            پذیرش جدید
            <FontAwesomeIcon icon={faPlus} className={styles.plus_btn_2} />
          </button>
        </div>
        <div className={styles.search_wrapper}>
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
        </div>
      </header>
    </>
  );
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
