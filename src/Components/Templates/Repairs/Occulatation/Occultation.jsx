import React from "react";
import styles from "./Occultation.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import TableForm from "../../../Modules/Table/TableForm";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faNewspaper, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import OccultationItem from "../../../Modules/OccultationItem/OccultationItem";
import { Col } from "react-bootstrap";
import ConfirmBtn from "../../../Modules/ConfirmBtn/ConfirmBtn";
import EditBtn from "../../../Modules/EditBtn/EditBtn";
export default function Occultation() {
  const columns = ["شرح اظهار", "توضیحات کارشناس", "توضیحات مشتری"];


  return (
    <div className={`${styles.box}`}>
      <span className={`${styles.box_title} subtitle-project`}>
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
        <p className={styles.sub_title}>نوع خدمات و انتخاب تعمیرکار :</p>
        <div className={styles.occultationItem_container}>
          {Array(3)
            .fill(0)
            .map((item, i) => (
              <Col xs={12} sm={5} md={3} key={i}>
                <OccultationItem key={i} />
              </Col>
            ))}
        </div>
        <div className={styles.wrap_contract}>
          <FontAwesomeIcon icon={faNewspaper} />
          <p className={styles.contract_text}>قرارداد صافکاری - نقاشی</p>
        </div>

        <div className="p-form-actions">
          <div className="p-form-actions">
            <EditBtn
              onClick={""}
              text={"ویرایش"}
            />
            <ConfirmBtn type="submit" isSubmitting={""} />
          </div>
        </div>
      </div>
    </div>
  );
}
