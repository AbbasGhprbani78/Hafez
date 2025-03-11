import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from "./ManagementStyles.module.css"
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

//Components
import SideBar from "../../Components/Modules/SideBar/SideBar"
import Header from "../../Components/Modules/Header/Header"
import { ToastContainerCustom } from '../../Components/Modules/Toast/ToastCustom';
import { infoMessage, errorMessage, warningMessage, successMessage } from '../../Components/Modules/Toast/ToastCustom';
import ReactDropdown from '../../Components/Modules/ReactDropdown/ReactDropdown';
import Modal from '../../Components/Modules/Modal/Modal';
import AddAndEditEquipment from './ManagementsModals/AddAndEditEquipment';
import AddAndEditHalls from './ManagementsModals/AddAndEditHalls';
import AddAndEditRepairman from './ManagementsModals/AddAndEditRepairman';
import DeleteError from './ManagementsModals/DeleteError';
import Input from '../../Components/Modules/Input/Input';
import Button2 from '../../Components/Modules/Button2/Button2';
import TableCustom from '../../Components/Modules/TableCustom/TableCustom';
import LoadingForm from '../../Components/Modules/Loading/LoadingForm';

//MUI Components
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, TableCell, TableRow } from "@mui/material";


//Icons
import { faPlus, faMagnifyingGlass, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function ManagementPage() {
    const [tableRows, setTableRows] = useState([])
    const [hallsList, setHallsList] = useState([])
    const [selectedRowInfo, setSelectedRowInfo] = useState(item1)
    const [tab, setTab] = React.useState(0);
    const [modal, setModal] = React.useState(false)
    const [operation, setOperation] = useState("add")
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (newValue) => {
        setTab(newValue);
    };
    const handleToggleModal = () => {
        setModal((modal) => !modal)
    }

    const fetchTabData = async (tab = 0) => {
        let access = window.localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            let response = null;
            if (tab === 0) {
                response = await axios.get(`${apiUrl}/app/get-all-salon/`, {
                    headers,
                });
            } else if (tab === 1) {
                response = await axios.get(`${apiUrl}/app/get-customer-all-form/`, {
                    headers,
                });

            } else if (tab === 2) {
                response = await axios.get(`${apiUrl}/app/get-customer-all-form/`, {
                    headers,
                });
            }

            if (response.status === 200) {
                console.log(response.data)
                setTableRows(response.data)
                setHallsList([])
            }


        } catch (error) {
            errorMessage("خطا در برقراری ارتباط با سرور")
            setTableRows([])

        }
    }
    const handleOpenModal = (chosenItem = null, operation = "add") => {
        setSelectedRowInfo(chosenItem)
        setOperation(operation)
        handleToggleModal()
    }
    const handleChangeSearch = (e) => {
        const value = e.target.value
        setSearchInput(value)
    }

    useEffect(() => {
        fetchTabData(tab);
    }, [tab])

    console.log(`tab: ${tab}`)
    console.log(`operation: ${operation}`)
    console.log(`selected item: ${selectedRowInfo.name}`)

    return (
        <Grid className="content-conatiner">
            <Modal showModal={modal} setShowModal={handleToggleModal}>
                {tab === 0 ? (
                    operation === "add" ?
                        <AddAndEditHalls toggleModal={handleToggleModal} action="add" infoItem={selectedRowInfo} />
                        : operation === "edit"
                            ? <AddAndEditHalls toggleModal={handleToggleModal} action="edit" infoItem={selectedRowInfo} />
                            : operation === "delete"
                                ? <DeleteError toggleModal={handleToggleModal} type="hall" infoItem={selectedRowInfo} />
                                : <></>
                ) : tab === 1 ? (
                    operation === "add" ?
                        <AddAndEditRepairman toggleModal={handleToggleModal} action="add" infoItem={selectedRowInfo} hallsInfo={halls_sample} />
                        : operation === "edit" ?
                            <AddAndEditRepairman toggleModal={handleToggleModal} action="edit" infoItem={selectedRowInfo} hallsInfo={halls_sample} />
                            : operation === "delete"
                                ? <DeleteError toggleModal={handleToggleModal} type="repairman" infoItem={selectedRowInfo} />
                                : <></>
                ) : tab === 2 ? (
                    operation === "add" ?
                        <AddAndEditEquipment toggleModal={handleToggleModal} action="add" infoItem={selectedRowInfo} hallsInfo={halls_sample} />
                        : operation === "edit"
                            ? <AddAndEditEquipment toggleModal={handleToggleModal} action="edit" infoItem={selectedRowInfo} hallsInfo={halls_sample} />
                            : operation === "delete"
                                ? <DeleteError toggleModal={handleToggleModal} type="equipment" infoItem={selectedRowInfo} />
                                : <></>
                ) : <></>}
            </Modal>
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
                gap={{ xs: "0.5rem", sm: "0.7rem", md: "1rem", lg: "1.5rem", xl: "2rem" }}
                className={`space-content ${styles.wrap_repairs}`} >
                <Header title={"مدیریت:"} disabledButton={true} />
                <Grid
                    item
                    container
                    size={12}
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        justifyContent: { sm: "center", md: "flex-start" },
                        alignItems: "center",
                        width: "100%",
                        gap: { sm: "1rem", md: "1.2rem", lg: "1.4rem" }
                    }}>

                    {tabHeaders.map((item, index) => (
                        <Button
                            onClick={() => handleChange(item.value)}
                            aria-label={item.tabNameEn}
                            key={index}
                            variant='contained'
                            className={` ${tab === item.value ? styles.active_btn : styles.manual_btn}`}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Grid>
                <Grid
                    item
                    container
                    size={12}
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                    <ReactDropdown optionsProp={tabHeaders} handleChange={handleChange} mainValue={tab} />
                </Grid>
                <Grid
                    item
                    container
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}
                    gap={{ xs: "1.5rem", md: "0" }}
                >
                    <Grid
                        item
                        size={{ xs: 12, sm: 6, md: 5, lg: 4, xl: 3, xxl: 2 }}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "100%",
                            paddingTop: { xs: "0.5rem", sm: "0.8rem", md: 0 }

                        }}
                    >
                        <Input
                            name={"admission_number_input"}
                            styled={"admission_number_input"}
                            placeholder="جستجو"
                            icon={faMagnifyingGlass}
                            value={searchInput}
                            onChange={handleChangeSearch}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        size={{ xs: 12, md: 7, lg: 8, xl: 9, xxl: 10 }}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "flex-start", sm: "center", md: "flex-end" },
                            width: "100%",
                        }}
                    >
                        <Button2
                            text={tab === 0 ? "تعریف سالن جدید" : tab === 1 ? "تعریف تعمیرکار جدید" : tab === 2 ? "تعریف تجهیزات جدید" : ""}
                            icon={faPlus}
                            style={"search_btn"}
                            onClick={() => handleOpenModal(item1, "add")} />
                    </Grid>
                    <Box sx={{ width: "100%" }}>
                        <CustomTabPanel value={tab} index={0}>

                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={1}>
                            {/* <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={() => handleOpenModal(item2, "add")}>افزودن تعمیرکار</Button>
                                <Button onClick={() => handleOpenModal(item2, "delete")}>حذف تعمیرکار</Button>
                                <Button onClick={() => handleOpenModal(tempRepairman, "edit")}>ویرایش تعمیرکار</Button>
                            </ButtonGroup> */}
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={2}>

                        </CustomTabPanel>
                    </Box>
                    {/* <CustomTabPanel value={tab} index={0}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal(item1, "add")}>افزودن سالن</Button>
                            <Button onClick={() => handleOpenModal(item1, "delete")}>حذف سالن</Button>
                            <Button onClick={() => handleOpenModal(item1, "edit")}>ویرایش سالن</Button>
                        </ButtonGroup>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal(item2, "add")}>افزودن تعمیرکار</Button>
                            <Button onClick={() => handleOpenModal(item2, "delete")}>حذف تعمیرکار</Button>
                            <Button onClick={() => handleOpenModal(tempRepairman, "edit")}>ویرایش تعمیرکار</Button>
                        </ButtonGroup>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal(item3, "add")}>افزودن تجهیزات</Button>
                            <Button onClick={() => handleOpenModal(item3, "delete")}>حذف تجهیزات</Button>
                            <Button onClick={() => handleOpenModal(tempEquipment, "edit")}>ویرایش تجهیزات</Button>
                        </ButtonGroup>
                    </CustomTabPanel> */}

                </Grid>

            </Grid>
        </Grid >
    )
}

