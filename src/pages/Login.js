import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Swal from 'sweetalert2'
import axios from 'axios'
import { API } from '../utils/backend'
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading  , setLoading] = useState(false)

  // intialize navigation
  const navigate = useNavigate()

  const loginAdmin = async() => {
    setLoading(true)
    try {
     const data = {
         email : email,
         password : password
     }
 
     const response = await axios.post(`${API}users/login/` , data)
    
     setLoading(false)
     if (response.status == 200){
          
          localStorage.setItem('access_token' , response.data.access)
            Swal.fire({
               
                icon: 'success',
                title: 'Authentication confirmed',
                showConfirmButton: false,
                timer: 1500
            })
        navigate("/admin")
     }
  
   
    }
    catch(error){
      setLoading(false)
        Swal.fire({
            
            icon: 'error',
            title: 'User not authorized',
            showConfirmButton: false,
            timer: 1500
        })                                                                                                                                    
    }

}

  return (
    <Card className="login" elevation={5}>
      <Container>
        <Typography variant="h4" align="center" sx={{ pt: 5 }}>
          Administrator
        </Typography>
        <Typography
          variant="body2"
          color={"textSecondary"}
          align="center"
          sx={{ pt: 1 }}
        >
          Sign In
        </Typography>
        <CardContent>
          <form style={{ margin: "3rem" }}>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="standard"
                fullWidth
              />
            </div>
            <br />
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                variant="standard"
                fullWidth
              />
            </div>
            <br />
            <div style={{ marginTop: "2rem" }}>
             <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "inherit" }}
                onClick = {loginAdmin}
              >
            {loading ? <CircularProgress color = "inherit" /> : "Send"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Container>
    </Card>
  );
};

export default Login;
