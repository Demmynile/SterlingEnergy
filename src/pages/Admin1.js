
import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Admin = () => {

  useEffect(() => {

  },[])

    const navigate = useNavigate()

  const logout = () => {
      localStorage.clear()
      navigate("/login")
  }



    const loggedOut = () => {
         
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Logged out',
            showConfirmButton: false,
            timer: 1500
        })
        logout
     }
  return (
    <div>
       Welcome to your Administration page

       <h2> Token are for sales here </h2>

       <button onClick = {loggedOut}>Logout</button>

    </div>
  )
}

export default Admin