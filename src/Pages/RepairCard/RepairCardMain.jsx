import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from "./RepairCardStyle.module.css"
import axios from 'axios';


//Components
import SideBar from "../../Components/Modules/SideBar/SideBar"
import Header from "../../Components/Modules/Header/Header"
import Input from '../../Components/Modules/Input/Input';
import Button2 from '../../Components/Modules/Button2/Button2';
import DatePicker from '../../Components/Modules/DatePicker/DatePickerInput';
import LoadingForm from '../../Components/Modules/Loading/LoadingForm';
import TableCustom from '../../Components/Modules/TableCustom/TableCustom';
import { ToastContainerCustom } from '../../Components/Modules/Toast/ToastCustom';
import { infoMessage, errorMessage, warningMessage, successMessage } from '../../Components/Modules/Toast/ToastCustom';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Button, TableCell, TableRow } from "@mui/material";


//Icons 
import { faHashtag, faMagnifyingGlass, faCalendarDays, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';

function RepairCardMain() {
    const [page, setPage] = useState("1")
    const [pageLength, setPageLength] = useState(5)
    const [totalRows, setTotalRows] = useState(fakeInfo.length)
    const [information, setInformation] = useState(fakeInfo)
    const [admissionNumber, setAdmissionNumber] = useState(undefined)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [ExelURL, setExelURL] = useState(undefined)
    const [isOnDateFilter, setIsOnDateFilter] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChangeAdmissionNumber = (event) => {
        const input = event.target.value;
        const regex = /^[0-9]/;
        if (input === "" || regex.test(input)) {
            setAdmissionNumber(input);
        } else {
            warningMessage("فقط عدد وارد نمایید!")
        }
    }

    const handleChangePage = (newPage) => {
        // successMessage(`${newPage}`)
        setPage(newPage);
    };

    useEffect(() => {
        if (!admissionNumber) return; // Don't fetch if input is empty

        const delayFetch = setTimeout(() => {
            filterDataByNumber(admissionNumber);
        }, 500)

        return () => clearTimeout(delayFetch);  // Cleanup on each keystroke

    }, [admissionNumber])

    useEffect(() => {
        fetchCommonData(page, pageLength);
    }, [page]);

    const fetchCommonData = async (page = 1, pageLength = 5) => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${apiUrl}/`, {
                headers,
                params: { page, pageLength }
            });
            const data = await response.json();
            setInformation(undefined);

        } catch (error) {
            errorMessage("خطا در برقراری ارتباط با سرور")
        }
    }
    const filterDataByNumber = async (admissionNumber) => {
        console.log(admissionNumber)
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${apiUrl}/${admissionNumber}`, {
                headers,
            });
            const data = await response.json();
            // setInformation(data);

        } catch (error) {
            errorMessage("خطا در برقراری ارتباط با سرور")
        }
    }
    const handleClickOnSearch = () => {
        if (startDate === "" || startDate === undefined) {
            warningMessage("لطفا تاریخ شروع را انتخاب نمایید!")
            return
        }
        if (endDate === "" || endDate === undefined) {
            warningMessage("لطفا تاریخ پایان را انتخاب نمایید!")
            return
        }

    }
    const resetDatePicker = (number) => {
        if (number === 1) {
            setStartDate("")
        } else if (number === 2) {
            setEndDate("")
        }
    }
    const handleClickOnDownloadExcel = () => {
        successMessage("فایل مورد نظر دانلود شد!")
        console.log("user clicked on download Excel")
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
                gap={{ xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" }}
                className={`space-content ${styles.wrap_repairs}`} >
                <Header title={"لیست پذیرش‌ها:"} />
                <Grid
                    item
                    container
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        alignItems: { xs: "flex-start", md: "center" },
                        width: "100%"
                    }}
                    gap={{ xs: "1.5rem", sm: "0", }}
                    size={{ xs: 12 }}

                >
                    <Grid
                        item
                        size={{ xs: 12, sm: 4, md: 4 }}
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
                            label="شماره پذیرش"
                            placeholder="شماره پذیرش"
                            icon={faHashtag}
                            value={admissionNumber}
                            onChange={handleChangeAdmissionNumber}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        size={{ xs: 12, sm: 8, md: 8 }}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "flex-end",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        gap={{ xs: "0.75rem", sm: "1rem", md: "0" }}

                    >
                        <Grid
                            item
                            container
                            spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                            size={{ xs: 12, md: 9 }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                width: "100%",
                            }}>
                            <Grid
                                item
                                size={6}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <DatePicker
                                    value={startDate}
                                    onChange={setStartDate}
                                    label={"از تاریخ فاکتور"}
                                    placeholder='۱۴۰۰/۰۱/۰۱'
                                    icon={startDate !== "" ? faCalendarXmark : faCalendarDays}
                                    onReset={() => resetDatePicker(1)}
                                />
                            </Grid>
                            <Grid
                                item
                                size={6}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>

                                <DatePicker
                                    value={endDate}
                                    onChange={setEndDate}
                                    label={"تا تاریخ فاکتور"}
                                    placeholder='۱۴۰۳/۰۱/۰۱'
                                    icon={endDate !== "" ? faCalendarXmark : faCalendarDays}
                                    onReset={() => resetDatePicker(2)}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            size={{ xs: 12, md: 3 }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: { xs: "flex-start", sm: "center", md: "flex-end" },
                            }}
                        >
                            <Button2
                                text={"جستجو"}
                                icon={faMagnifyingGlass}
                                style={"search_btn"}
                                onClick={handleClickOnSearch} />

                        </Grid>
                    </Grid>
                </Grid>
                <InfoTabel
                    tableInformation={information}
                    handleChange={handleChangePage}
                    handleExcel={handleClickOnDownloadExcel}
                    page={page}
                    pageLength={pageLength}
                    totalRows={totalRows}
                />

            </Grid>
        </Grid >
    )
}

