import React from 'react'
import Slider from '../common/Slider'
import { Box } from '@mui/material'

const Footer = ({type}) => {
    const merchandise = [
        {
            name: "album",
            cover: "https://i.pinimg.com/736x/f0/b9/4a/f0b94a4a7b6caa4648b9e4703e0911a8.jpg",
            id: 1

        },
        {
            name: "cover",
            cover: "https://i.pinimg.com/236x/f5/b3/9d/f5b39db8935a7162fcf49b688a78d0a2.jpg",
            id: 2

        },
        {
            name: "pen and music",
            cover: "https://i.pinimg.com/236x/ed/c2/fa/edc2fa4f8e2c8bc5c9c990fcedc57bf4.jpg",
            id: 3

        },

    ]

    return (
        <>
         {type === "album" && (
         <Slider list={merchandise} type='' /> 
            
        )}
        </>       
    )
}

export default Footer;