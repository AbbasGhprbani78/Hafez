import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../Components/Modules/Header/Header";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import styles from "./User.module.css";
import {
  faAddressCard,
  faPen,
  faPhone,
  faPlus,
  faTrash,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import ToggleSwitch from "../../Components/Modules/ToggleSwitch/ToggleSwitch";
import Modal from "../../Components/Modules/Modal/Modal";
import Input from "../../Components/Modules/Input/Input";
import SelectDropDown2 from "../../Components/Modules/SelectDropDown2/SelectDropDown2";
import ConfirmBtn from "../../Components/Modules/ConfirmBtn/ConfirmBtn";

export default function User() {
  const columns = [
    "ردیف",
    "نام کاربر",
    "نقش کاربر",
    "کد ملی",
    "شماره تماس",
    "وضعیت",
    "عملیات",
  ];
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([
    {
      row: 1,
      full_name: "عباس قربانی",
      user_role: "کارشناس فنی",
      national_code: "1234567890",
      phone_number: "09162957253",
      status: "",
    },
    {
      row: 2,
      full_name: "محمد رضایی",
      user_role: "مدیر فروش",
      national_code: "9876543210",
      phone_number: "09123456789",
      status: "",
    },
    {
      row: 3,
      full_name: "علی احمدی",
      user_role: "مدیر مالی",
      national_code: "5678901234",
      phone_number: "09156789012",
      status: "",
    },
    {
      row: 4,
      full_name: "زهرا محمدی",
      user_role: "کارشناس منابع انسانی",
      national_code: "3456789012",
      phone_number: "09134567890",
      status: "",
    },
    {
      row: 5,
      full_name: "مریم حسینی",
      user_role: "کارشناس پشتیبانی",
      national_code: "2345678901",
      phone_number: "09123456780",
      status: "",
    },
    {
      row: 6,
      full_name: "رضا کریمی",
      user_role: "توسعه‌دهنده نرم‌افزار",
      national_code: "8901234567",
      phone_number: "09189012345",
      status: "",
    },
    {
      row: 7,
      full_name: "سارا عباسی",
      user_role: "مدیر پروژه",
      national_code: "6789012345",
      phone_number: "09167890123",
      status: "",
    },
    {
      row: 8,
      full_name: "حسین موسوی",
      user_role: "کارشناس شبکه",
      national_code: "4567890123",
      phone_number: "09145678901",
      status: "",
    },
    {
      row: 9,
      full_name: "نرگس ملکی",
      user_role: "تحلیلگر سیستم",
      national_code: "7890123456",
      phone_number: "09178901234",
      status: "",
    },
    {
      row: 10,
      full_name: "فرزاد نوری",
      user_role: "مدیر IT",
      national_code: "0123456789",
      phone_number: "09101234567",
      status: "",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className={"modal_content"}>
          <div className={"modal_top"}>
            <span className={`titel_top ${styles.title_modal}`}>
              تعریف کاربر جدید
            </span>
            <div
              className={styles.wrap_icon_modal}
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className={styles.modal_bottom}>
            <div className={styles.input_wrap}>
              <Input
                name={"first_name"}
                label={"نام"}
                placeholder={"نام"}
                type={"text"}
                value={""}
                onChange={""}
                icon={faUser}
              />
            </div>

            <div className={styles.input_wrap}>
              <Input
                name={"last_name"}
                label={"نام خانوادگی"}
                placeholder={"نام خانوادگی"}
                type={"text"}
                value={""}
                onChange={""}
                icon={faUser}
              />
            </div>

            <div className={styles.input_wrap}>
              <Input
                name={"national_code"}
                label={"کد ملی"}
                placeholder={"کد ملی"}
                type={"text"}
                value={""}
                onChange={""}
                icon={faAddressCard}
              />
            </div>

            <div className={styles.input_wrap}>
              <Input
                name={"phone_number"}
                label={"شماره تماس"}
                placeholder={"شماره تماس"}
                type={"text"}
                value={""}
                onChange={""}
                icon={faPhone}
              />
            </div>
            <div className={styles.input_wrap}>
              <label className={`label_input mb-2`}>نقش کاربر</label>
              <SelectDropDown2 text={"کارشناس فنی"} />
            </div>
            <div className={styles.wrap_btn}>
              <ConfirmBtn />
            </div>
          </div>
        </div>
      </Modal>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"کاربرها :"} />
          <div className={styles.top_content}>
            <div
              className={styles.new_user_action}
              onClick={() => setShowModal(true)}
            >
              <div className={styles.wrap_icon}>
                <FontAwesomeIcon icon={faPlus} className={styles.icon} />
              </div>
              <span className={styles.new_user_text}>تعریف کاربر جدید</span>
            </div>
          </div>
          <div className={"mt-3"}>
            <TableStatus
              columns={columns}
              rows={rows}
              page={page}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
            >
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    }}
                  >
                    <TableCell>{row.row}</TableCell>
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell>{row.user_role}</TableCell>
                    <TableCell>{row.national_code}</TableCell>
                    <TableCell>{row.phone_number}</TableCell>
                    <TableCell>
                      <ToggleSwitch />
                    </TableCell>
                    <TableCell>
                      <div className={styles.actions}>
                        <FontAwesomeIcon
                          icon={faPen}
                          className={styles.icon_table}
                          onClick={() => setShowModal(true)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={styles.icon_table}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableStatus>
          </div>
        </div>
      </div>
    </>
  );
}
