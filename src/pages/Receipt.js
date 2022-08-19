import React, { createRef  , useEffect , useState} from 'react'
import { Button, Typography } from '@mui/material'
import Pdf from 'react-to-pdf'
import Logo from '../assets/sterling-1.png'
import moment from 'moment'


const Receipt = () => {

    const [meter , setMeter] = useState('')
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [phone , setPhone] = useState('')
    const [amount , setAmount] = useState('')
    const [transref , setTransref] = useState('')
    const [time , setTime] = useState('')

    useEffect(() => {
     const meter = localStorage.getItem('meter')
     setMeter(meter)
     const name = localStorage.getItem('name')
     setName(name)
     const time = localStorage.getItem("Date")
     setTime(time)
     const email = localStorage.getItem('email')
     setEmail(email)
     const phone = localStorage.getItem('phone')
     setPhone(phone)
     const amount = localStorage.getItem('amount')
     setAmount(amount)
     const transref = localStorage.getItem('transactionRef')
     setTransref(transref)
    } , [])

  const ref = createRef()
  return (
   <>
   <div ref={ref} className='preview'>
     {/* <div style={{ display: 'flex'}}> */}
       <img src={Logo} alt='logo' className={'logo'} />
     {/* </div> */}
     <br />
     <Typography variant='body1' sx={{ fontWeight: 'bold', paddingBottom: '1rem'}}>Receipt for Energy/Water Token</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Name:</strong> {name}</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Meter No:</strong> {meter}</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Email:</strong> {email}</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Phone:</strong> {phone}</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Amount:</strong>{amount} </Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>Date:</strong>{time}</Typography>
   <Typography sx={{ pb: .5}} variant='body2'><strong>TransactionReference:</strong> {transref} </Typography>
   <Typography sx={{ pt: 3, fontWeight: 'bold'}} variant='body2'>For complains and enquiries: </Typography>
   <div style={{paddingTop: '1rem'}}>
   {/* <LocalPhoneIcon /> */}
   <Typography variant='body2'><strong>Phone:</strong> 08080702751, 07086925136</Typography>
   </div>
   <div style={{paddingTop: '1rem'}}>
   {/* <EmailIcon  /> */}
   <Typography variant='body2'><strong>Email: </strong>sterlingenergy@sterlingtech.com.ng</Typography>
  
   </div>

   </div>
   <div style={{ paddingTop: '1rem', textAlign: 'center'}}>
   <Pdf targetRef={ref} filename='receipt.pdf'>
       {({ toPdf }) => <Button variant='contained' color='success' onClick={toPdf}>Download</Button>}
   </Pdf>
   </div>
   </>
  )
}

export default Receipt