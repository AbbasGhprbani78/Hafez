import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TableForm({ columns, children }) {


    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650, border: '1px solid #f2f2f2' }}
                    aria-label="dynamic table"
                    // stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            {columns?.map((column, index) => (
                                <TableCell key={index} sx={{ borderRight: '1px solid #ddd' }}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
