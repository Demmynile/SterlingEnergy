import React, { useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import View from "./View";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from "sweetalert2";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from "moment";



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableList = ({ row }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [copied, setCopied] = useState(false)
  


  return (
    <>
      <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {/* {row.name} */}
          
         
        </StyledTableCell>
        <StyledTableCell style={{ paddingTop: '-2rem'}}>
          {row.meterNo} 
          <CopyToClipboard text={row.meterNo} onCopy={() => setCopied(true)}>
            <Tooltip placement="top" title={ copied ? 'Copied Meter Number' : 'Copy'}>
            <ContentCopyIcon color="primary" sx={{ cursor: 'pointer'}} />
            </Tooltip>
          </CopyToClipboard>
        </StyledTableCell>
        <StyledTableCell>{row.name}</StyledTableCell>
        <StyledTableCell>{row.email}</StyledTableCell>
        <StyledTableCell>{row.phone}</StyledTableCell>
        <StyledTableCell>
          {row.amount} 
          <CopyToClipboard text={row.amount} onCopy={() => setCopied(true)}>
            <Tooltip placement="top" title={ copied ? 'Copied Amount' : 'Copy'}>
            <ContentCopyIcon color="primary" sx={{ cursor: 'pointer'}} />
            </Tooltip>
          </CopyToClipboard>
        </StyledTableCell>
        <StyledTableCell>{row.transRef}</StyledTableCell>
        <StyledTableCell>{moment(row.created_at).format('YYYY/MM/DD HH:mm:ss')}</StyledTableCell>
        <StyledTableCell>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "inherit" }}
            onClick={handleOpen}
          >
            View
          </Button>
        </StyledTableCell>
      </StyledTableRow>
      <View
        open={open}
        close={handleClose}
        phone={row.phone}
        meter={row.meterNo}
        transref = {row.transRef}
        token = {row.token}
        setOpen={setOpen}
      />
    </>
  );
};

export default TableList;
