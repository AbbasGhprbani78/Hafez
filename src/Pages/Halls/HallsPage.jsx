import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from "./HallsStyle.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Components
import SideBar from '../../Components/Modules/SideBar/SideBar';
import Header from '../../Components/Modules/Header/Header';
import Input from '../../Components/Modules/Input/Input';
import { ToastContainerCustom } from '../../Components/Modules/Toast/ToastCustom';
import { infoMessage, errorMessage, warningMessage, successMessage } from '../../Components/Modules/Toast/ToastCustom';
import LoadingForm from '../../Components/Modules/Loading/LoadingForm';
import TableCustom from '../../Components/Modules/TableCustom/TableCustom';

//MUI Components
import Grid from '@mui/material/Grid2';
import { Button, TableCell, TableRow } from "@mui/material";

//Icons 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function HallsPage() {
    const [information, setInformation] = useState([])
    const [searchField, setSearchField] = useState("")
    const [filterRows, setFilterRows] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeSearchField = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchField(searchTerm);

        const filterProducts = information.filter(
            (item) =>
                item.code.includes(searchTerm) ||
                item.hallsName.toLowerCase().includes(searchTerm) ||
                item.status.includes(searchTerm)
        );
        setFilterRows(filterProducts);
    };
    const fetchCommonData = async () => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${apiUrl}/`, {
                headers,
            });
            const data = await response.json();
            setInformation(data);
            setFilterRows(information)


        } catch (error) {
            // errorMessage("خطا در برقراری ارتباط با سرور")
            setInformation(fakeData)
            setFilterRows(information)
        }

    }
    useEffect(() => {
        fetchCommonData();
    }, [])
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
                <Header title={"سالن‌ها:"} disabledButton={true} />
                <Grid
                    item
                    container
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" },
                        alignItems: "center",
                        width: "100%"
                    }}>
                    <Grid
                        item
                        size={{ xs: 9, sm: 6, md: 4, lg: 3 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Input
                            value={searchField}
                            onChange={handleChangeSearchField}
                            icon={faMagnifyingGlass}
                            placeholder={"جستجو"}
                            styled={"full_width"}
                        />
                    </Grid>

                </Grid>
                <InfoTabelHalls
                    tableInformation={filterRows}
                    page={page}
                    handleChange={handleChangePage}
                    pageLength={rowsPerPage}
                    totalRows={filterRows.length}
                />

            </Grid>
        </Grid>
    )
}

export default HallsPage

function InfoTabelHalls({
    tableInformation = [],
    handleChange,
    page,
    pageLength,
    totalRows
}) {
    console.log(tableInformation)
    const columns = [
        "کد",
        "نام سالن",
        "وضعیت",
        "توضیحات",
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
        >
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
                            tableInformation
                                .slice(page * pageLength, (page + 1) * pageLength - 1)
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
                                            {row.hallsName}
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
                                                className={`${styles.status_btn_halls} ${row.status === "free"
                                                    ? styles.status_halls_one
                                                    : row.status === "repair"
                                                        ? styles.status_halls_two
                                                        : row.status === "none active"
                                                            ? styles.status_halls_three
                                                            : styles.status_halls_defualt
                                                    }`}
                                            >
                                                {row.status === "free"
                                                    ? "آزاد"
                                                    : row.status === "repair"
                                                        ? "در حال تعمیر"
                                                        : row.status === "none active"
                                                            ? "غیرفعال"
                                                            : "نامشخص"}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "iranYekan" }}>
                                            {row.description}
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

const fakeData = [
    {
        "code": "H001",
        "hallsName": "Main Hall",
        "status": "free",
        "description": "Spacious hall available for events.",
        "action": "https://example.com/halls/H001"
    },
    {
        "code": "H002",
        "hallsName": "Conference Room",
        "status": "repair",
        "description": "Under maintenance due to water leakage.",
        "action": "https://example.com/halls/H002"
    },
    {
        "code": "H003",
        "hallsName": "Banquet Hall",
        "status": "none active",
        "description": "Not currently in use.",
        "action": "https://example.com/halls/H003"
    },
    {
        "code": "H004",
        "hallsName": "Exhibition Center",
        "status": "default",
        "description": "Standard hall for exhibitions and fairs.",
        "action": "https://example.com/halls/H004"
    },
    {
        "code": "H005",
        "hallsName": "Auditorium",
        "status": "free",
        "description": "Large seating capacity with modern facilities.",
        "action": "https://example.com/halls/H005"
    },
    {
        "code": "H006",
        "hallsName": "Sports Arena",
        "status": "repair",
        "description": "Roof damage being repaired.",
        "action": "https://example.com/halls/H006"
    },
    {
        "code": "H007",
        "hallsName": "Music Hall",
        "status": "none active",
        "description": "Closed for renovation.",
        "action": "https://example.com/halls/H007"
    },
    {
        "code": "H008",
        "hallsName": "Lecture Hall A",
        "status": "default",
        "description": "Equipped for educational sessions and talks.",
        "action": "https://example.com/halls/H008"
    },
    {
        "code": "H009",
        "hallsName": "Lecture Hall B",
        "status": "free",
        "description": "Available for booking.",
        "action": "https://example.com/halls/H009"
    },
    {
        "code": "H010",
        "hallsName": "Community Hall",
        "status": "repair",
        "description": "Scheduled for repainting.",
        "action": "https://example.com/halls/H010"
    },
    {
        "code": "H011",
        "hallsName": "VIP Lounge",
        "status": "none active",
        "description": "Reserved for special occasions only.",
        "action": "https://example.com/halls/H011"
    },
    {
        "code": "H012",
        "hallsName": "Library Hall",
        "status": "default",
        "description": "Quiet reading and research space.",
        "action": "https://example.com/halls/H012"
    },
    {
        "code": "H013",
        "hallsName": "Cultural Hall",
        "status": "free",
        "description": "Hosting cultural and art events.",
        "action": "https://example.com/halls/H013"
    },
    {
        "code": "H014",
        "hallsName": "Theater Hall",
        "status": "repair",
        "description": "Stage equipment being upgraded.",
        "action": "https://example.com/halls/H014"
    },
    {
        "code": "H015",
        "hallsName": "Event Space",
        "status": "none active",
        "description": "Pending upcoming events.",
        "action": "https://example.com/halls/H015"
    }
]
