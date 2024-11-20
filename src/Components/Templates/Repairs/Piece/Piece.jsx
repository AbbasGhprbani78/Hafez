import React from "react";
import styles from "./Piece.module.css";
import SelectDropDown2 from "../../../Modules/SelectDropDown2/SelectDropDown2";
import Button2 from "../../../Modules/Button2/Button2";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { TableCell, TableRow } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Piece() {
  const columns = ["نام قطعه", "مارک قطعه", "قیمت", "تعمیرکار", "تعداد"];
  return (
    <div className={`${styles.box}`}>
      <span className={`${styles.box_title} subtitle-project`}>قطعه :</span>
      <div className={`${styles.wrap_drop} mt-3`}>
        <span className={styles.text_drop}>تامین کننده :</span>
        <SelectDropDown2 text={"خدمات دهنده"} style={"width"} />
      </div>
      <div className={`${styles.wrap_actions} mt-4`}>
        <Button2 onClick={""} text={"افزودن قطعه"} />
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
    </div>
  );
}
