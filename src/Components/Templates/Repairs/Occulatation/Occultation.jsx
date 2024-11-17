import React from "react";
import styles from "./Occultation.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import TableForm from "../../../Modules/Table/TableForm";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TypeOfService from "../../../Modules/TypeOfService/TypeOfService";
import { useFormik } from "formik";
export default function Occultation() {
  const columns = ["شرح اظهار", "توضیحات کارشناس", "توضیحات مشتری"];

  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`${styles.occultation_box} mt-3`}>
      <span className={`${styles.car_onfo_box_title} subtitle-project`}>
        عیب یابی :
      </span>

      <div className={`mt-4 ${styles.occultation_content}`}>
        <Button2 text={"افزودن اظهار"} onClick={""} />
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
        <div className="mt-5">
          <TypeOfService handleServiceChange={""} selectedServices={""} />
        </div>
      </div>
    </div>
  );
}
