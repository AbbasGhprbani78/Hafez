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

//MUI Components
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

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
                response = await axios.get(`${apiUrl}/app/get-customer-all-form/`, {
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

    // useEffect(() => {
    //     fetchTabData(tab);
    // }, [tab])

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
                    operation === "add" ? <AddAndEditRepairman /> : operation === "edit" ? <AddAndEditRepairman /> : operation === "delete" ? <DeleteError toggleModal={handleToggleModal} type="repairman" infoItem={selectedRowInfo} /> : <></>
                ) : tab === 2 ? (
                    operation === "add" ? <AddAndEditEquipment /> : operation === "edit" ? <AddAndEditEquipment /> : operation === "delete" ? <DeleteError toggleModal={handleToggleModal} type="equipment" infoItem={selectedRowInfo} /> : <></>
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
                    }}>
                    <CustomTabPanel value={tab} index={0}>
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
                            <Button onClick={() => handleOpenModal(item2, "edit")}>ویرایش تعمیرکار</Button>
                        </ButtonGroup>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal(item3, "add")}>افزودن تجهیزات</Button>
                            <Button onClick={() => handleOpenModal(item3, "delete")}>حذف تجهیزات</Button>
                            <Button onClick={() => handleOpenModal(item3, "edit")}>ویرایش تجهیزات</Button>
                        </ButtonGroup>
                    </CustomTabPanel>
                </Grid>

            </Grid>
        </Grid >
    )
}

export default ManagementPage
const tabHeaders = [{ value: 0, label: "سالن‌ها", tabNameEn: "Halls" },
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