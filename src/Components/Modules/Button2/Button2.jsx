import styles from "./Button2.module.css";
import Button from '@mui/material/Button';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Button2({ text, onClick, icon, style, variant = "contained", disable = false, type = "button", }) {
  return (
    <Button type={type} disabled={disable} variant={variant} className={` ${disable ? styles.disabled_btn : styles.add_btn} ${styles[style]}`} onClick={onClick}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon_input} />}
    </Button>
  );
}
