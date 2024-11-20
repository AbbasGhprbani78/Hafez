import React from "react";
import styles from "./Geret.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import { faEnvelope, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableForm from "../../../Modules/Table/TableForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell, TableRow } from "@mui/material";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
export default function Geret() {
      const columns = ["شرح اظهار", "عیب فنی", "تعمیرکار", "اجرت", "قیمت"];

  return (
    <div className={styles.box}>
      <span className={`${styles.box_title} subtitle-project`}>اجرت :</span>
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
      <div className="p-form-actions">
        <div className="p-form-actions">
          <ConfirmBtn type="submit" isSubmitting={""} />
        </div>
      </div>
    </div>
  );
}
