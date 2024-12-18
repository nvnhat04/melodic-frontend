import React from 'react'
import Slider from '../common/Slider'
import { Box } from '@mui/material'

const Footer = ({type, list}) => {
    
    return (
        <>
         {type === "album" && (
         <Slider list={list} type='' /> 
            
        )}
        </>       
    )
}

export default Footer;