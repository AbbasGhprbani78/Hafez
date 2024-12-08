import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import styles from './DataInput.module.css'
export default function DataInput({ value, onChange, style }) {
  return (
    <>
      <div className={`${styles.estimate_input} ${styles[style]}`}>
        <div className="input_content_wrapper">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            value={value}
            onChange={onChange}
            format="YYYY/MM/DD HH:mm"
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
            }}
            plugins={[<TimePicker position="bottom" />]}
          />
        </div>
      </div>
    </>
  );
}