export default ManagementPage

function HallsTable({
    tableInformation = [],
    handleChange,
    page = 0,
    pageLength = 10,
    totalRows,
    handleEditAndRemove,
}) {
    const halls_columns = [
        "کد",
        "نام سالن",
        "وضعیت",
        "مانده ظرفیت",
        "توضیحات",
        "عملیات",
    ]


    return (
        <Grid
            container
            item
            size={12}
            sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {
                tableInformation === undefined ?
                    <LoadingForm /> :
                    <TableCustom
                        rows={tableInformation}
                        columns={halls_columns}
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

                                    <TableCell sx={{

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        gap: "1rem"
                                    }}>
                                        <Button2
                                            icon={faPencil}
                                            onClick={() => handleEditAndRemove(row, "edit")}

                                        />
                                        <Button2
                                            icon={faTrashCan}
                                            onClick={() => handleEditAndRemove(row, "delete")} />
                                        {/* <Button className={`${styles.view_btn}`} variant="contained" onClick={() => handleClickOnView(row.action)}>مشاهده</Button> */}
                                    </TableCell>
                                </TableRow>))
                        }

                    </TableCustom>
            }

        </Grid >
    )

}




const tabHeaders = [
    { value: 0, label: "سالن‌ها", tabNameEn: "Halls" },
    { value: 1, label: "برنامه‌ریزی تعمیرکار", tabNameEn: "Repairman Scheduling" },
    { value: 2, label: "تجهیزات", tabNameEn: "Equipment" },]


const item1 = {
    name: 'Halls'
}
const item2 = {
    name: 'Repairman'
}
const item3 = {
    name: 'Equipment'
}
const tempEquipment = {
    equip_status: true,
    equip_name: "نام تجهیزات",
    equip_code: "12EG45",
    equip_hall: 2,
    equip_description: "توضیحات تجهیزات "
}

const tempRepairman = {
    repair_status: true,
    repair_name: "احسان",
    repair_national_code: "1086632452",
    repair_phone_number: "09126676712",
    repair_expertise: "صافکار",
    repair_work_hours: 5,
    halls: [3, 4],
    repair_username: "ehsanJJ",
    repair_password: "temp#password"
}

const halls_sample = [
    { value: 0, label: "سالن شماره یک" },
    { value: 1, label: "سالن شماره دو" },
    { value: 2, label: "سالن شماره سه" },
    { value: 3, label: "سالن شماره چهار" },
    { value: 4, label: "سالن شماره پنج" },
];


const repairman_columns = [
    "کد",
    "نام تعمیرکار",
    "تخصص تعمیرکار",
    " قابلیت زمانی تعمیرکار",
    "نام سالن",
    "وضعیت",
    "عملیات",
]
const equipment_columns = [
    "کد",
    "نام تجهیزات",
    "نام سالن",
    "وضعیت",
    "توضیحات",
    "عملیات",
]
