import React, { useState , useEffect, useCallback, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableList from "./TableList";
import TableListVerify from "./TableListVerify";
import { Box, Button, Collapse, Container, TableFooter, TablePagination } from "@mui/material";
import AdminTable from "../components/AdminTable";
import Filter from "./Filter";
import { API, wav} from "../utils/backend";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
// import Filter2 from "./Filter2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Table1() {
  const [getdata , setGetData] = useState([])
  const [getverify , setGetVerify] = useState([])
  const[isLoading, setIsLoading]=useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false)
  





  //logout session
  
  const navigate = useNavigate()

  const logout = () => {
      localStorage.removeItem('access_token')
      navigate("/login")
  }



    const loggedOut = () => {
         
        Swal.fire({
            
            icon: 'success',
            title: 'Logged out',
            showConfirmButton: false,
            timer: 1500
        })
        logout()
     }

     const toggle = () => {
      setOpen(!open)
     }
     const getTransactionData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${API}transactions/transactions/`)
        setGetData(response.data)
        // const { current: myArray } = useRef(response.data)
        console.log(response.data)
        setIsLoading(false);
      }
      catch(error){
        console.log(error)
      }
  };
  
  const getVeriData = async () => {
    try {
    
      const response = await axios.get(`${API}verify/verify/`)
      console.log(response.data)
      setGetVerify(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  
useEffect(() => {


// getting the data from our database directly for validation purposes

  getTransactionData()
  getVeriData()

  // return () => {
    // getTransactionData()
  // }
}, [])


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //search
  const [query, setQuery] = useState("");
  const [verify , setVerify] = useState("")
  // const handleQuery = (e) => {
  //   setQuery(e.target.value);
  // };
  return (
    <>
    <Box component={'div'}>
      <Container>
    <div className="top-table">
      <div>
    <Button endIcon={open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} variant="contained" color="primary" onClick={toggle}>Collapse Table</Button>
      </div>
    <span style={{ paddingLeft: '2rem', paddingTop: ".5rem", cursor : 'pointer'}}>
      <LogoutIcon onClick = {loggedOut} color="primary" />
    </span>
    </div>
      </Container>
    </Box>
    {/* <Filter2 verify = {verify} setVerify={setVerify} /> */}
    <Collapse in={open} timeout='auto' unmountOnExit>
    <TableContainer component={Paper} sx={{ width: "90%", margin: "0 auto" }}>
       <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Meter Number</StyledTableCell>
              <StyledTableCell>Token</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Transaction Ref</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              {/* <StyledTableCell>Action</StyledTableCell>  */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? getverify.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : getverify
            )
              .filter((val) => {
                if (verify === "") {
                  return val;
                } else if (
                  val.email.toLowerCase().includes(verify.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((row) => (
                <TableListVerify row={row} key={row.id} />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                colSpan={3}
                count={getverify.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={AdminTable}
                />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </Collapse>
      <br/>

      <Filter query={query} setQuery={setQuery} />
      <TableContainer component={Paper} sx={{ width: "90%", margin: "0 auto" }}>
       <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Meter Number</StyledTableCell>
              <StyledTableCell>Token</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Transaction Ref</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {(rowsPerPage > 0
              ? getdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : getdata
            )
              .filter((val) => {
                if (query === "") {
                  return val;
                } else if (
                  val.email.toLowerCase().includes(query.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((row) => (
                <TableList row={row} key={row.id} />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                colSpan={3}
                count={getdata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={AdminTable}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </>
  );
}
