import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

export default function TableStatus({
  children,
  columns,
  rows,
  page,
  onChange,
  rowsPerPage,
}) {
  return (
    <>
      <TableContainer style={{ maxHeight: 500, direction: "rtl" }}>
        <Table
          stickyHeader
          sx={{
            minWidth: "max-content",
          }}
        >
          <TableHead sx={{ background: "#f4f1e8" }}>
            <TableRow>
              {columns.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ background: "#f4f1e8", fontFamily: "iranYekan" }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChange}
        sx={{
          direction: "ltr",
        }}
      />
    </>
  );
}
