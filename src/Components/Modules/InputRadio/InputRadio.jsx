import React from 'react';
import styles from './InputRadio.module.css'

export default function InputRadio({ text, marginRight, onChange, value, checked, name }) {
    return (
      <>
        <div className={`${styles.radio_container}  ${styles[marginRight]}`}>
          <input
            type="radio"
            className={styles.radio_input}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
          />
          <label htmlFor="" className={styles.lable_radio}>
            {text}
          </label>
        </div>
      </>
    );
}
