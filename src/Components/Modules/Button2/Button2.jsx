import React from "react";
import styles from "./Button2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Button2({ text, onClick, icon, style }) {
  return (
    <button className={`${styles.add_btn} ${styles[style]}`} onClick={onClick}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon_input} />}
    </button>
  );
}
