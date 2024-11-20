import React from "react";
import styles from "./OutWork.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell, TableRow } from "@mui/material";
import InputRadio from "../../../Modules/InputRadio/InputRadio";
export default function OutWork() {
  const columns = [
    "عمل",
    "قیمت",
    "کیلومتر خروج",
    "زمان خروج",
    "کیلومتر ورود",
    "زمان ورود",
    "توضیحات",
  ];
  return (
    <div className={`${styles.box}`}>
      <span className={`${styles.box_title} subtitle-project`}>
        افزودن کار خارج :
      </span>
      <div className={`${styles.wrap_actions} mt-4`}>
        <Button2 onClick={""} text={"افزودن اجرت"} />
        <Button2 onClick={""} text={"ارسال پیامک"} icon={faEnvelope} />
      </div>
      <div className="mt-3">
        <TableForm columns={columns}>
          <TableRow className="statment-row-table">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <div className="wrap-trash-table">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {}}
                className="trash-row-table"
              />
            </div>
            <div className="wrap-edit-table">
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => {}}
                className="edit-row-table"
              />
            </div>
          </TableRow>
        </TableForm>
      </div>
      <div className={styles.wrap_radio}>
        <InputRadio
          text="خروج ماشین"
          marginRight={""}
          onChange={""}
          value={""}
          checked={""}
          name={""}
        />
        <InputRadio
          text="خروج قطعه"
          marginRight={""}
          onChange={""}
          value={""}
          checked={""}
          name={""}
        />
      </div>
    </div>
  );
}
