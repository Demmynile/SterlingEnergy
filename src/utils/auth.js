import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"


export const isAdminAuthenticated = () => {

 if(localStorage.getItem("access_token") || localStorage.getItem("refresh_token")){
     return true
 }
 else {
     return false
 }
}

export const isAdminLoggedOut = async() => {

    if (isAdminAuthenticated) {
         if (localStorage.getItem("access_token") || localStorage.getItem("refresh_token")){
             localStorage.clear() 
  
             await Swal.fire({
              title: 'Success!',
              text: 'You have successfully logged out',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            return <Navigate to = {"/login"} />
            
          } 
         else {
          await Swal.fire({
              title: 'Error!',
              text: 'there is something wrong',
              icon: 'error',
              confirmButtonText: 'Not Cool'
            })
            return <Navigate to = {"/"} />
           
  
  
         }
      }
      else {
          await Swal.fire({
              title: 'Error!',
              text: 'You are not fully authenticated , meet the admin',
              icon: 'error',
              confirmButtonText: 'Not Cool'
            })
            return <Navigate to = {"/"} />
  
            
      }
  }

