import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Trial from './Steps'
import { useFlutterwave  , closePaymentModal} from 'flutterwave-react-v3';
import axios from 'axios'
import { API } from '../utils/backend'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'
import logo from '../assets/sterling.png'
import moment from 'moment'


import { useNavigate } from 'react-router-dom';





const Confirm = ({ meter, amount, prevStep, stepNum, phone, block, name, email }) => {

    // const [transref, setTransref] = useState('')
    const [date , setDate] = useState('')
    const navigate = useNavigate()

    phone = phone.split('') // converts string to array and split each letter by a comma
    phone[0] = '234'
    phone = phone.join('');
    console.log(phone)


    //verify payment function
    const verifyPayment = async () => {
        try {
            let uuid;

            uuid = uuidv4().substring(0, 20) 
            
            /// Generate a fresh PIN for the candidiate and update its Row on the databaseTable
            let str = phone.toString() // converts the number to string

           

            const ref = uuid

            const date = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss')

            const data = {
                name: name,
                email: email,
                phone: phone,
                meterNo: meter,
                amount: amount,
                transRef: ref,
                created_at: date
            }
            console.log(data)
            
            const response = await axios.post(`${API}verify/verify/`, data)
            console.log(response.data)

           


            

        }
        catch (error) {
          console.log(error)
            
        }
    }




    const sendToTransactionTable = async () => {
        try {
            let uuid;

            uuid = uuidv4().substring(0, 20) 
            
            /// Generate a fresh PIN for the candidiate and update its Row on the databaseTable
            let str = phone.toString() // converts the number to string

           

            const ref = uuid

            const date = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss')

            const data = {
                name: name,
                email: email,
                phone: phone,
                meterNo: meter,
                amount: amount,
                transRef: ref,
                created_at: date
            }
            console.log(data)
            
            const response = await axios.post(`${API}transactions/transactions/`, data)

            if (response) {
                localStorage.setItem('meter' , meter)
                localStorage.setItem('email' , email)
                localStorage.setItem('phone' , phone)
                localStorage.setItem('amount' , amount)
                localStorage.setItem('name' , name)
               localStorage.setItem('Date' , date)
                localStorage.setItem('transactionRef' , ref )

                Swal.fire({
                    title: 'Receipt saved',
                    text: "Kindly download the pdf to have your receipt",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'preview'
                }).then((result) => {
                    
                    

                    if (result.isConfirmed) {
                        

                    navigate('/preview')
                        
                    }
                })
            }


        }
        catch (error) {
          
            
        }
    }
    

    
    const updateEmail = async (e) => {
        e.preventDefault()
        try {

            const data = {
                meterNo: meter,
                email: email,
                phoneNumber: phone
            }
         
            
            const response = await axios.put(`${API}mall/mall/updateBoth/`, data)
           
            

           


        }
        catch (error) {
           
            
        }
    }

    const figure =  Number(amount) + 60 + Number(amount * 0.021)

    //  const saveBankTransfer = async () => {
    //     let uuid;

    //     uuid = uuidv4().substring(0, 20) 

    //     const ref = uuid
        
    //     const flw = new useFlutterwave(process.env.REACT_APP_PUBLIC_KEY, process.env.REACT_APP_SECRET_KEY);
    //     const details = {
    //         tx_ref: ref,
    //         amount: amount,
    //         email: email,
    //         phone : phone,
    //         currency: "NGN",
    //     };
    //     const response = await flw.Charge.bank_transfer(details);
    //     console.log(response)
        



    //  }

    const config = {
        public_key: process.env.REACT_APP_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: figure,
        currency: 'NGN',
        subaccounts: [
            {
              id: "RS_AF71DECC27191FBCE1BF5A7A85C7B0AB",
            },
            {
              id :"RS_B2148634B48F4C256D1E5A16B569D116"
            }
        ],
        payment_options: 'card, banktransfer',
        customer: {
          phone: phone,
          name: name,
          email : email
        },

        customizations: {
          title: 'Sterling Energy',
          description: `${meter}`,
          logo: logo ,
        },
       

    }

    const handleOnClick = (e) => {
    
        updateEmail(e)
        verifyPayment() //This will send to our database directly first
        
       
        handleFlutterPayment({
            callback: (response) => {
                
               

                if (response.status === "successful"){
                    closePaymentModal()
                    sendToTransactionTable()
               
                }
                else if (response.status === "completed"){
                    closePaymentModal()
                    sendToTransactionTable() 
                }
                else {
                    closePaymentModal()
                    Swal.fire({
                       icon: 'error',
                       title: 'Transaction failed',
                       showConfirmButton: false,
                       timer: 1500
                   })
                }

                
               
                    
                 
            },
            onClose: () => {
                
            },
          
        });

    }

     const handleFlutterPayment = useFlutterwave(config);




    return (
        <Box component={'div'} className={'meter'}>
            <form>
                <Container>
                    <Typography align='center' variant='h6' style={{ fontWeight: 'bold' }}>Payment for Meter</Typography>
                    <Trial stepNum={stepNum} />
                    <div className='field'>
                        <TextField id="standard-basic" label="Meter Number" variant="standard" value={meter} disabled />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-basic" label="Phone Number" variant="standard" value={phone} disabled />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-basic" label="Email" variant="standard" value={email} disabled />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-basic" label="Name" variant="standard" value={name} disabled />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-basic" label="Amount" variant="standard" disabled value={Number(amount) + 60 + Number(amount * 0.021)} />
                    </div>
                    <br />
                    <div>
                    <Typography color={'textSecondary'}>SubTotal = &#8358;{amount}</Typography>
                    <Typography color={'textSecondary'}>Service Charge + Tax = &#8358;{Number(amount * 0.021) + 60}</Typography> 
                    <Typography color={'textSecondary'}>Total = &#8358;{Number(amount) + 60 + Number(amount * 0.021)}</Typography>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button onClick={prevStep} sx={{ textTransform: 'inherit' }} >Back</Button>
                        <Button variant='contained' color='primary' sx={{ textTransform: 'inherit' }} onClick={handleOnClick}>Confirm</Button>
                    </div>
                </Container>
            </form>

        </Box>

    )
}

export default Confirm