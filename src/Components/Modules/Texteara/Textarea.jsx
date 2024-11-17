import React from 'react'
import styles from './Textarea.module.css'

export default function Textarea({ styled, value, onChange, name }) {
    return (
      <div className={styles.textarea_container}>
        <label className={`label_input mb-2`}>آدرس</label>
        <textarea
          className={`${styles.textarea} ${styled}`}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    );
}
