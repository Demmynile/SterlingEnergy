import React from 'react'
import { Alert, Box, Container } from '@mui/material'
import Mobile from '../assets/mobile.svg'

const Desktop = () => {
  return (
    <Box component={'div'} className={'desktop'}>
    <Container>
    <Alert severity="info" ><h3>This application can only be accessed on mobile devices</h3></Alert>
    <div style={{ display: 'flex', justifyContent: 'center'}}>
        <img src={Mobile} alt='alt' />
    </div>
    </Container>
    </Box>
  )
}

export default Desktop