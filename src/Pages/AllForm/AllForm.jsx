import { useState, useEffect, useContext } from "react";
import styles from "./AllForm.module.css";
import axios from "axios";
import { MyContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button2 from "../../Components/Modules/Button2/Button2";
import ButtonFilter from "../../Components/Modules/ButtonFilter/ButtonFilter";
import TableStatus from "../../Components/Modules/TableStatus/TableStatus";
import { TableCell, TableRow } from "@mui/material";

export default function AllForm() {
  const [inputSearch, setInputSearch] = useState("");
  const [filterText, setFilterText] = useState("all");

  const columns = [
    "شماره پذیرش",
    "شماره هرم",
    "نوع خودرو",
    "شماره شاسی",
    "تاریخ پذیرش",
    "پلاک خودرو",
    "وضعیت پذیرش",
  ];
    const [page, setPage] = useState(0);

   const [rows, setRows] = useState([
     {
       status: "returned",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251521", // Fixed part of number with a unique last digit
     },
     {
       status: "pending approval",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251522", // Incrementing the last digit by 1
     },
     {
       status: "unfinished",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251523", // Incrementing the last digit by 1
     },
     {
       status: "unfinished",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251524", // Incrementing the last digit by 1
     },
     {
       status: "completed",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251525", // Incrementing the last digit by 1
     },
     {
       status: "completed",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251526", // Incrementing the last digit by 1
     },
   ]);

   const [filterRows, setFilterRows] = useState([
     {
       status: "returned",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251521", // Fixed part of number with a unique last digit
     },
     {
       status: "pending approval",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251522", // Incrementing the last digit by 1
     },
     {
       status: "unfinished",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251523", // Incrementing the last digit by 1
     },
     {
       status: "unfinished",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251524", // Incrementing the last digit by 1
     },
     {
       status: "completed",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251525", // Incrementing the last digit by 1
     },
     {
       status: "completed",
       plate: "45-ج-32-953",
       date: "01/02/03",
       vin: "154884DFGBH4512445",
       brand: "BMW",
       count: 5,
       number: "4000251526", // Incrementing the last digit by 1
     },
   ]);

  const [rowsPerPage, setRowsPerPage] = useState(2);

  useEffect(() => {
    if (filterText === "all" || filterText === "") {
      setFilterRows(rows);
      return;
    }
    const filteredRows = rows.filter(
      (row) => row.status === filterText || row.number === filterText
    );
    setFilterRows(filteredRows);
  }, [filterText, rows]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

  return (
    <div className="content-conatiner">
      <SideBar />
      <div className="space-content">
        <Header />
        <div className={styles.search_container}>
          <span className={styles.number_pa}>شماره پذیرش :</span>
          <div className={styles.wrap_search}>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              className={styles.input_search}
              placeholder="شماره پذیرش"
            />
            <FontAwesomeIcon icon={faHashtag} className={styles.icon_input} />
          </div>
          <Button2
            text={"جستجو"}
            icon={faMagnifyingGlass}
            onClick={() => setFilterText(inputSearch)}
          />
        </div>
        <div className={styles.table_container}>
          <div className={styles.wrap_btns_filter}>
            <ButtonFilter
              text={"همه"}
              OnClick={() => {
                setFilterText("all");
                setInputSearch("");
              }}
              filterText={filterText}
              value={"all"}
            />
            <ButtonFilter
              text={"فرم‌های تکمیل شده"}
              OnClick={() => {
                setFilterText("completed");
                setInputSearch("");
              }}
              filterText={filterText}
              value={"completed"}
            />
            <ButtonFilter
              text={"فرم‌های ناتمام"}
              OnClick={() => {
                setFilterText("unfinished");
                setInputSearch("");
              }}
              filterText={filterText}
              value={"unfinished"}
            />
            <ButtonFilter
              text={"برگشتی"}
              OnClick={() => {
                setFilterText("returned");
                setInputSearch("");
              }}
              filterText={filterText}
              value={"returned"}
            />
            <ButtonFilter
              text={"در انتظار تایید کارشناس"}
              OnClick={() => {
                setFilterText("pending approval");
                setInputSearch("");
              }}
              filterText={filterText}
              value={"pending approval"}
            />
          </div>
          <div className={"mt-3"}>
            <TableStatus
              columns={columns}
              filterText={filterText}
              rows={rows}
              page={page}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
            >
              {filterRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    }}
                  >
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.vin}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.plate}</TableCell>
                    <TableCell
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <div
                        className={`${styles.status_btn} ${
                          row.status === "returned"
                            ? styles.status_one
                            : row.status === "unfinished"
                            ? styles.status_two
                            : row.status === "completed"
                            ? styles.status_three
                            : row.status === "pending approval"
                            ? styles.status_four
                            : null
                        }`}
                      >
                        {row.status === "returned"
                          ? "برگشتی"
                          : row.status === "unfinished"
                          ? "ناتمام"
                          : row.status === "completed"
                          ? "اتمام پذیرش"
                          : row.status === "pending approval"
                          ? "درانتظار تایید"
                          : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableStatus>
          </div>
        </div>
      </div>
    </div>
  );
}

// const apiUrl = import.meta.env.VITE_API_URL;
// const [allForms, setAllForms] = useState([]);
// const { setDataForm, setIdForm, setEditMode } = useContext(MyContext);

// const navigate = useNavigate();
// useEffect(() => {
//   const getAllForms = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/app/get-full-forms/`);
//       if (response.status === 200) {
//         setAllForms(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getAllForms();
// }, []);

// const goToFormHnadler = (id, form) => {
//   setEditMode(true);
//   setIdForm(id);
//   setDataForm(form);
//   navigate("/paziresh");
// };

//  {allForms.length > 0 &&
//           allForms.map((item) => (
//             <p
//               key={item.customer_form.id}
//               onClick={() => goToFormHnadler(item.customer_form.id, item)}
//             >
//               {item.customer_form.id}
//             </p>
//           ))}
