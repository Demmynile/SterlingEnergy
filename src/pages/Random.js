import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/backend'

const Random = () => {

    const[token , setToken] = useState('')
    const [phone , setPhone] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [meter , setMeter] = useState('')
    const [getdata , setGetData] = useState([])

   const navigate = useNavigate()


    const getTransactionData = async () => {
        try {
        
            const tokens = localStorage.getItem("tokens")
            
         
          
    
               const config = {
                 headers : { Authorization: `Bearer   ${tokens}` }
               }
        const response = await axios.get(`${API}transactions/transactions/` , config)
        setGetData(response.data)

        }
        catch(error){
          
        }
    }

    const postToken = async() => {
        try {
            const data = {
                result: token,
                phone_number : phone,
                meter_number : meter
            }
            
            const response = await axios.post(`${API}tokening/tokening/` ,  data )
         
        }
        catch (error) {
            
        }
    }

    const loginAdmin = async() => {
        try {
         const data = {
             email : email,
             password : password
         }
     
         const response = await axios.post(`${API}users/login/` , data)
      

         if (response.status == 200){
              localStorage.setItem('tokens' , response.data.access)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Authentication confirmed',
                    showConfirmButton: false,
                    timer: 1500
                })
            navigate("/ran")
         }
      
       
        }
        catch(error){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'User not authorized',
                showConfirmButton: false,
                timer: 1500
            })                                                                                                                                    
        }

    }


    useEffect(() => {
      getTransactionData()
    }, [])


  return (
<div>
    <div>
        <h3>Sending Tokens to the Customers</h3><br/>
       <input placeholder='Token' onChange={(e) => setToken(e.target.value) }/><br/>
       <input placeholder='Phone Number' onChange={(e) => setPhone(e.target.value) } /><br/>
       <input placeholder='Meter Number'  onChange={(e) => setMeter(e.target.value) }/><br/>

       <button onClick = {postToken}>Send the Token</button>
    </div>
    <br/>
    <br/>
     <h3>List of Transactions to be Reviewed</h3><br/>
       <div>
           {getdata.map((data , i) => {
               return (
                   <>
                   <div key={i}>
                   <h3>{data.name}</h3>
                   <h3>{data.email}</h3>
                   <h3>{data.phone}</h3>
                   <h3>{data.meterNo}</h3>
                   <h3>{data.amount}</h3>
                   <h3>{data.transRef}</h3>
                   <h3>{data.created_at}</h3>
                   <button>View</button>
                   </div>
                   </>
               )
           })}
      
       </div>
     <br/>
     <div>
       <h3>Login as an admin on Sterling Energy</h3><br/>
       <input placeholder='Email'  onChange = {(e) => setEmail(e.target.value)}/><br/>
       <input placeholder = "Password" onChange = {(e) => setPassword(e.target.value)} /><br/>
       <button onClick = {loginAdmin}>Login as an admin</button>
    </div><br/>
    
 </div>
    
  )
}

export default Random