function InfoTabel({
    tableInformation = [],
    handleChange,
    handleExcel,
    page,
    pageLength,
    totalRows
}) {
    const columns = [
        " شماره پذیرش",
        "شماره فاکتور",
        "تاریخ فاکتور",
        "تاریخ پذیرش",
        "شماره شاسی",
        "کدملی",
        "نام و نام‌خانوادگی مشتری",
        "عملیات",
    ]
    const handleClickOnView = (link) => {
        window.location.href = link
    }

    return (
        <Grid
            container
            item
            size={12}
            sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
            gap={{ xs: "0.6rem" }}
        >
            <Grid
                item
                size={12}
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "flex-start", sm: "flex-end" },
                }}>
                <Button2
                    text={"دریافت اکسل"}
                    onClick={handleExcel}
                    disable={tableInformation === undefined}
                />
            </Grid>
            {
                tableInformation === undefined ?
                    <LoadingForm /> :
                    <TableCustom
                        rows={tableInformation}
                        columns={columns}
                        onChange={handleChange}
                        page={page}
                        rowsPerPage={pageLength}
                        total={totalRows}
                    >
                        {
                            tableInformation.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                                        fontFamily: "iranYekan",
                                    }}
                                >
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.admission_number}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.invoice_number}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.invoice_date}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.admission_date}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.chassis_number}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.national_id}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "iranYekan" }}>
                                        {row.customer_name}
                                    </TableCell>
                                    <TableCell sx={{

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Button className={`${styles.view_btn}`} variant="contained" onClick={() => handleClickOnView(row.action)}>مشاهده</Button>
                                    </TableCell>
                                </TableRow>))
                        }

                    </TableCustom>
            }

        </Grid >
    )

}

export default RepairCardMain

const fakeInfo = [
    {
        "admission_number": "123456",
        "invoice_number": "F-987654",
        "invoice_date": "1402/12/05",
        "admission_date": "1402/11/29",
        "chassis_number": "ABC123XYZ456",
        "national_id": "1234567890",
        "customer_name": "Ali Rezaei",
        "action": "https://example.com/action/123456"
    },
    {
        "admission_number": "789012",
        "invoice_number": "F-456321",
        "invoice_date": "1402/12/10",
        "admission_date": "1402/12/05",
        "chassis_number": "DEF789GHI123",
        "national_id": "0987654321",
        "customer_name": "Zahra Mohammadi",
        "action": "https://example.com/action/789012"
    },
    {
        "admission_number": "345678",
        "invoice_number": "F-159753",
        "invoice_date": "1402/12/15",
        "admission_date": "1402/12/10",
        "chassis_number": "JKL456MNO789",
        "national_id": "1122334455",
        "customer_name": "Hossein Karimi",
        "action": "https://example.com/action/345678"
    },
    {
        "admission_number": "567890",
        "invoice_number": "F-753159",
        "invoice_date": "1402/12/18",
        "admission_date": "1402/12/12",
        "chassis_number": "PQR678STU901",
        "national_id": "6677889900",
        "customer_name": "Maryam Sharifi",
        "action": "https://example.com/action/567890"
    },
    // {
    //     "admission_number": "901234",
    //     "invoice_number": "F-852963",
    //     "invoice_date": "1402/12/22",
    //     "admission_date": "1402/12/15",
    //     "chassis_number": "VWX234YZA567",
    //     "national_id": "5566778899",
    //     "customer_name": "Mohammad Amini",
    //     "action": "https://example.com/action/901234"
    // },
    // {
    //     "admission_number": "112233",
    //     "invoice_number": "F-123456",
    //     "invoice_date": "1402/12/25",
    //     "admission_date": "1402/12/20",
    //     "chassis_number": "LMN987OPQ654",
    //     "national_id": "3344556677",
    //     "customer_name": "Sara Mousavi",
    //     "action": "https://example.com/action/112233"
    // },
    // {
    //     "admission_number": "445566",
    //     "invoice_number": "F-789101",
    //     "invoice_date": "1402/12/28",
    //     "admission_date": "1402/12/22",
    //     "chassis_number": "RST321UVW543",
    //     "national_id": "2233445566",
    //     "customer_name": "Ahmad Naderi",
    //     "action": "https://example.com/action/445566"
    // },
    // {
    //     "admission_number": "778899",
    //     "invoice_number": "F-654987",
    //     "invoice_date": "1403/01/02",
    //     "admission_date": "1402/12/29",
    //     "chassis_number": "XYZ987ABC654",
    //     "national_id": "8899001122",
    //     "customer_name": "Fatemeh Hosseini",
    //     "action": "https://example.com/action/778899"
    // },
    // {
    //     "admission_number": "334455",
    //     "invoice_number": "F-321654",
    //     "invoice_date": "1403/01/05",
    //     "admission_date": "1403/01/02",
    //     "chassis_number": "MNO654PQR321",
    //     "national_id": "7788990011",
    //     "customer_name": "Hassan Abbasi",
    //     "action": "https://example.com/action/334455"
    // },
    // {
    //     "admission_number": "556677",
    //     "invoice_number": "F-147258",
    //     "invoice_date": "1403/01/10",
    //     "admission_date": "1403/01/05",
    //     "chassis_number": "UVW543RST321",
    //     "national_id": "9900112233",
    //     "customer_name": "Reza Sharifi",
    //     "action": "https://example.com/action/556677"
    // }
]
