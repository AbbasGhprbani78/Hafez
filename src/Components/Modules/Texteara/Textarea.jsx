import React from 'react'
import styles from './Textarea.module.css'

export default function Textarea({ styled, value, onChange, name,text }) {
    return (
      <div className={styles.textarea_container}>
        <label className={`label_input mb-2`}>{text}</label>
        <textarea
          className={`${styles.textarea} ${styled}`}
          value={value}
          onChange={onChange}
          placeholder={text}
          name={name}
        />
      </div>
    );
}
