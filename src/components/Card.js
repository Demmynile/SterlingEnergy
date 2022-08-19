import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Trial from './Steps'

const Card = ({ prevStep, amount, setAmount, nextStep, stepNum}) => {

  return (
    <Box component={'div'} className={'meter'}>
    <Container>
    <form>
    <Typography align='center' variant='h6' style={{ fontWeight: 'bold'}}>Payment for Meter</Typography>
    <Trial stepNum={stepNum} />
    <div className='field'>
    <TextField id="standard-basic" label="Amount" type={'number'} variant="standard" value={amount} onChange={e => setAmount(e.target.value) } />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem'}}>
    <Button onClick={prevStep} sx={{ textTransform: 'inherit'}}>Back</Button>
    <Button 
    variant='contained' 
    color='primary' onClick={nextStep} 
    sx={{ textTransform: 'inherit'}} 
    disabled={amount === '' ? true : false}>
    Next
    </Button>
    </div>
    </form>
    </Container>
    </Box>
  )
}

export default Card