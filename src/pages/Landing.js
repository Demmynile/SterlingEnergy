import React, { useState, useEffect } from 'react'
import Login from './Info';
import Navbar from '../components/Navbar';
import Desktop from '../components/Desktop';

const Landing = () => {

    const [mobile, setMobile] = useState(false)
    useEffect(() => {
    const responsive = () => {
      return window.innerWidth <= 768
      ? setMobile(true)
      : setMobile(false)
    }
    responsive()
    window.addEventListener('resize', () => responsive())

    //clean up function
    window.removeEventListener('resize', () => responsive())
  }, [])

  return (
      <>
        {mobile
        ?
        (
            <>
            <Navbar />
            <Login />
        </>
        )   
        :   <Desktop />
        }
      </>
    
   
  )
}

export default Landing