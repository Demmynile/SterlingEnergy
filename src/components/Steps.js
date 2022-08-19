import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'

const Trial = ({ stepNum }) => {
    const steps = ['Information', 'Amount', 'Confirm'];
  return (
    <Stepper activeStep={stepNum} alternativeLabel style={{ marginTop: '2rem'}}>
    {steps.map((label, i) => (
    <Step key={i}>
      <StepLabel>{label}</StepLabel>
    </Step>
        ))}
    </Stepper>
  )
}

export default Trial