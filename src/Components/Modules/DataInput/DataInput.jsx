import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Typography } from '@mui/material';
import './DataInput.css'
export default function DataInput({ value, onChange, placeHolder = "زمان و تاریخ مدنظر را انتخاب کنید!" }) {
  return (
    <>
      <div className={"estimate_input"}>
        <div className="input_content_wrapper">
          <DatePicker
            placeholder={placeHolder}
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
          />
        </div>
      </div>
    </>
  );
}
