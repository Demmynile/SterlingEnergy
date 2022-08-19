import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Info from '../assets/mobile-one.svg'
import Payment from '../assets/payment.svg'
import Confirm from '../assets/confam.svg'
import { Typography } from '@mui/material';

const Slider = () => {
    const data = [
        {
            img: Info,
            label: 'Insert Meter Information'
        },
        {
            img: Payment,
            label: 'Pay with your card'
        },
        {
            img: Confirm,
            label: 'Receive confirmation message'
        }
    ]
  return (
      <Carousel autoPlay={true} stopOnHover={false}>
          {
              data.map((single, i) => {
                  return (
                      <div style={{ marginTop: '3rem'}} key={i}>
                      <Typography variant='h6' align='center' sx={{ fontWeight: 'bold'}}>{single.label}</Typography>
                      <img src={single.img} alt='test' />
                      </div>
                  )
              })
          }
      </Carousel>
  )
}

export default Slider