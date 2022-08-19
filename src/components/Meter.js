import React from 'react'
import { Box, Button, Container, TextField, Typography, Modal } from '@mui/material'
import Trial from './Steps'
import CircularProgress from '@mui/material/CircularProgress'


const Meter = ({ meter, setMeter, meterError, nextStep, stepNum, phone, setPhone, setEmail, email }) => {


    const handleMeter = async(e) => {
        const red = /^[0-9\b]{1,11}$/;
        if(e.target.value === '' || red.test(e.target.value)){
            setMeter(e.target.value)
        }
    }

    const handlePhone = async(e) => {
        const red = /^[0-9\b]{1,14}$/;
        if(e.target.value === '' || red.test(e.target.value)){
            setPhone(e.target.value.toString())
          
        }
    }
   


    // let res = phone.split('')
    // res.splice(3, 1)
    // // res.join("")


    // const check = e => {
    //     e.preventDefault()
    //     // let res = phone.toString().split('')
    //     // res.splice(3, 1)
    //     // setPhone(res.join(""))
    //     // console.log(res)
    //     // console.log(phone)
    // }
     //proceed to next step
    //  const nextStep = () => {
    //     let res = phone.toString().split('')
    //     res.splice(3, 1)
    //     res.join("")
    //     setStep(prevState => prevState + 1)
    //  } 
    return (
        <Box component={'div'} className={'meter'}>
            <form>
            <Container>
            <Typography align='center' variant='h6' style={{ fontWeight: 'bold'}}>Payment for Token</Typography>
            <Trial stepNum={stepNum}/>
                {/* {loading && <>
                    <Modal
                    open={true}
                    onClose={false}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                    >
                    <CircularProgress />
                    </Modal>
                </>
                } */}
                <div className='field'>
                <div style={{ color: 'red'}}>{meterError}</div>
                <TextField 
                id="standard-basic" 
                label="Meter Number" 
                variant="standard" 
                value={meter} 
                onChange={handleMeter}
                 />
                <Typography variant='body2' color={'textSecondary'} sx={{ fontSize: ".7rem", pt: 1}}>
                This meter field only accepts figures and must be 11 in length <span style={{ color: 'red'}}>*</span>
                </Typography>
                </div>
                <br />
                <div>
                <TextField id="standard-basic" label="Phone Number" value={phone} variant="standard" onChange={handlePhone} />
                </div>
                <br />
                <div>
                <TextField id="standard-basic" type={'email'} label="Email" value={email} variant="standard" onChange={e => setEmail(e.target.value)} />
                </div>
                <br />
                <div>
                <Button 
                variant='contained'  
                color='primary' 
                sx={{ textTransform: 'inherit'}}  
                disabled={meter.toString().length < 11 || phone === '' || phone.toString().length < 11 || email === '' || meterError !== '' ? true : false}  
                onClick={nextStep}>
                    Next
                </Button>
                </div>
            </Container>
          
            </form>
            <br/>
            <a className ="capex-due" target="_blank" href='https://flutterwave.com/pay/sterlingtech_lca_capex'>PAY YOUR MONTHLY CAPEX DUE</a>
        </Box>
    ) 
   
}

export default Meter