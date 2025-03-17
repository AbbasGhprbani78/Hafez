import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./AllForm.module.css";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Component

import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { ToastContainerCustom } from '../../Components/Modules/Toast/ToastCustom';
import { errorMessage, warningMessage } from '../../Components/Modules/Toast/ToastCustom';
import ReactDropdown from '../../Components/Modules/ReactDropdown/ReactDropdown';

import Input from '../../Components/Modules/Input/Input';
import LoadingForm from '../../Components/Modules/Loading/LoadingForm';
import { InfoTabel } from '../Management/ManagementPage';

//MUI Component
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, TableCell, TableRow, Typography } from "@mui/material";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";


export default function AllForm() {
  const [information, setInformation] = useState([])
  const [admissionNumber, setAdmissionNumber] = useState("")
  const [filter, setFilter] = React.useState(0);

  const [page, setPage] = useState(0)
  const [totalRows, setTotalRows] = useState(undefined)
  const pageLength = 4;


  const handleChangeFilter = (newValue) => {
    setFilter(newValue);
  };

  const navigate = useNavigate()
  const handleGoToPaziresh = () => {
    navigate("/paziresh")
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeAdmissionNumber = (event) => {
    const input = event.target.value;
    const regex = /^[0-9]*$/;
    if (input === "" || regex.test(input)) {
      setAdmissionNumber(input);
    } else {
      warningMessage("فقط عدد وارد نمایید!")
    }
  }

  return (
    <Grid className="content-conatiner">
      <SideBar />
      <ToastContainerCustom />
      <Grid
        item
        size={{ xs: 12 }}
        container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%"
        }}
        minWidth={100}
        className="space-content" >
        <Header title={"کارتابل پذیرش:"} handleClick={handleGoToPaziresh} />
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: "flex-end",
            width: "100%",
            padding: { xs: ".5rem 0", sm: "0.7rem 0", md: "0.8rem 0", lg: "1rem 0 ", xl: "1.2rem 0" },
            gap: { xs: "1rem", sm: "0" }
          }}
          size={{ xs: 12 }}
          className={styles.border_bottom}
        >
          <Grid
            item
            size={{ xs: 12, sm: 6, md: 5, lg: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            paddingLeft={{ xs: "0", sm: "1rem", md: "2rem", lg: "4rem", xl: "5rem" }}

          >
            <Input
              name={"admission_number_input"}
              styled={"admission_number_input"}
              label="شماره پذیرش:"
              placeholder="شماره پذیرش"
              icon={faHashtag}
              value={admissionNumber}
              onChange={handleChangeAdmissionNumber}
            />
          </Grid>
          <Grid
            item
            container
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column"
            }}
            paddingRight={{ xs: "0", sm: "1rem", md: "0" }}
          >
            <Typography className={`mb-2 ${styles.label_dropdown}`} variant='body2'>فیلتر براساس:</Typography>
            <ReactDropdown optionsProp={filterItems} handleChange={handleChangeFilter} mainValue={filter} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          size={12}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: { md: "center", lg: "flex-start" },
            alignItems: "center",
            width: "100%",
            gap: { sm: "1rem", md: "1.2rem", lg: "1.4rem" },
            paddingTop: { xs: "0", md: "0.8rem ", lg: "1rem", xl: "1.2rem" }
          }}>

          {filterItems.map((item, index) => (
            <Button
              onClick={() => handleChangeFilter(item.value)}
              aria-label={item.tabNameEn}
              key={index}
              variant='contained'
              className={` ${filter === item.value ? styles.active_btn : styles.manual_btn}`}
            >
              {item.label}
            </Button>
          ))}
        </Grid>
        <Box sx={{
          width: "100%", paddingTop: { xs: ".5rem ", sm: "0.7rem", md: "0.8rem ", lg: "1rem", xl: "1.2rem" }
        }} >
          {information === undefined ? <LoadingForm /> : <InfoTabel
            tableInformation={information}
            page={page}
            handleChange={handleChangePage}
            totalRows={totalRows}
            pageLength={pageLength}
            columnsTitle={columnsAcceptance}
            key={41}
          >
            {information.length > 0 ? information
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    fontFamily: "iranYekan",
                  }}
                >
                  <TableCell sx={{ fontFamily: "iranYekan" }}>
                    {row.code}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "iranYekan" }}>
                    {row.name}
                  </TableCell>

                  <TableCell sx={{ fontFamily: "iranYekan" }}>
                    {`${row.remaining_capacity} ساعت`}
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "iranYekan",
                      padding: "19px"
                    }}
                  >
                    <div
                      className={`${styles.status_btn_halls} ${row.status === true
                        ? styles.status_halls_one
                        : row.status === false
                          ? styles.status_halls_two
                          : styles.status_halls_defualt
                        }`}
                    >
                      {row.status === true
                        ? "فعال"
                        : row.status === false
                          ? "غیرفعال"
                          : "نامشخص"}
                    </div>
                  </TableCell>

                  <TableCell sx={{ fontFamily: "iranYekan" }}>
                    {row.descriptions}
                  </TableCell>

                </TableRow>)) : <></>

            }
          </InfoTabel>}
        </Box>
      </Grid>
    </Grid >
  );
}
const columnsAcceptance = [
  "شماره پذیرش",
  "شماره هرم",
  "نوع خودرو",
  "شماره شاسی",
  "تاریخ پذیرش",
  "پلاک خودرو",
  "وضعیت پذیرش",
];
const filterItems = [
  { value: 0, label: "همه", tabNameEn: "all" },
  { value: 1, label: "فرم‌های تکمیل‌شده", tabNameEn: "completed" },
  { value: 2, label: "فرم‌های ناتمام", tabNameEn: "unfinished" },
  { value: 3, label: "برگشتی", tabNameEn: "returned" },
  { value: 4, label: "در انتظار تایید کارشناس", tabNameEn: "pending approval" }

]