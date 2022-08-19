import React, { useState } from 'react'
import Meter from '../components/Meter'
import Card from '../components/Card'
import Confirm from '../components/Confirm'
import axios from 'axios'
import { API } from '../utils/backend'


const   Info = () => {
    const [step, setStep] = useState(0)
    const [meter, setMeter] = useState('')
    const [amount, setAmount] = useState('')
    const [block , setBlock] = useState('')
    const [phone , setPhone] = useState('')
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [id , setId] = useState('')
    const [meterError, setMeterError] = useState("")
    
    //proceed to next step
    const nextStep = () => setStep(prevState => prevState + 1)

    //go back to previous step
    const prevStep = () => setStep(prevState => prevState - 1)

    if (meter.length === 11){
      axios.get(`${API}mall/mall/getMeterDetails/?meterNo=${meter}`)
      .then(res => {
        console.log(res.data  )
        if(res.data.length < 1){
          setMeterError("Meter number does not exist!")
        } else {
          setMeterError("")
          setId(res.data[0].pk)
        }
       
      })
      .catch(err => console.log(err))

}
      
    switch(step) {
        case 0:
          return (
            <>
              <Meter
              nextStep={nextStep}
              meter={meter}
              setMeter={setMeter}
              setPhone={setPhone}
              stepNum={step}
              phone={phone}
              block={block}
              name={name}
              email={email}
              setEmail={setEmail}
              meterError={meterError}
              />
            </>
            )
        case 1:
          return (
            <Card
            prevStep={prevStep}
            nextStep={nextStep}
            amount={amount}
            setAmount={setAmount}
            stepNum={step}
             />
          )
        case 2:
          return (
            <Confirm
            meter={meter}
            amount={amount}
            prevStep={prevStep}
            stepNum={step}
            phone={phone}
            block={block}
            name={name}
            email={email}
             />
          )
          default:
            return null
    }

      
}

export default Info