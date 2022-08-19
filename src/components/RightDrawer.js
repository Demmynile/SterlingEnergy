import { Drawer } from '@mui/material'
import React from 'react'
import Slider from './Slide'
import CloseIcon from '@mui/icons-material/Close';


const RightDrawer = ({ open, close }) => {
  return (
    <Drawer
    anchor={'right'}
    open={open}>
    <div>
    <CloseIcon onClick={close} />
    </div>
    <Slider />
    </Drawer>
  )
}

export default RightDrawer