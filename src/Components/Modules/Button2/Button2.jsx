import React from "react";
import styles from "./Button2.module.css";
export default function Button2({ text, onClick }) {
  return (
    <button className={styles.add_btn} onClick={onClick}>
      {text}
    </button>
  );
}
