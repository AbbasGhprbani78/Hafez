import styles from "./ToggleSwitch.module.css";
export default function ToggleSwitch() {
  return (
    <>
      <label className={styles.toggle_switch}>
        <input type="checkbox" />
        <div className={styles.toggle_switch_background}>
          <div className={styles.toggle_switch_handle}></div>
        </div>
      </label>
    </>
  );
}
