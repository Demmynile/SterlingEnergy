import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import axios from 'axios'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress'
import { API } from '../utils/backend'


export default function View({ open, close, phone, meter, name, transref, setOpen }) {
  const [loading ,setLoading] = useState(false)
  const [token, setToken] = useState("");

  const handleChange= async(e) => {
    const red = /^[0-9 ]{1,24}$/;
    if(e.target.value === '' || red.test(e.target.value)){
        setToken(e.target.value.toString().replace(/\s/g, '').substring(0, 20))
    }
}

  const updateToken = async() => {
     try {
      const data2 = {
        transRef : transref,
        name : token
   }
   const res = await axios.put(`${API}transactions/trans/tokenUpdate/` , data2)
   console.log(res)
      
     }
     catch(error){
      Swal.fire({
         icon: 'error',
        title: 'Token not Updated',
        showConfirmButton: false,
        timer: 1500
    })
     }
   }
  const postToken = async() => {
    setLoading(true)

    try {
      
     const data = {
            result: token,
            phone_number : phone,
            meter_number : meter
        }
         
        
        const response = await axios.post(`${API}tokening/tokening/` ,data)
        console.log(response)
        setLoading(false)
        setOpen(false)
        //response
        if (response.status === 201){
          updateToken()
          Swal.fire({
            icon: 'success',
            title: 'Token Sent Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        
        
       
        }
        setToken('')
        setLoading(false)
      }
    
    catch (error) {
      Swal.fire({
       
        icon: 'error',
        title: 'Token not sent',
        showConfirmButton: false,
        timer: 1500
    })  
    }
}
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <Box>
          <DialogTitle>Send Token</DialogTitle>
          <DialogContent>
            <form style={{ marginTop: "1rem" }}>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Phone Number"
                  value={phone}
                  variant="standard"
                  disabled={true}
                />
              </div>
              <div style={{ marginTop: ".5rem" }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="token"
                  label="Token"
                  type="text"
                  onChange={handleChange}
                  value={token || name}
                  variant="standard"
                  disabled={name ? true : false}
                />
              </div>
              <div style={{ marginTop: ".5rem" }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="meter"
                  label="Meter Number"
                  value={meter}
                  variant="standard"
                  disabled={true}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <div>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "inherit" }}
                onClick = {postToken}
                disabled={token.length < 20 || phone == '' && meter === '' ? true : false}
              >
                {loading ? <CircularProgress color = "inherit" /> : "Send"}
              </Button>
            </div>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
